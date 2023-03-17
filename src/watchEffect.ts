import { createContext, globalContext } from './context';
import { UnWatch } from './types';

type WatchEffect = () => void;
/**
 *
 */
export function watchEffect(effect: WatchEffect): UnWatch {
  const context = createContext(effect);
  globalContext.update(context);

  return () => context.stop();
}
