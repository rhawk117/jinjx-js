/**
 * @file vexd-element.ts
 * @description A lightweight DOM utility class for chainable element manipulation, animations, and reactive signals.
 */
declare class JinjxElement {
    private el;
    /**
     * creates an instance of JinjxElement.
     * @param {HTMLElement | string} element - A DOM element or a CSS selector string.
     * @throws Will throw an error if the element is not found.
     */
    constructor(element: HTMLElement | string);
    /**
     * returns a new JinjxElement instance wrapping the first descendant matching the selector.
     * @param {string} selector - CSS selector to search for.
     * @returns {JinjxElement} A new JinjxElement instance.
     * @throws Will throw an error if no element is found.
     */
    select(selector: string): JinjxElement;
    /**
     * returns a new JinjxElement instance wrapping the first descendant matching the class name.
     * @param className
     * @returns
     */
    classed(className: string): JinjxElement;
    /**
     * gets all descendants matching the class name.
     * @param className
     * @returns {JinjxElement[]}
     */
    classes(className: string): JinjxElement[];
    /**
     * returns a new JinjxElement instance wrapping the first descendant matching the id.
     * @param elementId
     * @returns {JinjxElement}
     */
    id(elementId: string): JinjxElement;
    /**
     * Returns an array of JinjxElement instances for all descendants matching the selector.
     * @param {string} selector - CSS selector to search for.
     * @returns {JinjxElement[]} Array of JinjxElement instances.
     */
    all(selector: string): JinjxElement[];
    /**
     * Iterates over each descendant matching the selector, invoking the callback.
     * @param {string} selector - CSS selector to search for.
     * @param {(JinjxElement: JinjxElement, index: number) => void} callback - Function to call for each element.
     */
    each(selector: string, callback: (JinjxElement: JinjxElement, index: number) => void): void;
    /**
     * gets or sets the inner HTML.
     * @overload
     * @returns {string} The element's inner HTML.
     */
    html(): string;
    /**
     * sets the inner HTML and returns the instance.
     * @param {string} content - HTML content.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    html(content: string): JinjxElement;
    /**
     * gets or sets the text content.
     * @overload
     * @returns {string} The element's text content.
     */
    text(): string;
    /**
     * sets the text content and returns the instance.
     * @param {string} content - Text content.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    text(content: string): JinjxElement;
    /**
     * adds an event listener and returns a cleanup function to remove it.
     * @param {string} eventName - Event name.
     * @param {(e: Event) => void} callback - Callback function.
     * @returns {() => void} Function to remove the event listener.
     */
    event(eventName: string, callback: (e: Event) => void): () => void;
    /**
     * adds an event listener that is automatically removed after one invocation.
     * @param {string} eventName - Event name.
     * @param {(e: Event) => void} callback - Callback function.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    once(eventName: string, callback: (e: Event) => void): JinjxElement;
    /**
     * Dispatches a custom event.
     * @param {string} eventName - Custom event name.
     * @param {{ [key: string]: any }} [details={}] - Event details.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    emit(eventName: string, details?: {
        [key: string]: any;
    }): JinjxElement;
    /**
     * Adds a class to the element.
     * @param {string} className - Class name to add.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    addClass(className: string): JinjxElement;
    /**
     * Removes a class from the element.
     * @param {string} className - Class name to remove.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    removeClass(className: string): JinjxElement;
    /**
     * Toggles a class on the element.
     * @param {string} className - Class name to toggle.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    toggleClass(className: string): JinjxElement;
    /**
     * checks if the element has a specific class.
     * @param {string} className - Class name to check.
     * @returns {boolean} True if the element has the class.
     */
    hasClass(className: string): boolean;
    /**
     * Gets or sets an attribute.
     * @overload
     * @param {string} attribute - Attribute name.
     * @returns {string} The attribute's value.
     */
    attr(attribute: string): string;
    /**
     * Sets an attribute and returns the instance.
     * @param {string} attribute - Attribute name.
     * @param {string} value - Attribute value.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    attr(attribute: string, value: string): JinjxElement;
    /**
     * checks if the element has a specific attribute.
     * @param {string} attribute - Attribute name.
     * @returns {boolean} True if the attribute exists.
     */
    hasAttr(attribute: string): boolean;
    /**
     * gets or sets a data attribute.
     * @overload
     * @param {string} attribute - Data attribute name.
     * @returns {string} The data attribute's value.
     */
    data(attribute: string): string;
    /**
     * sets a data attribute and returns the instance.
     * @param {string} attribute - Data attribute name.
     * @param {string} value - Data attribute value.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    data(attribute: string, value: string): JinjxElement;
    /**
     * gets or sets an inline style property.
     * @overload
     * @param {string} property - CSS property name.
     * @returns {string} The property's value.
     */
    style(property: string): string;
    /**
     * Sets a style property and returns the instance.
     * @param {string} property - CSS property name.
     * @param {string} value - CSS property value.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    style(property: string, value: string): JinjxElement;
    /**
     * gets or sets a native property.
     * @overload
     * @template T
     * @param {keyof T} propertyName - The property name.
     * @returns {T[keyof T]} The property's value.
     */
    prop<T>(propertyName: keyof T): T[keyof T];
    /**
     * sets a native property and returns the instance.
     * @template T
     * @param {keyof T} propertyName - The property name.
     * @param {T[keyof T]} value - The new value.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    prop<T>(propertyName: keyof T, value: T[keyof T]): JinjxElement;
    /**
     * returns the closest ancestor (or self) that matches the selector.
     * @param {string} selector - CSS selector.
     * @returns {JinjxElement | null} Closest matching JinjxElement instance or null.
     */
    closest(selector: string): JinjxElement | null;
    /**
     * returns the parent element as a JinjxElement instance.
     * @returns {JinjxElement | null} The parent JinjxElement instance or null.
     */
    parent(): JinjxElement | null;
    /**
     * returns an array of children as JinjxElement instances.
     * @returns {JinjxElement[]} Array of child JinjxElement instances.
     */
    children(): JinjxElement[];
    /**
     * returns the underlying native HTMLElement.
     * @returns {HTMLElement} The native DOM element.
     */
    native(): HTMLElement;
    /**
     * uses the MutationObserver API to observe changes to a specific attribute.
     * @param {string} attribute - Attribute name to observe.
     * @param {(oldValue: string | null, newValue: string | null) => void} callback - Callback when attribute changes.
     * @returns {() => void} Function to disconnect the observer.
     */
    observer(attribute: string, callback: (oldValue: string | null, newValue: string | null) => void): () => void;
    /**
     * uses IntersectionObserver to observe when the element enters or leaves the viewport.
     * @param {(entry: IntersectionObserverEntry) => void} onScreen - Callback when element is in view.
     * @param {(entry: IntersectionObserverEntry) => void} offScreen - Callback when element is out of view.
     * @param {IntersectionObserverInit} [options] - IntersectionObserver options.
     * @returns {() => void} Function to disconnect the observer.
     */
    intersector(onScreen: (entry: IntersectionObserverEntry) => void, offScreen: (entry: IntersectionObserverEntry) => void, options?: IntersectionObserverInit): () => void;
    /**
     * Adds a class to the element for a specified time (ms) or until a promise resolves.
     * @param {string} className - Class name to add.
     * @param {number | Promise<any>} duration - Duration in ms or a promise.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    timedClass(className: string, duration: number | Promise<any>): JinjxElement;
    /**
     * equivalent to .appendChild
     * @param el
     * @returns {JinjxElement}
     */
    add(el: HTMLElement | string | JinjxElement): JinjxElement;
    /**
     * equivalent to .innerHTML = ""
     * @returns JinjxElement
     */
    empty(): JinjxElement;
    /**
     * adds the CSS declaration to the element's style.
     * @param cssDeclaration
     * @returns
     */
    css(cssDeclaration: Partial<CSSStyleDeclaration>): JinjxElement;
    /**
     * defines a mouseenter and mouseleave event.
     * @param mouseEnter
     * @param mouseLeave
     * @returns {() => void} function to remove the event listeners.
     */
    hover(mouseEnter: (e: Event) => void, mouseLeave: (e: Event) => void): VoidFunction;
    onClick(callback: (e: Event) => void): VoidFunction;
    /**
     * equivalent to addEventListener("change", callback)
     * @param callback
     * @returns {() => void} function to remove the event listener.
     */
    onChange(callback: (e: Event) => void): VoidFunction;
    /**
     * gets or sets the value of an input element.
     * @overload
     * @returns {string} The value of the input element
     */
    value(): string;
    /**
     * sets the value of an input element and returns the instance.
     * @param {string} value - New value.
     * @returns {JinjxElement} The current JinjxElement instance.
     */
    value(value: string): JinjxElement;
    /**
     * sets the element's disabled property.
     * @param predicate
     * @returns {JinjxElement}
     */
    disable(predicate?: boolean): JinjxElement;
    /**
     * returns the element's aria attribute.
     * @overload
     * @param attribute
     */
    aria(attribute: string): string;
    /**
     * returns the element's position and size.
     * @returns {DOMRect}
     */
    rect(): DOMRect;
    /**
     * returns the element's offset position.
     * @returns {top: number, left: number}
     */
    offset(): {
        top: number;
        left: number;
    };
    /**
     * removes the element from the DOM.
     * @overload
     * @returns {void}
     */
    remove(): void;
    /**
     * removes all descendants matching the selector.
     * @param selector
     */
    remove(selector: string): void;
    /**
     * triggers a click event on the element.
     */
    click(): this;
    /**
     * sets the element's visibility.
     * @param {boolean} visible - True to show, false to hide.
     * @returns {JinjxElement}
     */
    visible(visible: boolean): JinjxElement;
    /**
     * sets the element's opacity.
     * @param {number} opacity - Opacity value between 0 and 1.
     * @returns {JinjxElement}
     */
    opacity(opacity: number): JinjxElement;
    /**
     * Focuses the element
     * @returns {JinjxElement}
     */
    focus(): JinjxElement;
    /**
     * blurs the element
     * @returns {JinjxElement}
     */
    blur(): JinjxElement;
    /**
     * sets the tab index of the element.
     * @param tabdex
     * @returns {JinjxElement}
     */
    tabdex(tabdex: number): JinjxElement;
}
export default JinjxElement;
