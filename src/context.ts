/* eslint-disable max-classes-per-file */

function createGlobalContext(): GlobalContext {
  let _context: Context | undefined;

  function get() {
    return _context;
  }

  function update(context: Context) {
    const currentContext = _context;
    _context = context;
    context.update();
    _context = currentContext;
  }

  return { get, update };
}

/**
 * Global context.
 */
export const globalContext = createGlobalContext();

type Update = () => void;

export interface Context {
  onStop(cb: () => void): void;
  stop(): void;
  update: Update;
}

export function createContext(update: Update): Context {
  const dependencies: (() => void)[] = [];

  /**
   * Registers callback that is executed when `Context` stops.
   * @param cb - Function being executed.
   */
  function onStop(cb: () => void) {
    dependencies.push(cb);
  }

  function stop() {
    dependencies.forEach((dep) => dep());
  }

  return {
    onStop,
    stop,
    update,
  };
}

interface GlobalContext {
  /**
   * Gets the current global context.
   */
  get(): Context | undefined;

  /**
   * Sets the global context and calls `context.update()`
   * immediately. The current context is cached meanwhile
   * and then set as global context again.
   *
   */
  update(context: Context): void;
}
