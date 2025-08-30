// src/setupTests.js
import "@testing-library/jest-dom";

// Keep a handle to the spy so we can safely restore it.
let warnSpy;

beforeAll(() => {
  // If something else already mocked it, don't double-spy
  if (!console.warn._isSpied) {
    warnSpy = jest.spyOn(console, "warn").mockImplementation((msg, ...rest) => {
      if (
        typeof msg === "string" &&
        msg.includes("React Router Future Flag Warning")
      )
        return;
      // Forward other warnings
      // eslint-disable-next-line no-console
      console.__origWarn
        ? console.__origWarn(msg, ...rest)
        : console.log(msg, ...rest);
    });
    // mark as spied to avoid re-spying in case of re-imports
    console.warn._isSpied = true;
    // stash original warn if we want to forward non-router warnings
    if (!console.__origWarn) console.__origWarn = console.warn;
  }
});

afterAll(() => {
  if (warnSpy && typeof warnSpy.mockRestore === "function") {
    warnSpy.mockRestore();
  }
  // Clean marker
  if (console.warn && console.warn._isSpied) delete console.warn._isSpied;
});
