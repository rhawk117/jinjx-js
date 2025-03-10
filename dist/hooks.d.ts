import JinjxSignal from "./reactive/jinjx-signal";
import JinjxSignalList from "./reactive/jinjx-signal-list";
import JinjxScope from "./dom/jinjx-scope";
import JinjxElement from "./dom/jinjx-element";
/**
 * Creates a JinjxSignal with the given initial value.
 * @param initialValue
 * @returns
 */
export declare function signal<T>(initialValue: T): JinjxSignal<T>;
/**
 * creates a JinjxSignalList with the given initial value
 * @param initialValue
 * @returns
 */
export declare function signalList<T>(initialValue: T[]): JinjxSignalList<T>;
/**
 * creates a jinjx scope with the given jinjx element selected from
 * the DOM to delegate events and specify "events" to the element
 * @param el
 * @returns
 */
export declare function scope(el: JinjxElement): JinjxScope;
type JinjxState<T> = readonly [() => T, (value: T) => void];
export declare function state<T>(reaction: (oldVal: T, newVal: T) => void, initialValue: T): JinjxState<T>;
export {};
