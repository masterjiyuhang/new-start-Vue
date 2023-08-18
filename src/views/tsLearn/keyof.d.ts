type NewProps<Obj> = {
  [prop in keyof Obj]: boolean;
};

type MyObj = { foo: number };

type NewMyObj = NewProps<MyObj>; // foo: boolean;

type Mutable<Obj> = {
  -readonly [P in keyof Obj]: Obj[P];
};

type MyObj = {
  readonly x: number;
};
type NewMyObj = Mutable<MyObj>;
