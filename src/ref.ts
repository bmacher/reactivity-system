import { Context, globalContext } from './context';

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
  let subscribers: Context[] = [];
  let _value = value;
  const _ref = { [RefSymbol]: true };

  return Object.defineProperty(_ref, 'value', {
    get(): T {
      const context = globalContext.get();

      if (context) {
        if (!subscribers.find((subscriber) => subscriber === context)) {
          subscribers = [...subscribers, context];
          context.onStop(() => {
            subscribers = subscribers.filter((subscriber) => subscriber !== context);
          });
        }
      }

      return _value;
    },

    set(newValue: T) {
      _value = newValue;
      subscribers.forEach((subscriber) => globalContext.update(subscriber));
    },
  }) as Ref<T>;
}
