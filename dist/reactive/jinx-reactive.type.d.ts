export type Watcher<T> = (newVal: T, oldVal: T) => void;
export type Cleanup = () => void;
export type ComputeFn<T> = () => T;
export type EffectFn = () => void | Cleanup;
