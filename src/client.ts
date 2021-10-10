import { AxiosRequestConfig } from "axios";

import validateHandlers from "./paramsValidators/validateHandlers";
import validateParamters from "./paramsValidators";
import { handleHeaderAuth } from "./authHandlers";
import { performAxiosCallWithFixedTimesRetrier, performAxiosCallWithTimeoutRetrier } from "./utils";

const generateGraphqlSagaEffectClient = (clientOptions) => {
  return {
    query: function* (query, variables, handlers, queryOptions = {}) {
      const options = { ...clientOptions, ...queryOptions };
      const { url, auth, retry } = validateParamters(options);
      const validatedHandlers = validateHandlers(handlers);

      const config = {
        method: "POST",
        url,
        data: { query, variables },
        headers: { "Content-Type": "application/json" },
        timeout: retry.interval,
        timeoutErrorMessage: "Connection timed out!",
      } as AxiosRequestConfig;

      if (auth.enabled) {
        if (!auth.type) {
          throw new Error("missing 'type' value in auth handler");
        }

        if (auth.type === "header") {
          const authorization = yield handleHeaderAuth(auth.fn);
          config.headers.authorization = authorization;
        } else {
          throw new Error("unsupported auth 'type' passed");
        }
      }

      let result;
      if (Object.prototype.hasOwnProperty.call(retry, "times")) {
        result = yield performAxiosCallWithFixedTimesRetrier(retry, config, validatedHandlers);
        return result;
      }
      if (Object.prototype.hasOwnProperty.call(retry, "timeout")) {
        result = yield performAxiosCallWithTimeoutRetrier(retry, config, validatedHandlers);
        return result;
      }
    },
  };
};

export default generateGraphqlSagaEffectClient;
