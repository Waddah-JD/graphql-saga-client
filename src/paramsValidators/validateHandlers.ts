const validateHandlers = (handlers?: Handlers): Handlers => {
  const emptyFunction = () => undefined;

  if (!handlers) {
    return {
      onSuccess: emptyFunction,
      onFailure: emptyFunction,
    };
  }

  if (handlers.onSuccess) {
    if (typeof handlers.onSuccess !== "function") {
      throw new Error(
        `'onSuccess' handler must be a function instead it is of type: ${typeof handlers.onSuccess}`
      );
    }
  }

  if (handlers.onFailure) {
    if (typeof handlers.onFailure !== "function") {
      throw new Error(
        `'onFailure' handler must be a function instead it is of type: ${typeof handlers.onFailure}`
      );
    }
  }

  return {
    onSuccess: handlers.onSuccess || emptyFunction,
    onFailure: handlers.onFailure || emptyFunction,
  };
};

export default validateHandlers;
