const validateFixedTimesRetrierOptions = (
  retrierOptions: ValidateFixedTimesRetrierOptionsParameter
): RetrierOptions => {
  if (typeof retrierOptions.times !== "number") {
    throw new Error("'retrierOptions.times' must be of type number");
  }

  if (!Object.prototype.hasOwnProperty.call(retrierOptions, "interval")) {
    return { times: retrierOptions.times, interval: 1000 };
  }

  if (Object.prototype.hasOwnProperty.call(retrierOptions, "interval")) {
    if (typeof retrierOptions.interval !== "number") {
      throw new Error("'retrierOptions.interval' must be of type number");
    }

    return { times: retrierOptions.times, interval: retrierOptions.interval };
  }
};

const validateTimeoutRetrierOptions = (
  retrierOptions: ValidateTimeoutRetrierOptionsParameter
): RetrierOptions => {
  if (typeof retrierOptions.timeout !== "number") {
    throw new Error("'retrierOptions.timeout' must be of type number");
  }

  if (!Object.prototype.hasOwnProperty.call(retrierOptions, "interval")) {
    return { timeout: retrierOptions.timeout, interval: 1000 };
  }

  if (Object.prototype.hasOwnProperty.call(retrierOptions, "interval")) {
    if (typeof retrierOptions.interval !== "number") {
      throw new Error("'retrierOptions.interval' must be of type number");
    }

    return { timeout: retrierOptions.timeout, interval: retrierOptions.interval };
  }
};

const validateRetrierOptions = (retrierOptions?: {
  times?: number;
  timeout?: number;
  interval?: number;
}): RetrierOptions => {
  if (!retrierOptions) {
    return { times: 0, interval: 0 };
  }

  if (retrierOptions.times) {
    return validateFixedTimesRetrierOptions(
      retrierOptions as ValidateFixedTimesRetrierOptionsParameter
    );
  }

  if (retrierOptions.timeout) {
    return validateTimeoutRetrierOptions(retrierOptions as ValidateTimeoutRetrierOptionsParameter);
  }

  throw new Error("'retrierOptions' must contain either a 'times' or a 'timeout' property");
};

export default validateRetrierOptions;
