import { createObserver } from './observer';
import { ref } from './ref';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ComputedRefSymbol = Symbol('computedRef');

export interface ComputedRef<T> {
  readonly value: T;
  [ComputedRefSymbol]: true;
}

export function isComputedRef<T>(value: any): value is ComputedRef<T> {
  return value !== undefined && value[ComputedRefSymbol] === true;
}

export function computed<T>(getter: () => T): ComputedRef<T> {
  const computedRef = ref<T | undefined>(undefined);

  function update() {
    computedRef.value = getter();
  }

  const observer = createObserver(update);
  observer.update();

  return Object.defineProperty({}, 'value', {
    get() {
      return computedRef.value;
    },
  }) as ComputedRef<T>;
}
