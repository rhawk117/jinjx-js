class JinjxElementNotFound extends Error {
    constructor(selector) {
        super(`JinjxElementNotFound: Could not find element with selector "${selector}"`);
        this.name = "JinjxElementNotFoundError";
    }
}

/**
 * @file vexd-element.ts
 * @description A lightweight DOM utility class for chainable element manipulation, animations, and reactive signals.
 */
class JinjxElement {
    /**
     * creates an instance of JinjxElement.
     * @param {HTMLElement | string} element - A DOM element or a CSS selector string.
     * @throws Will throw an error if the element is not found.
     */
    constructor(element) {
        if (typeof element === "string") {
            const found = document.querySelector(element);
            if (!found) {
                throw new JinjxElementNotFound(element);
            }
            this.el = found;
        }
        else {
            this.el = element;
        }
    }
    /**
     * returns a new JinjxElement instance wrapping the first descendant matching the selector.
     * @param {string} selector - CSS selector to search for.
     * @returns {JinjxElement} A new JinjxElement instance.
     * @throws Will throw an error if no element is found.
     */
    select(selector) {
        const found = this.el.querySelector(selector);
        if (!found) {
            throw new JinjxElement(`VexJS: element not found for selector: ${selector}`);
        }
        return new JinjxElement(found);
    }
    /**
     * returns a new JinjxElement instance wrapping the first descendant matching the class name.
     * @param className
     * @returns
     */
    classed(className) {
        return this.select(`.${className}`);
    }
    /**
     * gets all descendants matching the class name.
     * @param className
     * @returns {JinjxElement[]}
     */
    classes(className) {
        return this.all(`.${className}`);
    }
    /**
     * returns a new JinjxElement instance wrapping the first descendant matching the id.
     * @param elementId
     * @returns {JinjxElement}
     */
    id(elementId) {
        return this.select(`#${elementId}`);
    }
    /**
     * Returns an array of JinjxElement instances for all descendants matching the selector.
     * @param {string} selector - CSS selector to search for.
     * @returns {JinjxElement[]} Array of JinjxElement instances.
     */
    all(selector) {
        const nodeList = this.el.querySelectorAll(selector);
        return Array.from(nodeList).map((el) => new JinjxElement(el));
    }
    /**
     * Iterates over each descendant matching the selector, invoking the callback.
     * @param {string} selector - CSS selector to search for.
     * @param {(JinjxElement: JinjxElement, index: number) => void} callback - Function to call for each element.
     */
    each(selector, callback) {
        this.all(selector).forEach((JinjxElement, index) => callback(JinjxElement, index));
    }
    html(content) {
        if (!content) {
            return this.el.innerHTML;
        }
        this.el.innerHTML = content;
        return this;
    }
    text(content) {
        if (!content) {
            return this.el.textContent || "";
        }
        this.el.textContent = content;
        return this;
    }
    /**
     * adds an event listener and returns a cleanup function to remove it.
     * @param {string} eventName - Event name.
     * @param {(e: Event) => void} callback - Callback function.
     * @returns {() => void} Function to remove the event listener.
     */
    event(eventName, callback) {
        this.el.addEventListener(eventName, callback);
        return () => {
            this.el.removeEventListener(eventName, callback);
        };
    }
    /**
     * adds an event listener that is automatically removed after one invocation.
     * @param {string} eventName - Event name.
     * @param {(e: Event) => void} callback - Callback function.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    once(eventName, callback) {
        this.el.addEventListener(eventName, callback, { once: true });
        return this;
    }
    /**
     * Dispatches a custom event.
     * @param {string} eventName - Custom event name.
     * @param {{ [key: string]: any }} [details={}] - Event details.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    emit(eventName, details = {}) {
        const event = new CustomEvent(eventName, { detail: details });
        this.el.dispatchEvent(event);
        return this;
    }
    /**
     * Adds a class to the element.
     * @param {string} className - Class name to add.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    addClass(className) {
        this.el.classList.add(className);
        return this;
    }
    /**
     * Removes a class from the element.
     * @param {string} className - Class name to remove.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    removeClass(className) {
        this.el.classList.remove(className);
        return this;
    }
    /**
     * Toggles a class on the element.
     * @param {string} className - Class name to toggle.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    toggleClass(className) {
        this.el.classList.toggle(className);
        return this;
    }
    /**
     * checks if the element has a specific class.
     * @param {string} className - Class name to check.
     * @returns {boolean} True if the element has the class.
     */
    hasClass(className) {
        return this.el.classList.contains(className);
    }
    attr(attribute, value) {
        if (value === undefined) {
            return this.el.getAttribute(attribute) || "";
        }
        else {
            this.el.setAttribute(attribute, value);
            return this;
        }
    }
    /**
     * checks if the element has a specific attribute.
     * @param {string} attribute - Attribute name.
     * @returns {boolean} True if the attribute exists.
     */
    hasAttr(attribute) {
        return this.el.hasAttribute(attribute);
    }
    data(attribute, value) {
        if (value === undefined) {
            return this.el.dataset[attribute] || "";
        }
        else {
            this.el.dataset[attribute] = value;
            return this;
        }
    }
    style(property, value) {
        if (value === undefined) {
            return this.el.style.getPropertyValue(property);
        }
        else {
            this.el.style.setProperty(property, value);
            return this;
        }
    }
    prop(propertyName, value) {
        if (value === undefined) {
            return this.el[propertyName];
        }
        else {
            this.el[propertyName] = value;
            return this;
        }
    }
    /**
     * returns the closest ancestor (or self) that matches the selector.
     * @param {string} selector - CSS selector.
     * @returns {JinjxElement | null} Closest matching JinjxElement instance or null.
     */
    closest(selector) {
        const found = this.el.closest(selector);
        return found ? new JinjxElement(found) : null;
    }
    /**
     * returns the parent element as a JinjxElement instance.
     * @returns {JinjxElement | null} The parent JinjxElement instance or null.
     */
    parent() {
        return this.el.parentElement
            ? new JinjxElement(this.el.parentElement)
            : null;
    }
    /**
     * returns an array of children as JinjxElement instances.
     * @returns {JinjxElement[]} Array of child JinjxElement instances.
     */
    children() {
        return Array.from(this.el.children).map((child) => new JinjxElement(child));
    }
    /**
     * returns the underlying native HTMLElement.
     * @returns {HTMLElement} The native DOM element.
     */
    native() {
        return this.el;
    }
    /**
     * uses the MutationObserver API to observe changes to a specific attribute.
     * @param {string} attribute - Attribute name to observe.
     * @param {(oldValue: string | null, newValue: string | null) => void} callback - Callback when attribute changes.
     * @returns {() => void} Function to disconnect the observer.
     */
    observer(attribute, callback) {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === "attributes" &&
                    mutation.attributeName === attribute) {
                    const oldVal = mutation.oldValue;
                    const newVal = this.el.getAttribute(attribute);
                    callback(oldVal, newVal);
                }
            }
        });
        observer.observe(this.el, {
            attributes: true,
            attributeFilter: [attribute],
            attributeOldValue: true,
        });
        return () => observer.disconnect();
    }
    /**
     * uses IntersectionObserver to observe when the element enters or leaves the viewport.
     * @param {(entry: IntersectionObserverEntry) => void} onScreen - Callback when element is in view.
     * @param {(entry: IntersectionObserverEntry) => void} offScreen - Callback when element is out of view.
     * @param {IntersectionObserverInit} [options] - IntersectionObserver options.
     * @returns {() => void} Function to disconnect the observer.
     */
    intersector(onScreen, offScreen, options) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.isIntersecting ? onScreen(entry) : offScreen(entry);
            });
        }, options);
        observer.observe(this.el);
        return () => observer.disconnect();
    }
    /**
     * Adds a class to the element for a specified time (ms) or until a promise resolves.
     * @param {string} className - Class name to add.
     * @param {number | Promise<any>} duration - Duration in ms or a promise.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    timedClass(className, duration) {
        this.addClass(className);
        if (typeof duration === "number") {
            setTimeout(() => {
                this.removeClass(className);
            }, duration);
        }
        else if (duration && typeof duration.then === "function") {
            duration.then(() => this.removeClass(className));
        }
        return this;
    }
    /**
     * equivalent to .appendChild
     * @param el
     * @returns {JinjxElement}
     */
    add(el) {
        if (typeof el === "string") {
            this.el.insertAdjacentHTML("beforeend", el);
            return this;
        }
        if (el instanceof JinjxElement) {
            this.el.appendChild(el.native());
            return this;
        }
        this.el.appendChild(el);
        return this;
    }
    /**
     * equivalent to .innerHTML = ""
     * @returns JinjxElement
     */
    empty() {
        this.el.innerHTML = "";
        return this;
    }
    /**
     * adds the CSS declaration to the element's style.
     * @param cssDeclaration
     * @returns
     */
    css(cssDeclaration) {
        Object.assign(this.el.style, cssDeclaration);
        return this;
    }
    /**
     * defines a mouseenter and mouseleave event.
     * @param mouseEnter
     * @param mouseLeave
     * @returns {() => void} function to remove the event listeners.
     */
    hover(mouseEnter, mouseLeave) {
        this.el.addEventListener("mouseenter", mouseEnter);
        this.el.addEventListener("mouseleave", mouseLeave);
        return () => {
            this.el.removeEventListener("mouseenter", mouseEnter);
            this.el.removeEventListener("mouseleave", mouseLeave);
        };
    }
    /*
     * equivalent to addEventListener("click", callback) or el.click()
     * @param callback
     * @returns {() => void} function to remove the event listener.
     */
    onClick(callback) {
        this.el.addEventListener("click", callback);
        return () => this.el.removeEventListener("click", callback);
    }
    /**
     * equivalent to addEventListener("change", callback)
     * @param callback
     * @returns {() => void} function to remove the event listener.
     */
    onChange(callback) {
        this.el.addEventListener("change", callback);
        return () => this.el.removeEventListener("change", callback);
    }
    value(value) {
        if (value === undefined) {
            return this.el.value;
        }
        this.el.value = value;
        return this;
    }
    /**
     * sets the element's disabled property.
     * @param predicate
     * @returns {JinjxElement}
     */
    disable(predicate) {
        this.prop("disabled", !!predicate);
        return this;
    }
    /**
     * sets the element's aria attribute.
     * (e.g aria("label", "my label")) -> aria-label="my label"
     * @param attribute
     * @param value
     * @returns {JinjxElement}
     */
    aria(attribute, value) {
        if (value === undefined) {
            return this.el.getAttribute(`aria-${attribute}`) || "";
        }
        this.el.setAttribute(`aria-${attribute}`, value);
        return this;
    }
    /**
     * returns the element's position and size.
     * @returns {DOMRect}
     */
    rect() {
        return this.el.getBoundingClientRect();
    }
    /**
     * returns the element's offset position.
     * @returns {top: number, left: number}
     */
    offset() {
        const { top, left } = this.rect();
        return { top, left };
    }
    remove(selector) {
        if (!selector) {
            this.el.remove();
            return;
        }
        this.all(selector).forEach((el) => el.remove());
    }
    /**
     * triggers a click event on the element.
     */
    click() {
        this.el.click();
        return this;
    }
    /**
     * sets the element's visibility.
     * @param {boolean} visible - True to show, false to hide.
     * @returns {JinjxElement}
     */
    visible(visible) {
        this.el.style.display = visible ? "" : "none";
        return this;
    }
    /**
     * sets the element's opacity.
     * @param {number} opacity - Opacity value between 0 and 1.
     * @returns {JinjxElement}
     */
    opacity(opacity) {
        this.el.style.opacity = opacity.toString();
        return this;
    }
    /**
     * Focuses the element
     * @returns {JinjxElement}
     */
    focus() {
        this.el.focus();
        return this;
    }
    /**
     * blurs the element
     * @returns {JinjxElement}
     */
    blur() {
        this.el.blur();
        return this;
    }
    /**
     * sets the tab index of the element.
     * @param tabdex
     * @returns {JinjxElement}
     */
    tabdex(tabdex) {
        this.el.tabIndex = tabdex;
        return this;
    }
}

