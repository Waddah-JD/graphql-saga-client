const validateUrl = (options) => {
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

export default validateUrl;
