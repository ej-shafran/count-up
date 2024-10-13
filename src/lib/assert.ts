class AssertionError extends Error {
  constructor(message: string) {
    super(`assertion failed${message ? ": " + message : ""}`);
  }
}

export function assert(condition: boolean, message = ""): asserts condition {
  if (!condition) throw new AssertionError(message);
}
