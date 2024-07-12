import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

export type FCWithChildren<P = object> = FC<PropsWithChildren & P>;

export type StateSetter<T> = Dispatch<SetStateAction<T>>;
