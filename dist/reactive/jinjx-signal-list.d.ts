declare class JinjxSignalList<T> {
    private data;
    private watchers;
    private _frozen;
    private _frozenValue;
    constructor(initial?: T[]);
    /**
     * freezes the collection and prevents updates from being dispatched
     * till .begin() is called with the oldValue being dispatched being the
     * value of the collection when it was paused
     */
    pause(): void;
    /**
     * unfreezes the collection and dispatches the oldValue
     * as the value of the collection when it was paused
     */
    begin(): void;
    /**
     * a *new copy* of the current array.
     * Direct modification of the returned array does NOT affect this collection
     * unless you set it back with .value = ...
     */
    get value(): T[];
    /**
     * replaces the entire array with a *new* array, triggering watchers.
     */
    set value(newArray: T[]);
    /**
     * Subscribe to changes on this collection.
     * The callback receives the new array and old array.
     */
    listener(fn: (newVal: T[], oldVal: T[]) => void): void;
    /**
     * Unsubscribe a previously added callback.
     */
    stop(fn: (newVal: T[], oldVal: T[]) => void): void;
    /**
     * private method to notify watchers of changes.
     */
    private notify;
    /**
     * Insert items at the end of the array. (like Array.push())
     */
    push(...items: T[]): number;
    /**
     * Remove the last item from the array. (like Array.pop())
     */
    pop(): T | undefined;
    /**
     * Insert items at the beginning of the array. (like Array.unshift())
     */
    unshift(...items: T[]): number;
    /**
     * Remove the first item from the array. (like Array.shift())
     */
    shift(): T | undefined;
    /**
     * Removes or replaces existing elements and/or adds new elements in place. (like Array.splice())
     */
    splice(start: number, deleteCount?: number, ...items: T[]): T[];
    /**
     * Remove the item at a given index in the array.
     * Returns the removed item or undefined if index is out of range.
     */
    removeByIndex(index: number): T | undefined;
    /**
     * Finds the first index where boolCallback(item, index) returns true.
     * Returns -1 if not found.
     */
    indexOf(boolCallback: (item: T, index: number, array: T[]) => boolean): number;
    /**
     * Filter the collection in-place, removing items that don't satisfy the callback.
     * Returns an array of removed items (if any).
     */
    filterBy(callback: (item: T, index: number, array: T[]) => boolean): T[];
    /**
     * Sort the collection in-place using the provided compareFn (like Array.sort()).
     * Returns the collection itself for chaining.
     */
    orderBy(compareFn?: (a: T, b: T) => number): this;
    /**
     * remove all items matching callback(item, index) => boolean.
     * Returns an array of removed items. If none removed, returns [].
     */
    remove(callback: (item: T, index: number, array: T[]) => boolean): T[];
    /**
     * Helper to find an item by callback without removing it.
     * Returns the first match or undefined if none found.
     */
    find(callback: (item: T, index: number, array: T[]) => boolean): T | undefined;
}
export default JinjxSignalList;
