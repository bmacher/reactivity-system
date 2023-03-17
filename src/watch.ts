import { ComputedRef, isComputedRef } from './computed';
import { createContext, globalContext } from './context';
import { isRef, Ref } from './ref';
import { UnWatch } from './types';

type WatchFunction<T> = () => T;
type WatchSource<T> = WatchFunction<T> | Ref<T> | ComputedRef<T>;
type WatchCallback<T> = (newValue: T, oldValue: T) => void;

export function watch<T>(source: WatchSource<T>, cb: WatchCallback<T>): UnWatch {
  let _value: T;

  function update() {
    const oldValue = _value;
    _value = isRef<T>(source) || isComputedRef<T>(source) ? source.value : source();
    cb(_value, oldValue);
  }

  const context = createContext(update);
  globalContext.update(context);

  return () => context.stop();
}
