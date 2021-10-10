import { AxiosRequestConfig } from "axios";

import validateHandlers from "./paramsValidators/validateHandlers";
import validateParamters from "./paramsValidators";
import { handleHeaderAuth } from "./authHandlers";
import { performAxiosCallWithFixedTimesRetrier, performAxiosCallWithTimeoutRetrier } from "./utils";

const generateGraphqlSagaEffectClient = (options) => {
  const { url, auth, retry } = validateParamters(options);

  return {
    url,
    auth,
    retry,
    query: function* (query, variables, handlers) {
      const validatedHandlers = validateHandlers(handlers);

      const config = {
        method: "POST",
        url: this.url,
        data: { query, variables },
        headers: { "Content-Type": "application/json" },
      } as AxiosRequestConfig;

      if (this.auth) {
        if (!this.auth.type) {
          throw new Error("missing 'type' value in auth handler");
        }

        if (this.auth.type === "header") {
          const authorization = yield handleHeaderAuth(this.auth.fn);
          config.headers.authorization = authorization;
        } else {
          throw new Error("unsupported auth 'type' passed");
        }
      }

      let result;
      if (Object.prototype.hasOwnProperty.call(this.retry, "times")) {
        result = yield performAxiosCallWithFixedTimesRetrier(this.retry, config, validatedHandlers);
        return result;
      }
      if (Object.prototype.hasOwnProperty.call(this.retry, "timeout")) {
        result = yield performAxiosCallWithTimeoutRetrier(this.retry, config, validatedHandlers);
        return result;
      }
    },
  };
};

export default generateGraphqlSagaEffectClient;
