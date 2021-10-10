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

interface Handlers {
  onSuccess?: CallbackHandler;
  onFailure?: CallbackHandler;
}

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

interface ClientOptions {
  url?: string;
  auth?: RawAuthOptions;
  retry?: RetrierOptions;
}
interface ValidatedClientOptions {
  url: string;
  auth: ValidAuthOptions;
  retry: RetrierOptions;
}

interface Client {
  // TODO add more typing to query
  // eslint-disable-next-line @typescript-eslint/ban-types
  query: Function;
}
