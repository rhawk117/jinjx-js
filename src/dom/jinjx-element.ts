/**
 * @file vexd-element.ts
 * @description A lightweight DOM utility class for chainable element manipulation, animations, and reactive signals.
 */

import { JinjxElementNotFound } from "./error";

class JinjxElement {
	private el: HTMLElement;

	/**
	 * creates an instance of JinjxElement.
	 * @param {HTMLElement | string} element - A DOM element or a CSS selector string.
	 * @throws Will throw an error if the element is not found.
	 */
	constructor(element: HTMLElement | string) {
		if (typeof element === "string") {
			const found = document.querySelector(element);
			if (!found) {
				throw new JinjxElementNotFound(element);
			}
			this.el = found as HTMLElement;
		} else {
			this.el = element;
		}
	}

	/**
	 * returns a new JinjxElement instance wrapping the first descendant matching the selector.
	 * @param {string} selector - CSS selector to search for.
	 * @returns {JinjxElement} A new JinjxElement instance.
	 * @throws Will throw an error if no element is found.
	 */
	select(selector: string): JinjxElement {
		const found = this.el.querySelector(selector);
		if (!found) {
			throw new JinjxElement(
				`VexJS: element not found for selector: ${selector}`
			);
		}
		return new JinjxElement(found as HTMLElement);
	}

	/**
	 * returns a new JinjxElement instance wrapping the first descendant matching the class name.
	 * @param className
	 * @returns
	 */
	classed(className: string) {
		return this.select(`.${className}`);
	}

	/**
	 * gets all descendants matching the class name.
	 * @param className
	 * @returns {JinjxElement[]}
	 */
	classes(className: string): JinjxElement[] {
		return this.all(`.${className}`);
	}

	/**
	 * returns a new JinjxElement instance wrapping the first descendant matching the id.
	 * @param elementId
	 * @returns {JinjxElement}
	 */
	id(elementId: string): JinjxElement {
		return this.select(`#${elementId}`);
	}

	/**
	 * Returns an array of JinjxElement instances for all descendants matching the selector.
	 * @param {string} selector - CSS selector to search for.
	 * @returns {JinjxElement[]} Array of JinjxElement instances.
	 */
	all(selector: string): JinjxElement[] {
		const nodeList = this.el.querySelectorAll(selector);
		return Array.from(nodeList).map(
			(el) => new JinjxElement(el as HTMLElement)
		);
	}

