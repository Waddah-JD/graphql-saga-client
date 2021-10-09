interface IntervalRetrierOptions {
  times: number;
  interval: number;
}

interface TimeoutRetrierOptions {
  interval: number;
  timeout: number;
}

interface ValidateFixedTimesRetrierOptionsParameter {
  times: number;
  interval?: number;
}

interface ValidateTimeoutRetrierOptionsParameter {
  timeout: number;
  interval?: number;
}

type RetrierOptions = IntervalRetrierOptions | TimeoutRetrierOptions;

type CallbackHandler = (...args) => unknown;
