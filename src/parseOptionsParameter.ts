const getUrlParameter = (options) => {
  if (typeof options === "string") {
    // TODO handle different variations: "http://localhost:8888/graphql" | "/graphql" | "https" | .. etc
    return options;
  }

  if (typeof options === "object") {
    if (!options.url) {
      throw new Error("'opts' object doesn't contain a 'url' property");
    }
    if (typeof options.url !== "string") {
      throw new Error("'url' proprty in 'opts' object must be of type 'string'");
    }

    // TODO handle different variations: "http://localhost:8888/graphql" | "/graphql" | "https" | .. etc
    return options.url;
  }

  throw new Error("'opts' parameter must be either a string or an object");
};

const getAuthOptions = (authOptions) => {
  if (!authOptions) {
    return false;
  }

  return authOptions;
};

const getRetryOptions = (retryOptions) => {
  if (!retryOptions) {
    return { times: 0, interval: 0 };
  }

  if (retryOptions.hasOwnProperty("interval") && !retryOptions.hasOwnProperty("times")) {
    if (typeof retryOptions.interval !== "number")
      throw new Error("'options.interval' must be of type number");
    return { times: Number.MAX_SAFE_INTEGER, interval: retryOptions.interval };
  }

  if (!retryOptions.hasOwnProperty("interval") && retryOptions.hasOwnProperty("times")) {
    if (typeof retryOptions.times !== "number")
      throw new Error("'options.times' must be of type number");
    return { times: retryOptions.times, interval: 1000 };
  }

  if (retryOptions.hasOwnProperty("interval") && retryOptions.hasOwnProperty("times")) {
    if (typeof retryOptions.interval !== "number")
      throw new Error("'options.interval' must be of type number");
    if (typeof retryOptions.times !== "number")
      throw new Error("'options.times' must be of type number");
    return { times: retryOptions.times, interval: retryOptions.interval };
  }
};

export default (options) => {
  const url = getUrlParameter(options);
  const auth = getAuthOptions(options.auth);
  const retry = getRetryOptions(options.retry);

  return { url, auth, retry };
};
