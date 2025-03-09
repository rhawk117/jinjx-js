import JinjxSignal from "./reactive/jinjx-signal";
import JinjxSignalList from "./reactive/jinjx-signal-list";


/**
 * Creates a JinjxSignal with the given initial value.
 * @param initialValue 
 * @returns 
 */
export function signal<T>(initialValue: T): JinjxSignal<T> {
  return new JinjxSignal<T>(initialValue);
}

/**
 * creates a JinjxSignalList with the given initial value
 * @param initialValue 
 * @returns 
 */
export function signalList<T>(initialValue: T[]): JinjxSignalList<T> {
  return new JinjxSignalList<T>(initialValue);
}