class JinjxDOM {
    static ready(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback);
        }
        else {
            callback(new Event("DOMContentLoaded"));
        }
    }
    static id(id) {
        const element = document.getElementById(id);
        if (!element) {
            throw new JinjxElementNotFound(`Element with id "${id}" not found.`);
        }
        return new JinjxElement(element);
    }
    static classed(className) {
        const elements = document.getElementsByClassName(className);
        return Array.from(elements).map((el) => new JinjxElement(el));
    }
    static tags(tagName) {
        const elements = document.getElementsByTagName(tagName);
        return Array.from(elements).map((el) => new JinjxElement(el));
    }
    static forms() {
        const elements = document.forms;
        return Array.from(elements).map((el) => new JinjxElement(el));
    }
    static select(selector) {
        const el = document.querySelector(selector);
        if (!el) {
            throw new JinjxElementNotFound(selector);
        }
        return new JinjxElement(el);
    }
    static all(selector) {
        const elements = document.querySelectorAll(selector);
        if (!elements) {
            throw new JinjxElementNotFound(selector);
        }
        return Array.from(elements).map((el) => new JinjxElement(el));
    }
    /**
     * creates a new JinjxElement from a tag name and returns it
     * @param tagName The tag name of the element to create
     * @returns
     */
    static create(tagName, options) {
        const element = document.createElement(tagName, options);
        return new JinjxElement(element);
    }
    /**
     * creates a VexdElement from a template literal and returns the
     * "top-level" element or container, if there are multiple only the
     * first one is returned as to ensure your templates are short as this
     * shouldn't be used for massive templates
     */
    static template(strings, ...values) {
        const rawHTML = strings.reduce((result, string, i) => {
            var _a;
            const value = i < values.length ? String((_a = values[i]) !== null && _a !== void 0 ? _a : "") : "";
            return result + string + value;
        }, "");
        const template = document.createElement("template");
        template.innerHTML = rawHTML.trim();
        const content = template.content;
        return new JinjxElement(content.firstChild);
    }
    static emit(eventName, options) {
        const event = new CustomEvent(eventName, options);
        document.dispatchEvent(event);
    }
}

