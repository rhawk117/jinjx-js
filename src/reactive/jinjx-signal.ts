export type Watcher<T> = (newVal: T, oldVal: T) => void;

export class JinjxSignal<T> {
	private _value: T;
	private watchers: Set<Watcher<T>>;

	constructor(initialValue: T) {
		this._value = initialValue;
		this.watchers = new Set();
	}

	/**
	 * gets the current value of the signal
	 */
	get value(): T {
		return this._value;
	}

	/**
	 * sets a new value for the signal and notifies all watchers
	 */
	set value(newVal: T) {
		if (newVal !== this._value) {
			const oldVal = this._value;
			this._value = newVal;
			this.notify(newVal, oldVal);
		}
	}

	/**
	 * adds a watcher to the signal that will be called when the value changes
	 * @param watcher {Watcher<T>} a function that will be called when the value changes
	 */
	public listener(watcher: Watcher<T>): void {
		this.watchers.add(watcher);
	}

	/**
	 * removes a watcher from the signal
	 * @param watcher
	 */
	public stop(watcher: Watcher<T>): void {
		this.watchers.delete(watcher);
	}

	private notify(newVal: T, oldVal: T) {
		for (const watcher of this.watchers) {
			watcher(newVal, oldVal);
		}
	}
}
