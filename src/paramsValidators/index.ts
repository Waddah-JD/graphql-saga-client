import validateUrl from "./validateUrl";
import validateAuthOptions from "./validateAuthOptions";
import validateRetrierOptions from "./validateRetrierOptions";

export default (options: ClientOptions): ValidatedClientOptions => {
  const url = validateUrl(options.url);
  const auth = validateAuthOptions(options.auth);
  const retry = validateRetrierOptions(options.retry);

  return { url, auth, retry };
};
