import axios, { AxiosRequestConfig } from "axios";

const delay = (timeout: number): Promise<void> => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, timeout)
  );
};

export const performAxiosCallWithTimeoutRetrier = function* (
  retrier,
  config: AxiosRequestConfig,
  handlers
) {
  let running = true;
  let latestError;

  setTimeout(() => {
    running = false;
  }, retrier.timeout);

  while (running) {
    try {
      const response = yield axios(config);
      const result = response.data.data;
      yield handlers.onSuccess(result);
      return result;
    } catch (error) {
      latestError = error;

      if (error.code !== "ECONNABORTED") {
        yield delay(retrier.interval);
      }
    }
  }

  yield handlers.onFailure(latestError);
};

export const performAxiosCallWithFixedTimesRetrier = function* (
  retrier,
  config: AxiosRequestConfig,
  handlers
) {
  let tried = 0;

  while (tried <= retrier.times) {
    try {
      const response = yield axios(config);
      const result = response.data.data;
      yield handlers.onSuccess(result);
      return result;
    } catch (error) {
      if (tried === retrier.times) {
        yield handlers.onFailure(error);
      } else {
        if (error.code !== "ECONNABORTED") {
          yield delay(retrier.interval);
        }
      }
    }

    tried++;
  }
};
