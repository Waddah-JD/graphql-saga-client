# graphql-saga-client

## Why?

because you don't have to use a full-fledged client library (for example: `Apollo`) just to perform calls on a graphql endpoint, it's a great library but it's a kind of overkill when all you need is to make an endpoint query or a mutation, it doesn't take into consideration that some people like to keep their state, components, side-effects isolated and that's just pain to deal with in Apollo and the likes of it, here is where `graphql-saga-client` comes into play, just perform your call as an effect (the way it was always meant to be) and update the state accordingly, no more 10,000 lines-of-code components with all kind of hooks just to share state and make calls and update views and all other kinds of chaos.

## API

### main client options

the object (the parameters object you pass to the `generateGraphqlSagaClient`) is of the following type:

| property |       type        |          default          |
| :------: | :---------------: | :-----------------------: |
|   url    |      string       |                           |
|  auth?   | object \| boolean |    { enabled: false }     |
|  retry?  |      object       | { times: 0, interval: 0 } |

#### url

the `url` of the enpoint; if it doesn't start with `http://`, `https://` or `www.` , then an `https://` will be added at the start of the passed URL

#### auth

the `auth` object that is passed to either the default client or the overrideng options, if it is not set to `false` then it's an object of the following type

| property |   type   | notes                                                                                       |
| :------: | :------: | :------------------------------------------------------------------------------------------ |
|   type   |  string  | the type of the authentication to be handled, currently only `header` is supported          |
|    fn    | function | the function that should be run every time the client is called, for example to get a token |

#### retry

the `retry` object that is passed to either the default client or the overrideng options, must contain either `times` or `timeout` properties depending on the retrier policy you want:

| property  |  type  | default | notes                                                |
| :-------: | :----: | :-----: | :--------------------------------------------------- |
| interval? | number |  1000   | milliseconds interval                                |
|  times?   | number |         | how many times the operation should be retried       |
| timeout?  | number |         | total milliseconds duration before the retrier stops |

## Example

### a minimalistic exmple

```js
import generateGraphqlSagaClient from "graphql-saga-client";

const GET_ALL_STAR_WARS_FILMS_TITLES_QUERY = `
{
  allFilms {
    films {
      title
    }
  }
}
`;

const graphqlSagaEffectClient = generateGraphqlSagaClient({
  url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
});

const onFetchAllStarWarsFilmsTitles = function* () {
  yield takeLatest(actionTypes.FETCH_ALL_STAR_WARS_FILMS_TITLES, function* () {
    const result = yield graphqlSagaEffectClient.query(GET_ALL_STAR_WARS_FILMS_TITLES_QUERY);
    yield put({ type: actionTypes.FETCH_ALL_STAR_WARS_FILMS_TITLES_SUCCESS, payload: result });
  });
};

export default onFetchAllStarWarsFilmsTitles;
```

note: it's a better approach to define the client somewhere separated and pass it down so you don't redefine it over and over, the library allows you to override client options where needed, check the next example for details

### a more complex approach

client defention: a client that requires authentication on each call and will retry to perform operation with an interval of 1 sec. during a 5 sec. window

```js
// src/api/graphqlSagaClient
import generateGraphqlSagaClient from "graphql-saga-client";

import firebase from "./firebase";

const graphqlSagaEffectClient = generateGraphqlSagaClient({
  url: "http://localhost:8888/graphql",
  auth: {
    type: "header",
    fn: async () => {
      const token = await firebase.auth().currentUser.getIdToken();
      return `bearer ${token}`;
    },
  },
  retry: { timeout: 5000, interval: 1000 },
});

export default graphqlSagaEffectClient;
```

client usage:

```js
import { takeLatest, put } from "redux-saga/effects";

import actionTypes from "../../actions/actionTypes";
import { likePostSuccess, likePostFailure } from "../../actions";

const LIKE_POST_MUTATION = `
  mutation likePost($postId: ID!) { ... }
`;

const onLikePostSaga = function* ({ graphqlSagaEffectClient }) {
  yield takeLatest(actionTypes.LIKE_POST, function* ({ payload: postId }) {
    yield graphqlSagaEffectClient.query(
      LIKE_POST_MUTATION,
      { postId },
      {
        onSuccess: function* ({ id, totalLikes }) {
          yield put(likePostSuccess(id, totalLikes));
        },
        onFailure: function* () {
          yield put(likePostFailure("some error message here"));
        },
      }
    );
  });
};

export default onLikePostSaga;
```

the client's default options (as defined in src/api/graphqlSagaClient in this example) could be overriden at any level later, for example to disable authentication on a certain endpoint or change retry policy parameters or even the endpoint url

```js
import { takeLatest, put } from "redux-saga/effects";

import actionTypes from "../../actions/actionTypes";
import { likePostSuccess, likePostFailure } from "../../actions";

const LIKE_POST_MUTATION = `
  mutation likePost($postId: ID!) { ... }
`;

const onLikePostSaga = function* ({ graphqlSagaEffectClient }) {
  yield takeLatest(actionTypes.LIKE_POST, function* ({ payload: postId }) {
    yield graphqlSagaEffectClient.query(
      LIKE_POST_MUTATION,
      { postId },
      {
        onSuccess: function* ({ id, totalLikes }) {
          yield put(likePostSuccess(id, totalLikes));
        },
        onFailure: function* () {
          yield put(likePostFailure("some error message here"));
        },
      },
      { auth: false, retry: { times: 3, interval: 1500 } }
    );
  });
};

export default onLikePostSaga;
```

## Note

the current API allows you to run both `query` and `mutation` through the `query` method, under the hood both `query` and `mutation` work the same, it's just a matter of symantics, but the separation between the two operations will be supported in a future release.
