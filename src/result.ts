export interface Failure<TError> {
  readonly _tag: "Failure";
  readonly error: TError;
}

export interface Success<TValue> {
  readonly _tag: "Success";
  readonly value: TValue;
}

export type Result<TValue, TError = never> = Success<TValue> | Failure<TError>;

export function fail<TError>(error: TError): Failure<TError> {
  return {
    _tag: "Failure",
    error,
  };
}

export function succeed<TValue>(value: TValue): Success<TValue> {
  return {
    _tag: "Success",
    value,
  };
}
