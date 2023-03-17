# Reactivity System

Basic implementation of **Vue.js**' [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html): 

```ts
declare function ref<T>(value: T): Ref<T>;

declare function computedRef<T>(value: T): ComputedRef<T>;

type UnWatch = () => void;

type WatchEffect = () => void;
declare function watchEffect(effect: WatchEffect): UnWatch;

type WatchFunction<T> = () => T;
type WatchSource<T> = WatchFunction<T> | Ref<T> | ComputedRef<T>;
type WatchCallback<T> = (newValue: T, oldValue: T) => void;
declare function watch<T>(source: WatchSource<T>, cb: WatchCallback<T>): UnWatch;
```
