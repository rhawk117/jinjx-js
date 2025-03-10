


class JinjxSignalList<T> {
	private data: T[];
	private watchers: Set<(newVal: T[], oldVal: T[]) => void>;
  private _frozen: boolean = false;
  private _frozenValue: T[] = [];

	constructor(initial: T[] = []) {
		this.data = [...initial];
		this.watchers = new Set();
	}

  /**
   * freezes the collection and prevents updates from being dispatched
   * till .begin() is called with the oldValue being dispatched being the
   * value of the collection when it was paused
   */
  public pause() {
    this._frozen = true;
    this._frozenValue = [...this.data];
  }

  /**
   * unfreezes the collection and dispatches the oldValue
   * as the value of the collection when it was paused
   */
  public begin(): void {
    this._frozen = false;
    this.notify(this.data, this._frozenValue);
  }

	/**
	 * a *new copy* of the current array.
	 * Direct modification of the returned array does NOT affect this collection
	 * unless you set it back with .value = ...
	 */
	public get value(): T[] {
		return [...this.data];
	}

	/**
	 * replaces the entire array with a *new* array, triggering watchers.
	 */
	public set value(newArray: T[]) {
		const oldVal = this.data;
		this.data = [...newArray];
		this.notify(this.data, oldVal);
	}

	/**
	 * Subscribe to changes on this collection.
	 * The callback receives the new array and old array.
	 */
	public listener(fn: (newVal: T[], oldVal: T[]) => void): void {
		this.watchers.add(fn);
	}

	/**
	 * Unsubscribe a previously added callback.
	 */
	public stop(fn: (newVal: T[], oldVal: T[]) => void): void {
		this.watchers.delete(fn);
	}

	/**
	 * private method to notify watchers of changes.
	 */
	private notify(newVal: T[], oldVal: T[]): void {
		if(this._frozen) {
      return;
    }
    for (const w of this.watchers) {
			w(newVal, oldVal);
		}
	}

	// ----------------
	// Basic Array Ops
	// ----------------

	/**
	 * Insert items at the end of the array. (like Array.push())
	 */
	public push(...items: T[]): number {
		const oldVal = this.data.slice();
		const newLength = this.data.push(...items);
		this.notify(this.data, oldVal);
		return newLength;
	}

	/**
	 * Remove the last item from the array. (like Array.pop())
	 */
	public pop(): T | undefined {
		if (this.data.length === 0) return undefined;
		const oldVal = this.data.slice();
		const popped = this.data.pop();
		this.notify(this.data, oldVal);
		return popped;
	}

	/**
	 * Insert items at the beginning of the array. (like Array.unshift())
	 */
	public unshift(...items: T[]): number {
		const oldVal = this.data.slice();
		const newLength = this.data.unshift(...items);
		this.notify(this.data, oldVal);
		return newLength;
	}

	/**
	 * Remove the first item from the array. (like Array.shift())
	 */
	public shift(): T | undefined {
		if (this.data.length === 0) {
      return undefined;
    }
		const oldVal = this.data.slice();
		const shifted = this.data.shift();
		this.notify(this.data, oldVal);
		return shifted;
	}

	/**
	 * Removes or replaces existing elements and/or adds new elements in place. (like Array.splice())
	 */
	public splice(start: number, deleteCount?: number, ...items: T[]): T[] {
		const oldVal = this.data.slice();
		const removed = this.data.splice(start, deleteCount ?? 0, ...items);
		if (removed.length > 0 || items.length > 0) {
			this.notify(this.data, oldVal);
		}
		return removed;
	}


	/**
	 * Remove the item at a given index in the array.
	 * Returns the removed item or undefined if index is out of range.
	 */
	public removeByIndex(index: number): T | undefined {
		if (index < 0 || index >= this.data.length) {
			return undefined;
		}
		const oldVal = this.data.slice();
		const [removed] = this.data.splice(index, 1);
		this.notify(this.data, oldVal);
		return removed;
	}

	/**
	 * Finds the first index where boolCallback(item, index) returns true.
	 * Returns -1 if not found.
	 */
	public indexOf(
		boolCallback: (item: T, index: number, array: T[]) => boolean
	): number {
		return this.data.findIndex((item, idx, arr) =>
			boolCallback(item, idx, arr)
		);
	}

	/**
	 * Filter the collection in-place, removing items that don't satisfy the callback.
	 * Returns an array of removed items (if any).
	 */
	public filterBy(
		callback: (item: T, index: number, array: T[]) => boolean
	): T[] {
		const oldVal = this.data.slice();
		const newArr = this.data.filter(callback);
		const removed = oldVal.filter((item) => !newArr.includes(item));
		if (removed.length > 0 || newArr.length !== oldVal.length) {
			this.data = newArr;
			this.notify(this.data, oldVal);
		}
		return removed;
	}

	/**
	 * Sort the collection in-place using the provided compareFn (like Array.sort()).
	 * Returns the collection itself for chaining.
	 */
	public orderBy(compareFn?: (a: T, b: T) => number): this {
		const oldVal = this.data.slice();
		this.data.sort(compareFn);
		// Compare references or do a shallow check to see if anything changed:
		if (!arraysShallowEqual(this.data, oldVal)) {
			this.notify(this.data, oldVal);
		}
		return this;
	}

	/**
	 * remove all items matching callback(item, index) => boolean.
	 * Returns an array of removed items. If none removed, returns [].
	 */
	public remove(
		callback: (item: T, index: number, array: T[]) => boolean
	): T[] {
		const oldVal = this.data.slice();
		const removedItems: T[] = [];

		this.data = this.data.filter((item, index) => {
			const shouldRemove = callback(item, index, oldVal);
			if (shouldRemove) {
				removedItems.push(item);
				return false;
			}
			return true;
		});

		if (removedItems.length > 0) {
			this.notify(this.data, oldVal);
		}
		return removedItems;
	}

	/**
	 * Helper to find an item by callback without removing it.
	 * Returns the first match or undefined if none found.
	 */
	public find(
		callback: (item: T, index: number, array: T[]) => boolean
	): T | undefined {
		return this.data.find(callback);
	}

	
}

/**
 * util function to do a shallow equality check for two arrays.
 */
function arraysShallowEqual<T>(arr1: T[], arr2: T[]): boolean {
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}

export default JinjxSignalList;