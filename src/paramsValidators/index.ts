import validateUrl from "./validateUrl";
import validateAuthOptions from "./validateAuthOptions";
import validateRetrierOptions from "./validateRetrierOptions";

export default (options) => {
  const url = validateUrl(options);
  const auth = validateAuthOptions(options.auth);
  const retry = validateRetrierOptions(options.retry);

  return { url, auth, retry };
};