/**
 * a reactive signal that holds a value and notifies listeners when the value changes
 */
class JinjxSignal {
    constructor(initialValue) {
        this._value = initialValue;
        this.listeners = new Set();
    }
    /**
     * Gets the current value of the signal
     */
    get value() {
        return this._value;
    }
    /**
     * Sets a new value for the signal and notifies all listeners
     */
    set value(newVal) {
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
    changed(newVal, oldVal) {
        return newVal !== oldVal;
    }
    /**
     * Adds a listener to the value of the signal
     * @param watcher A function that will be called when the value changes
     * @returns A cleanup function that removes the watcher
     */
    listens(watcher) {
        this.listeners.add(watcher);
    }
    /**
     * removes a listener from the signal
     * @param watcher The watcher to remove
     */
    off(watcher) {
        this.listeners.delete(watcher);
    }
    /**
     * notifies all listeners of a value change
     * @param newVal The new value
     * @param oldVal The previous value
     */
    notify(newVal, oldVal) {
        for (const watcher of this.listeners) {
            watcher(newVal, oldVal);
        }
    }
}

class JinjxSignalList {
    constructor(initial = []) {
        this._frozen = false;
        this._frozenValue = [];
        this.data = [...initial];
        this.watchers = new Set();
    }
    /**
     * freezes the collection and prevents updates from being dispatched
     * till .begin() is called with the oldValue being dispatched being the
     * value of the collection when it was paused
     */
    pause() {
        this._frozen = true;
        this._frozenValue = [...this.data];
    }
    /**
     * unfreezes the collection and dispatches the oldValue
     * as the value of the collection when it was paused
     */
    begin() {
        this._frozen = false;
        this.notify(this.data, this._frozenValue);
    }
    /**
     * a *new copy* of the current array.
     * Direct modification of the returned array does NOT affect this collection
     * unless you set it back with .value = ...
     */
    get value() {
        return [...this.data];
    }
    /**
     * replaces the entire array with a *new* array, triggering watchers.
     */
    set value(newArray) {
        const oldVal = this.data;
        this.data = [...newArray];
        this.notify(this.data, oldVal);
    }
    /**
     * Subscribe to changes on this collection.
     * The callback receives the new array and old array.
     */
    listener(fn) {
        this.watchers.add(fn);
    }
    /**
     * Unsubscribe a previously added callback.
     */
    stop(fn) {
        this.watchers.delete(fn);
    }
    /**
     * private method to notify watchers of changes.
     */
    notify(newVal, oldVal) {
        if (this._frozen) {
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
    push(...items) {
        const oldVal = this.data.slice();
        const newLength = this.data.push(...items);
        this.notify(this.data, oldVal);
        return newLength;
    }
    /**
     * Remove the last item from the array. (like Array.pop())
     */
    pop() {
        if (this.data.length === 0)
            return undefined;
        const oldVal = this.data.slice();
        const popped = this.data.pop();
        this.notify(this.data, oldVal);
        return popped;
    }
    /**
     * Insert items at the beginning of the array. (like Array.unshift())
     */
    unshift(...items) {
        const oldVal = this.data.slice();
        const newLength = this.data.unshift(...items);
        this.notify(this.data, oldVal);
        return newLength;
    }
    /**
     * Remove the first item from the array. (like Array.shift())
     */
    shift() {
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
    splice(start, deleteCount, ...items) {
        const oldVal = this.data.slice();
        const removed = this.data.splice(start, deleteCount !== null && deleteCount !== void 0 ? deleteCount : 0, ...items);
        if (removed.length > 0 || items.length > 0) {
            this.notify(this.data, oldVal);
        }
        return removed;
    }
    // ----------------
    // Additional Utilities
    // ----------------
    /**
     * Remove the item at a given index in the array.
     * Returns the removed item or undefined if index is out of range.
     */
    removeByIndex(index) {
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
    indexOf(boolCallback) {
        return this.data.findIndex((item, idx, arr) => boolCallback(item, idx, arr));
    }
    /**
     * Filter the collection in-place, removing items that don't satisfy the callback.
     * Returns an array of removed items (if any).
     */
    filterBy(callback) {
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
    orderBy(compareFn) {
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
    remove(callback) {
        const oldVal = this.data.slice();
        const removedItems = [];
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
    find(callback) {
        return this.data.find(callback);
    }
}
/**
 * util function to do a shallow equality check for two arrays.
 */
function arraysShallowEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

class JinjxScope {
    constructor(host) {
        this.host = host;
        this._effectStore = [];
    }
    /**
     * delegates an event to a child that matches the selector
     *
     * @param eventName the name of the event to listen to
     * @param selector the selector to match the element
     * @param eventHandler the function to call when the event is triggered
     */
    delegate(eventName, selector, eventHandler) {
        const computedHandler = (e) => {
            const target = e.target;
            if (target && target.matches(selector)) {
                eventHandler(e, new JinjxElement(target));
            }
        };
        const disposeFn = this.host.event(eventName, computedHandler);
        this._effectStore.push(disposeFn);
    }
    /**
     * adds an "effect" to clean up when the scope is disposed
     * @param effectFn
     */
    effect(effectFn) {
        this._effectStore.push(effectFn);
    }
    /**
     * disposes the scope and all effects
     */
    dispose() {
        for (const effect of this._effectStore) {
            effect();
        }
        this._effectStore = [];
    }
    enter(callback) {
        callback(this.host);
    }
}

/**
 * Creates a JinjxSignal with the given initial value.
 * @param initialValue
 * @returns
 */
function signal(initialValue) {
    return new JinjxSignal(initialValue);
}
/**
 * creates a JinjxSignalList with the given initial value
 * @param initialValue
 * @returns
 */
function signalList(initialValue) {
    return new JinjxSignalList(initialValue);
}
/**
 * creates a jinjx scope with the given jinjx element selected from
 * the DOM to delegate events and specify "events" to the element
 * @param el
 * @returns
 */
function scope(el) {
    return new JinjxScope(el);
}
function state(reaction, initialValue) {
    const signal = new JinjxSignal(initialValue);
    signal.listens(reaction);
    const set = (value) => signal.value = value;
    const get = () => signal.value;
    return [get, set];
}

/**
 * given an element and a property name, this function will return the following:
 * [onChange, off]
 * - onChange is a function that takes a callback that will be called when the property changes
 *   which is passed the old and new value
 * - off is a function that will stop the mutation observer
 * @param propName - the name of the property the mutation observer will watch
 * @param el - the element to watch
 * @returns
 */
function propState(propName, el) {
    let mutator = null;
    let value = el.attr(propName) || "";
    const onChange = (changeCb) => {
        if (mutator) {
            mutator.disconnect();
            mutator = null;
        }
        mutator = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type !== "attributes" ||
                    mutation.attributeName !== propName) {
                    continue;
                }
                const newValue = el.attr(propName) || "";
                const oldValue = value;
                value = newValue;
                changeCb(newValue, oldValue);
            }
        });
        mutator.observe(el.native(), {
            attributes: true,
            attributeFilter: [propName],
            attributeOldValue: true,
        });
    };
    const off = () => {
        if (mutator) {
            mutator.disconnect();
            mutator = null;
        }
    };
    return [onChange, off];
}
/**
 * begins an interval and returns a function to stop it
 * @param intervalCb
 * @param ms
 * @returns {VoidFunction}
 */
function interval(intervalCb, ms) {
    let id = window.setInterval(() => {
        intervalCb();
    }, ms);
    return () => {
        if (!id)
            return;
        window.clearInterval(id);
        id = null;
    };
}
/**
 * begins a timeout and returns a function to clear it
 * @param timeoutCb
 * @param ms
 * @returns {VoidFunction}
 */
function countdown(timeoutCb, ms) {
    let id = window.setTimeout(() => {
        timeoutCb();
    }, ms);
    return () => {
        if (!id)
            return;
        window.clearTimeout(id);
        id = null;
    };
}
const resolveTemplateString = (strings, ...values) => {
    const rawHTML = strings.reduce((result, string, i) => {
        var _a;
        const value = i < values.length ? String((_a = values[i]) !== null && _a !== void 0 ? _a : "") : "";
        return result + string + value;
    }, "");
    const template = document.createElement("template");
    template.innerHTML = rawHTML.trim();
    return template;
};
/**
 * creates a JinjxElement from a template literal and returns the
 * "top-level" element or container, if there are multiple only the
 * first one is returned as to ensure your templates are short.
 * @param strings
 * @param values
 * @returns
 */
function snippet(strings, ...values) {
    const template = resolveTemplateString(strings, ...values);
    const content = template.content;
    return new JinjxElement(content.firstChild);
}

export { JinjxDOM, JinjxElement, countdown, interval, propState, scope, signal, signalList, snippet, state };
//# sourceMappingURL=index.esm.js.map
