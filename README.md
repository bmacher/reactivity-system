# Reactivity System

Basic implementation of `Vue`s Composition API: 

```ts
declare function ref<T>(value: T): Ref<T>;

declare function computedRef<T>(value: T): ComputedRef<T>;

declare function watchEffect(effect: WatchEffect): UnWatch;

type WatchEffect = () => void;
declare function watchEffect(effect: WatchEffect): UnWatch;


type WatchFunction<T> = () => T;
type WatchSource<T> = WatchFunction<T> | Ref<T> | ComputedRef<T>;
type WatchCallback<T> = (newValue: T, oldValue: T) => void;
export function watch<T>(source: WatchSource<T>, cb: WatchCallback<T>): UnWatch;
```
