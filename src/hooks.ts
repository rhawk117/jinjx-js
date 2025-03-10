import JinjxSignal from "./reactive/jinjx-signal";
import JinjxSignalList from "./reactive/jinjx-signal-list";
import JinjxScope from "./dom/jinjx-scope";
import JinjxElement from "./dom/jinjx-element";

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

/**
 * creates a jinjx scope with the given jinjx element selected from
 * the DOM to delegate events and specify "events" to the element
 * @param el 
 * @returns 
 */
export function scope(el: JinjxElement): JinjxScope {
  return new JinjxScope(el);
}

type JinjxState<T> = readonly [() => T, (value: T) => void];


export function state<T>(reaction: (oldVal: T, newVal: T) => void, initialValue: T): JinjxState<T> {
  const signal = new JinjxSignal<T>(initialValue);  
  signal.listens(reaction);
  const set = (value: T) => signal.value = value;
  const get = () => signal.value;
  return [get, set] as JinjxState<T>;
}

