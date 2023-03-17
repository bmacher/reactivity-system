import { createObserver } from './observer';
import { ref } from './ref';

const COMPUTED_REF_SYMBOL = Symbol('computedRef');

export interface ComputedRef<T> {
  readonly value: T;
  [COMPUTED_REF_SYMBOL]: true;
}

export function isComputedRef<T>(value: any): value is ComputedRef<T> {
  return value !== undefined && value[COMPUTED_REF_SYMBOL] === true;
}

export function computed<T>(getter: () => T): ComputedRef<T> {
  const computedRef = ref<T | undefined>(undefined);

  function update() {
    computedRef.value = getter();
  }

  const observer = createObserver(update);
  observer.update();

  return Object.defineProperty({ [COMPUTED_REF_SYMBOL]: true }, 'value', {
    get() {
      return computedRef.value;
    },
  }) as ComputedRef<T>;
}
