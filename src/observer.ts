export interface Observer {
  /**
   * Updates the `Observer`.
   */
  update: () => void;

  /**
   * Registers callback that is executed when `Observer` stops.
   * @param cb - Function being executed.
   */
  onStop(cb: () => void): void;

  /**
   * Stops the `Observer`.
   */
  stop(): void;
}

interface ActiveObserver {
  get(): Observer | undefined;
  set(context: Observer | undefined): void;
}

function createActiveObserver(): ActiveObserver {
  let _observer: Observer | undefined;

  return {
    get() {
      return _observer;
    },

    set(observer) {
      _observer = observer;
    },
  };
}

export const activeObserver = createActiveObserver();

/**
 * Creates an `Observer`.
 * @param onUpdate - Function called when when `Observer` is updated.
 */
export function createObserver(onUpdate: () => void): Observer {
  const dependencies: (() => void)[] = [];

  function onStop(cb: () => void) {
    dependencies.push(cb);
  }

  function stop() {
    dependencies.forEach((dep) => dep());
  }

  const observer: Observer = {
    update() {
      const currentContext = activeObserver.get();
      activeObserver.set(observer);
      onUpdate();
      activeObserver.set(currentContext);
    },

    onStop,
    stop,
  };

  return observer;
}
