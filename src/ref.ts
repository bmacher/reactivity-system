import { activeObserver, Observer } from './observer';

const REF_SYMBOL = Symbol('ref');

export interface Ref<T = any> {
  value: T;
  [REF_SYMBOL]: true;
}

export function isRef<T>(value: any): value is Ref<T> {
  return value !== undefined && value[REF_SYMBOL] === true;
}

export function ref<T = any>(initialValue: T): Ref<T> {
  let observers: Observer[] = [];
  let value = initialValue;

  function detach(observer: Observer) {
    observers = observers.filter((subscriber) => subscriber !== observer);
  }

  function attach(observer: Observer) {
    if (!observers.find((_observer) => _observer === observer)) {
      observers = [...observers, observer];
      observer.onStop(() => {
        detach(observer);
      });
    }
  }

  function notify() {
    observers.forEach((observer) => observer.update());
  }

  return Object.defineProperty({ [REF_SYMBOL]: true }, 'value', {
    get(): T {
      const observer = activeObserver.get();
      if (observer) attach(observer);

      return value;
    },

    set(newValue: T) {
      value = newValue;
      notify();
    },
  }) as Ref<T>;
}
