export type UnSet = { status: "UN_SET" };
export type Success<D> = { status: "SUCCESS"; data: D };
export type Fail = { status: "FAIL"; error: Error };
export type Loading = { status: "LOADING" };

export type BaseData<D> = UnSet | Success<D> | Fail | Loading;
