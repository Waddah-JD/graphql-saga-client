const validateAuthOptions = (authOptions?: RawAuthOptions): ValidAuthOptions => {
  if (!authOptions) {
    return { enabled: false };
  }

  if (typeof authOptions === "object") {
    if (authOptions.type && authOptions.fn) {
      if (typeof authOptions.type !== "string") {
        throw new Error(
          `'auth' has a 'type' that is not supported, expected string value but instead got '${typeof authOptions.type}'`
        );
      }
      if (typeof authOptions.fn !== "function") {
        throw new Error(
          `'auth' has an unsupported 'fn' type, expected a function but instead got '${typeof authOptions.fn}'`
        );
      }

      return { enabled: true, ...authOptions };
    }
  }

  if (typeof authOptions === "boolean") {
    if (authOptions) {
      throw new Error(
        "invalid 'auth' options, expected either 'false' or an object, received 'true' instead"
      );
    }

    return { enabled: false };
  }
};

export default validateAuthOptions;
