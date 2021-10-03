import axios, { AxiosRequestConfig } from "axios";

import parseOptionsParameter from "./parseOptionsParameter";
import { handleHeaderAuth } from "./authHandlers";
import { delay } from "./utils";

const generateGraphqlSagaEffectClient = (options) => {
  const { url, auth, retry } = parseOptionsParameter(options);

  return {
    url,
    auth,
    retry,
    query: function* (query, variables, handlers) {
      const config = {
        method: "POST",
        url: this.url,
        data: { query, variables },
        headers: { "Content-Type": "application/json" },
      } as AxiosRequestConfig;

      if (this.auth) {
        if (this.auth.type === "header") {
          const authorization = yield handleHeaderAuth(this.auth.fn);
          config.headers.authorization = authorization;
        }
        // TODO handle other cases
      }

      let tried = 0;

      while (tried <= this.retry.times) {
        try {
          const response = yield axios(config);

          if (handlers && handlers.onSuccess) {
            if (typeof handlers.onSuccess !== "function") {
              throw new Error(
                `'onSuccess' handler must be a function instead it is of type: ${typeof handlers.onSuccess}`
              );
            }
            yield handlers.onSuccess(response.data.data);
          }

          return response.data.data;
        } catch (error) {
          if (tried === this.retry.times) {
            if (handlers && handlers.onFailure) {
              if (typeof handlers.onFailure !== "function") {
                throw new Error(
                  `'onFailure' handler must be a function instead it is of type: ${typeof handlers.onSuccess}`
                );
              }
              yield handlers.onFailure(error);
            }
          } else {
            yield delay(this.retry.timeout);
          }
        }

        tried++;
      }
    },
  };
};

export default generateGraphqlSagaEffectClient;
