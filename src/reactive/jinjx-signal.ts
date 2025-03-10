import { EffectFn, Watcher, Cleanup, ComputeFn } from "./jinx-reactive.type";
/**
 * a reactive signal that holds a value and notifies listeners when the value changes
 */
class JinjxSignal<T> {
	protected _value: T;
	private listeners: Set<Watcher<T>>;

	constructor(initialValue: T) {
		this._value = initialValue;
		this.listeners = new Set();
	}

	/**
	 * Gets the current value of the signal
	 */
	get value(): T {
		return this._value;
	}

	/**
	 * Sets a new value for the signal and notifies all listeners
	 */
	set value(newVal: T) {
		if (!this.changed(newVal, this._value)) {
			return;
		}
		const oldVal = this._value;
		this._value = newVal;
		this.notify(newVal, oldVal);
	}

	/**
	 * Determines if the signal should update by comparing new and old values
	 * Can be overridden in subclasses for custom equality checks
	 * @param newVal The new value
	 * @param oldVal The current value
	 */
	protected changed(newVal: T, oldVal: T): boolean {
		return newVal !== oldVal;
	}

	/**
	 * Adds a listener to the value of the signal
	 * @param watcher A function that will be called when the value changes
	 * @returns A cleanup function that removes the watcher
	 */
	public listens(watcher: Watcher<T>): void {
		this.listeners.add(watcher);
	}

	/**
	 * removes a listener from the signal
	 * @param watcher The watcher to remove
	 */
	public off(watcher: Watcher<T>): void {
		this.listeners.delete(watcher);
	}

	/**
	 * notifies all listeners of a value change
	 * @param newVal The new value
	 * @param oldVal The previous value
	 */
	protected notify(newVal: T, oldVal: T): void {
		for (const watcher of this.listeners) {
			watcher(newVal, oldVal);
		}
	}
}

export default JinjxSignal;
