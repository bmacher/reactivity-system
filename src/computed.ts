import { createObserver } from './observer';
import { ref } from './ref';

const COMPUTED_REF_SYMBOL = Symbol('computedRef');

export interface ComputedRef<T> {
  readonly value: T;
  [COMPUTED_REF_SYMBOL]: true;
}

type ComputedGetter<T> = () => T;

export function isComputedRef<T>(value: any): value is ComputedRef<T> {
  return value !== undefined && value[COMPUTED_REF_SYMBOL] === true;
}

class ComputedImpl<T> {
  public readonly [COMPUTED_REF_SYMBOL] = true;

  private internalValue = ref<T | undefined>(undefined);

  constructor(
    private readonly getter: ComputedGetter<T>,
  ) {
    const observer = createObserver(this.update);
    observer.update();
  }

  private readonly update = () => {
    this.internalValue.value = this.getter();
  };

  get value(): T {
    return this.internalValue.value as T;
  }
}

export function computed<T>(getter: ComputedGetter<T>): ComputedRef<T> {
  return new ComputedImpl<T>(getter);
}
