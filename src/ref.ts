import { activeObserver, Observer } from './observer';

// eslint-disable-next-line @typescript-eslint/naming-convention
const RefSymbol = Symbol('ref');

export interface Ref<T = any> {
  value: T;
  [RefSymbol]: true;
}

export function isRef<T>(value: any): value is Ref<T> {
  return value !== undefined && value[RefSymbol] === true;
}

/**
 * Creates a reactive reference.
 * @param value - Initial value of the ref.
 */
export function ref<T = any>(value: T): Ref<T> {
  let observers: Observer[] = [];
  let _value = value;
  const _ref = { [RefSymbol]: true };

  return Object.defineProperty(_ref, 'value', {
    get(): T {
      const observer = activeObserver.get();

      if (observer && !observers.find((_observer) => _observer === observer)) {
        observers = [...observers, observer];
        observer.onStop(() => {
          observers = observers.filter((subscriber) => subscriber !== observer);
        });
      }

      return _value;
    },

    set(newValue: T) {
      _value = newValue;
      observers.forEach((subscriber) => subscriber.update());
    },
  }) as Ref<T>;
}
