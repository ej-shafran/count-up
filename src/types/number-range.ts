type NumberRangeInclusiveImpl<
  TMax extends number,
  TAcc extends 1[] = [],
> = TAcc["length"] extends TMax
  ? TMax
  : TAcc["length"] | NumberRangeInclusiveImpl<TMax, [...TAcc, 1]>;

type NumberRangeExclusiveImpl<
  TMax extends number,
  TAcc extends 1[] = [],
> = TAcc["length"] extends TMax
  ? never
  : TAcc["length"] | NumberRangeExclusiveImpl<TMax, [...TAcc, 1]>;

type NumberRangeImpl<
  TMax extends number,
  TExclusive extends boolean | undefined,
> = number extends TMax
  ? number
  : TExclusive extends true
    ? NumberRangeExclusiveImpl<TMax>
    : NumberRangeInclusiveImpl<TMax>;

export type NumberRange<
  TOptions extends {
    max: number;
    isExclusive?: boolean;
  },
> = NumberRangeImpl<TOptions["max"], TOptions["isExclusive"]>;
