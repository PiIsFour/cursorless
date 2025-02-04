// From https://fettblog.eu/typescript-better-object-keys/
type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never;

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;

  fromEntries<
    V extends PropertyKey,
    T extends [readonly [V, any]] | Array<readonly [V, any]>,
  >(
    entries: T,
  ): Flatten<UnionToIntersection<FromEntries<T[number]>>>;
}

// From https://github.com/microsoft/TypeScript/issues/35745#issuecomment-566932289
type UnionToIntersection<T> = (T extends T ? (p: T) => void : never) extends (
  p: infer U,
) => void
  ? U
  : never;
type FromEntries<T extends readonly [PropertyKey, any]> = T extends T
  ? Record<T[0], T[1]>
  : never;
type Flatten<T> = object & {
  [P in keyof T]: T[P];
};
