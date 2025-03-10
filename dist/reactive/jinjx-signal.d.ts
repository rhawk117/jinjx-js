import { Watcher } from "./jinx-reactive.type";
/**
 * a reactive signal that holds a value and notifies listeners when the value changes
 */
declare class JinjxSignal<T> {
    protected _value: T;
    private listeners;
    constructor(initialValue: T);
    /**
     * Gets the current value of the signal
     */
    get value(): T;
    /**
     * Sets a new value for the signal and notifies all listeners
     */
    set value(newVal: T);
    /**
     * Determines if the signal should update by comparing new and old values
     * Can be overridden in subclasses for custom equality checks
     * @param newVal The new value
     * @param oldVal The current value
     */
    protected changed(newVal: T, oldVal: T): boolean;
    /**
     * Adds a listener to the value of the signal
     * @param watcher A function that will be called when the value changes
     * @returns A cleanup function that removes the watcher
     */
    listens(watcher: Watcher<T>): void;
    /**
     * removes a listener from the signal
     * @param watcher The watcher to remove
     */
    off(watcher: Watcher<T>): void;
    /**
     * notifies all listeners of a value change
     * @param newVal The new value
     * @param oldVal The previous value
     */
    protected notify(newVal: T, oldVal: T): void;
}
export default JinjxSignal;