	/**
	 * Iterates over each descendant matching the selector, invoking the callback.
	 * @param {string} selector - CSS selector to search for.
	 * @param {(JinjxElement: JinjxElement, index: number) => void} callback - Function to call for each element.
	 */
	each(
		selector: string,
		callback: (JinjxElement: JinjxElement, index: number) => void
	): void {
		this.all(selector).forEach((JinjxElement, index) =>
			callback(JinjxElement, index)
		);
	}

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
	html(content?: string): string | JinjxElement {
		if (!content) {
			return this.el.innerHTML;
		}
		this.el.innerHTML = content;
		return this;
	}

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
	text(content?: string): string | JinjxElement {
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
	event(eventName: string, callback: (e: Event) => void): () => void {
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
	once(eventName: string, callback: (e: Event) => void): JinjxElement {
		this.el.addEventListener(eventName, callback, { once: true });
		return this;
	}

	/**
	 * Dispatches a custom event.
	 * @param {string} eventName - Custom event name.
	 * @param {{ [key: string]: any }} [details={}] - Event details.
	 * @returns {JinjxElement} The current JinjxElement instance.
	 */
	emit(eventName: string, details: { [key: string]: any } = {}): JinjxElement {
		const event = new CustomEvent(eventName, { detail: details });
		this.el.dispatchEvent(event);
		return this;
	}

	/**
	 * Adds a class to the element.
	 * @param {string} className - Class name to add.
	 * @returns {JinjxElement} The current JinjxElement instance.
	 */
	addClass(className: string): JinjxElement {
		this.el.classList.add(className);
		return this;
	}

	/**
	 * Removes a class from the element.
	 * @param {string} className - Class name to remove.
	 * @returns {JinjxElement} The current JinjxElement instance.
	 */
	removeClass(className: string): JinjxElement {
		this.el.classList.remove(className);
		return this;
	}

	/**
	 * Toggles a class on the element.
	 * @param {string} className - Class name to toggle.
	 * @returns {JinjxElement} The current JinjxElement instance.
	 */
	toggleClass(className: string): JinjxElement {
		this.el.classList.toggle(className);
		return this;
	}

	/**
	 * checks if the element has a specific class.
	 * @param {string} className - Class name to check.
	 * @returns {boolean} True if the element has the class.
	 */
	hasClass(className: string): boolean {
		return this.el.classList.contains(className);
	}

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
	attr(attribute: string, value?: string): string | JinjxElement {
		if (value === undefined) {
			return this.el.getAttribute(attribute) || "";
		} else {
			this.el.setAttribute(attribute, value);
			return this;
		}
	}

	/**
	 * checks if the element has a specific attribute.
	 * @param {string} attribute - Attribute name.
	 * @returns {boolean} True if the attribute exists.
	 */
	hasAttr(attribute: string): boolean {
		return this.el.hasAttribute(attribute);
	}

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
	data(attribute: string, value?: string): string | JinjxElement {
		if (value === undefined) {
			return this.el.dataset[attribute] || "";
		} else {
			this.el.dataset[attribute] = value;
			return this;
		}
	}

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
	style(property: string, value?: string): string | JinjxElement {
		if (value === undefined) {
			return this.el.style.getPropertyValue(property);
		} else {
			this.el.style.setProperty(property, value);
			return this;
		}
	}

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
	prop<T>(
		propertyName: keyof T,
		value?: T[keyof T]
	): T[keyof T] | JinjxElement {
		if (value === undefined) {
			return (this.el as any)[propertyName];
		} else {
			(this.el as any)[propertyName] = value;
			return this;
		}
	}

	/**
	 * returns the closest ancestor (or self) that matches the selector.
	 * @param {string} selector - CSS selector.
	 * @returns {JinjxElement | null} Closest matching JinjxElement instance or null.
	 */
	closest(selector: string): JinjxElement | null {
		const found = this.el.closest(selector);
		return found ? new JinjxElement(found as HTMLElement) : null;
	}

	/**
	 * returns the parent element as a JinjxElement instance.
	 * @returns {JinjxElement | null} The parent JinjxElement instance or null.
	 */
	parent(): JinjxElement | null {
		return this.el.parentElement
			? new JinjxElement(this.el.parentElement)
			: null;
	}

	/**
	 * returns an array of children as JinjxElement instances.
	 * @returns {JinjxElement[]} Array of child JinjxElement instances.
	 */
	children(): JinjxElement[] {
		return Array.from(this.el.children).map(
			(child) => new JinjxElement(child as HTMLElement)
		);
	}

	/**
	 * returns the underlying native HTMLElement.
	 * @returns {HTMLElement} The native DOM element.
	 */
	native(): HTMLElement {
		return this.el;
	}

	/**
	 * uses the MutationObserver API to observe changes to a specific attribute.
	 * @param {string} attribute - Attribute name to observe.
	 * @param {(oldValue: string | null, newValue: string | null) => void} callback - Callback when attribute changes.
	 * @returns {() => void} Function to disconnect the observer.
	 */
	observer(
		attribute: string,
		callback: (oldValue: string | null, newValue: string | null) => void
	): () => void {
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === attribute
				) {
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
	intersector(
		onScreen: (entry: IntersectionObserverEntry) => void,
		offScreen: (entry: IntersectionObserverEntry) => void,
		options?: IntersectionObserverInit
	): () => void {
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
	timedClass(className: string, duration: number | Promise<any>): JinjxElement {
		this.addClass(className);
		if (typeof duration === "number") {
			setTimeout(() => {
				this.removeClass(className);
			}, duration);
		} else if (duration && typeof duration.then === "function") {
			duration.then(() => this.removeClass(className));
		}
		return this;
	}

	/**
	 * equivalent to .appendChild
	 * @param el
	 * @returns {JinjxElement}
	 */
	add(el: HTMLElement | string | JinjxElement): JinjxElement {
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
	empty(): JinjxElement {
		this.el.innerHTML = "";
		return this;
	}

	/**
	 * adds the CSS declaration to the element's style.
	 * @param cssDeclaration
	 * @returns
	 */
	css(cssDeclaration: Partial<CSSStyleDeclaration>): JinjxElement {
		Object.assign(this.el.style, cssDeclaration);
		return this;
	}

	/**
	 * defines a mouseenter and mouseleave event.
	 * @param mouseEnter
	 * @param mouseLeave
	 * @returns {() => void} function to remove the event listeners.
	 */
	hover(
		mouseEnter: (e: Event) => void,
		mouseLeave: (e: Event) => void
	): VoidFunction {
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
	onClick(callback: (e: Event) => void): VoidFunction {
		this.el.addEventListener("click", callback);
		return () => this.el.removeEventListener("click", callback);
	}

	/**
	 * equivalent to addEventListener("change", callback)
	 * @param callback
	 * @returns {() => void} function to remove the event listener.
	 */
	onChange(callback: (e: Event) => void): VoidFunction {
		this.el.addEventListener("change", callback);
		return () => this.el.removeEventListener("change", callback);
	}

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
	value(value?: string): string | JinjxElement {
		if (value === undefined) {
			return (this.el as HTMLInputElement).value;
		}
		(this.el as HTMLInputElement).value = value;
		return this;
	}

	/**
	 * sets the element's disabled property.
	 * @param predicate
	 * @returns {JinjxElement}
	 */
	disable(predicate?: boolean): JinjxElement {
		this.prop("disabled", !!predicate);
		return this;
	}

	/**
	 * returns the element's aria attribute.
	 * @overload
	 * @param attribute
	 */
	aria(attribute: string): string;
	/**
	 * sets the element's aria attribute.
	 * (e.g aria("label", "my label")) -> aria-label="my label"
	 * @param attribute
	 * @param value
	 * @returns {JinjxElement}
	 */
	aria(attribute: string, value?: string): string | JinjxElement {
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
	rect(): DOMRect {
		return this.el.getBoundingClientRect();
	}

	/**
	 * returns the element's offset position.
	 * @returns {top: number, left: number}
	 */
	offset(): { top: number; left: number } {
		const { top, left } = this.rect();
		return { top, left };
	}

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
	remove(selector?: string) {
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
	visible(visible: boolean): JinjxElement {
		this.el.style.display = visible ? "" : "none";
		return this;
	}

	/**
	 * sets the element's opacity.
	 * @param {number} opacity - Opacity value between 0 and 1.
	 * @returns {JinjxElement}
	 */
	opacity(opacity: number): JinjxElement {
		this.el.style.opacity = opacity.toString();
		return this;
	}

	/**
	 * Focuses the element
	 * @returns {JinjxElement}
	 */
	focus(): JinjxElement {
		this.el.focus();
		return this;
	}

	/**
	 * blurs the element
	 * @returns {JinjxElement}
	 */
	blur(): JinjxElement {
		this.el.blur();
		return this;
	}

	/**
	 * sets the tab index of the element.
	 * @param tabdex
	 * @returns {JinjxElement}
	 */
	tabdex(tabdex: number): JinjxElement {
		this.el.tabIndex = tabdex;
		return this;
	}
}

export default JinjxElement;
