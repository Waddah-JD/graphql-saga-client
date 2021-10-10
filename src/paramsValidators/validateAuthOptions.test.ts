import validateAuthOptions from "./validateAuthOptions";

describe("validateAuthOptions", () => {
  it("should return an enabled false if no param is passed", () => {
    expect(validateAuthOptions()).toEqual({ enabled: false });
  });

  it("should return an enabled false if param is explicitly false", () => {
    expect(validateAuthOptions(false)).toEqual({ enabled: false });
  });

  it("should throw an error if 'auth' is true", () => {
    expect(() => validateAuthOptions(true)).toThrow(
      "invalid 'auth' options, expected either 'false' or an object, received 'true' instead"
    );
  });
});
