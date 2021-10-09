import validateRetrierOptions from "./validateRetrierOptions";

describe("validateRetrierOptions", () => {
  it("should return default options if no paramter is passed", () => {
    expect(validateRetrierOptions()).toEqual({ times: 0, interval: 0 });
  });

  it("should throw an error if the 'retrierOptions' parameter doesn't contain one of the required properties", () => {
    expect(() => validateRetrierOptions({})).toThrow(
      "'retrierOptions' must contain either a 'times' or a 'timeout' property"
    );
  });

  it("should return the default 'interval' value if not passed", () => {
    expect(validateRetrierOptions({ times: 50 })).toEqual({ times: 50, interval: 1000 });
    expect(validateRetrierOptions({ timeout: 2000 })).toEqual({ timeout: 2000, interval: 1000 });
  });

  it("should return the same passed parameters if they are valid", () => {
    expect(validateRetrierOptions({ times: 10, interval: 900 })).toEqual({
      times: 10,
      interval: 900,
    });

    expect(validateRetrierOptions({ timeout: 10000, interval: 500 })).toEqual({
      timeout: 10000,
      interval: 500,
    });
  });
});
