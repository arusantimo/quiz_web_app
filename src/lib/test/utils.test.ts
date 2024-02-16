import { convertMillisecondsToSeconds, replaceSpecialChars } from "../utils";

describe("유틸 함수 테스트", () => {
  test("replaceSpecialChars 함수가 특수 문자를 올바르게 변환하는지 확인", () => {
    // 특수 문자를 포함하는 문자열
    const stringWithSpecialChars = "Hello &#33; This is &#64; test.";

    // 함수 호출 후 변환된 문자열 확인
    const result = replaceSpecialChars(stringWithSpecialChars);

    // 변환된 문자열에 특수 문자가 없어야 함
    expect(result).not.toMatch(/&#\d+;/);

    // 변환된 문자열에 실제 문자가 포함되어 있어야 함
    expect(result).toContain("!");
    expect(result).toContain("@");
  });

  test("convertMillisecondsToSeconds 함수가 밀리초를 올바르게 초로 변환하는지 확인", () => {
    // 1000밀리초는 1초로 변환되어야 함
    expect(convertMillisecondsToSeconds(1000)).toBe(1);

    // 1500밀리초는 1초로 내림이 되어야 함
    expect(convertMillisecondsToSeconds(1500)).toBe(1);

    // 2000밀리초는 2초로 변환되어야 함
    expect(convertMillisecondsToSeconds(2000)).toBe(2);
  });
});
