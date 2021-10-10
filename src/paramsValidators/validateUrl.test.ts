import validateUrl from "./validateUrl";

describe("validateUrl", () => {
  it("should throw an error if no url is passed", () => {
    expect(() => validateUrl(undefined)).toThrow("'options' must contain a 'url' parameter");
  });

  it("should return passed url if it is valid", () => {
    expect(validateUrl("http://localhost:8888/graphql")).toEqual("http://localhost:8888/graphql");
  });

  it("should add 'https' if the passed url doesn't start with a valid url 'prefix'", () => {
    expect(validateUrl("localhost:8888/graphql")).toEqual("https://localhost:8888/graphql");
  });
});
