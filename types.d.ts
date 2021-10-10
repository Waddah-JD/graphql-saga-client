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

type HeaderAuthHandler = () => Promise<string>;

type AllowedAuthHanders = HeaderAuthHandler;

interface EnabledAuthOptions {
  type: string;
  fn: AllowedAuthHanders;
}

type RawAuthOptions = EnabledAuthOptions | boolean;

interface ValidAuthOptions {
  enabled: boolean;
  type?: string;
  fn?: AllowedAuthHanders;
}
