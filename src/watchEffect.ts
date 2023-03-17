import { createObserver } from './observer';
import { UnWatch } from './types';

type WatchEffect = () => void;

/**
 *
 */
export function watchEffect(effect: WatchEffect): UnWatch {
  const observer = createObserver(effect);
  observer.update();

  return () => observer.stop();
}
