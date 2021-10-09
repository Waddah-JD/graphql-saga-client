# graphql-saga-client

## Why?

because you don't have to use a full-fledged client library (for example: `Apollo`) just to perform calls on a graphql endpoint, it's a great library but it's a kind of overkill when all you need is to make an endpoint query or a mutation, it doesn't take into consideration that some people like to keep their state, components, side-effects isolated and that's just pain to deal with in Apollo and the likes of it, here is where `graphql-saga-client` comes into play, just perform your call as an effect (the way it was always meant to be) and update the state accordingly, no more 10,000 lines-of-code components with all kind of hooks just to share state and make calls and update views and all other kinds of chaos.
