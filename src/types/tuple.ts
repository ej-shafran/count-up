type TupleImpl<
  TItem,
  TLength extends number,
  TAcc extends TItem[] = [],
> = TAcc["length"] extends TLength
  ? TAcc
  : TupleImpl<TItem, TLength, [...TAcc, TItem]>;

export type Tuple<TItem, TLength extends number> = number extends TLength
  ? TItem[]
  : TupleImpl<TItem, TLength>;
