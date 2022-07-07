import { ReactPortal, ReactElement } from "react";

type ReactNode =
  | ReadonlyArray<ReactNode>
  | ReactElement
  | string
  | number
  | ReactPortal
  | boolean
  | null
  | undefined;

export type ReactWithChildRen<T = {}> = T & { children?: ReactNode };
