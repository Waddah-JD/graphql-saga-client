const validateUrl = (url: string): string => {
  if (!url) {
    throw new Error("'options' must contain a 'url' parameter");
  }

  if (typeof url !== "string") {
    throw new Error("'url' proprty in 'options' must be of type 'string'");
  }

  const validUrlPrefixes = ["http://", "https://", "www."];
  for (const validUrlPrefix of validUrlPrefixes) {
    if (url.startsWith(validUrlPrefix)) {
      return url;
    }
  }

  return `https://${url}`;
};

export default validateUrl;
