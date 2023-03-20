import { activeObserver, Observer } from './observer';

const REF_SYMBOL = Symbol('ref');

export interface Ref<T = any> {
  value: T;
  [REF_SYMBOL]: true;
}

export function isRef<T>(value: any): value is Ref<T> {
  return value !== undefined && value[REF_SYMBOL] === true;
}

class RefImpl<T> {
  public readonly [REF_SYMBOL] = true;

  private internalValue: T;

  private observers: Observer[] = [];

  constructor(initialValue: T) {
    this.internalValue = initialValue;
  }

  private detach(observer: Observer) {
    this.observers = this.observers.filter((_observer) => _observer !== observer);
  }

  private attach(observer: Observer) {
    if (!this.observers.find((_observer) => _observer === observer)) {
      this.observers = [...this.observers, observer];
      observer.onStop(() => {
        this.detach(observer);
      });
    }
  }

  private notify() {
    this.observers.forEach((observer) => observer.update());
  }

  get value(): T {
    const observer = activeObserver.get();
    if (observer) this.attach(observer);

    return this.internalValue;
  }

  set value(value: T) {
    this.internalValue = value;
    this.notify();
  }
}

export function ref<T = any>(initialValue: T): Ref<T> {
  return new RefImpl(initialValue);
}
