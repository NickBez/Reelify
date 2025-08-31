import "@testing-library/jest-dom";

let warnSpy;

beforeAll(() => {
  if (!console.warn._isSpied) {
    warnSpy = jest.spyOn(console, "warn").mockImplementation((msg, ...rest) => {
      if (
        typeof msg === "string" &&
        msg.includes("React Router Future Flag Warning")
      )
        return;
      console.__origWarn
        ? console.__origWarn(msg, ...rest)
        : console.log(msg, ...rest);
    });
    console.warn._isSpied = true;
    if (!console.__origWarn) console.__origWarn = console.warn;
  }
});

afterAll(() => {
  if (warnSpy && typeof warnSpy.mockRestore === "function") {
    warnSpy.mockRestore();
  }
  if (console.warn && console.warn._isSpied) delete console.warn._isSpied;
});
