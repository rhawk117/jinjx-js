import { JinjxElementNotFound } from "./error";
import JinjxElement from "./jinjx-element";

class JinjxDOM {
	/**
	 * equivalent to document.addEventListener("DOMContentLoaded", callback)
	 * @param callback 
	 */
	static ready(callback: (e: Event) => void) {
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", callback);
		} else {
			callback(new Event("DOMContentLoaded"));
		}
	}

	/**
	 * equivalent to document.getElementById but returns a JinjxElement
	 * @param id the id of the element
	 * @returns {JinjxElement}
	 */
	static id(id: string): JinjxElement {
		const element = document.getElementById(id);
		if (!element) {
			throw new JinjxElementNotFound(`Element with id "${id}" not found.`);
		}
		return new JinjxElement(element);
	}

	/**
	 * equivalent to document.getElementsByClassName but returns JinjxElements
	 * @param className the class name of the elements
	 * @returns {JinjxElement[]}
	 */
	static classed(className: string): JinjxElement[] {
		const elements = document.getElementsByClassName(className);
		return Array.from(elements).map(
			(el) => new JinjxElement(el as HTMLElement)
		);
	}

	/**
	 * equivalent to document.getElementsByTagName but returns JinjxElements
	 * @param tagName 
	 * @returns {JinjxElement[]}
	 */
	static tags(tagName: string): JinjxElement[] {
		const elements = document.getElementsByTagName(tagName);
		return Array.from(elements).map(
			(el) => new JinjxElement(el as HTMLElement)
		);
	}

	/**
	 * returns all forms in the document as JinjxElements
	 * @returns {JinjxElement[]}
	 */
	static forms(): JinjxElement[] {
		const elements = document.forms;
		return Array.from(elements).map((el) => new JinjxElement(el));
	}

	static select(selector: string): JinjxElement {
		const el = document.querySelector(selector);
		if (!el) {
			throw new JinjxElementNotFound(selector);
		}
		return new JinjxElement(el as HTMLElement);
	}

	static all(selector: string): JinjxElement[] {
		const elements = document.querySelectorAll(selector);
		if (!elements) {
			throw new JinjxElementNotFound(selector);
		}
		return Array.from(elements).map(
			(el) => new JinjxElement(el as HTMLElement)
		);
	}

	/**
	 * creates a new JinjxElement from a tag name and returns it
	 * @param tagName The tag name of the element to create
	 * @returns
	 */
	static create(
		tagName: string,
		options?: ElementCreationOptions
	): JinjxElement {
		const element = document.createElement(tagName, options);
		return new JinjxElement(element);
	}

	/**
	 * emits a custom event with the given name and options
	 * @param eventName 
	 * @param options 
	 */
	static emit(eventName: string, options?: CustomEventInit): void {
		const event = new CustomEvent(eventName, options);
		document.dispatchEvent(event);
	}

	/**
	 * adds an event listener to the document and returns a function
	 * to remove the event listener
	 * @param eventName 
	 * @param eventHandler 
	 * @returns 
	 */
	static on(eventName: string, eventHandler: (e: Event) => void): VoidFunction {
		document.addEventListener(eventName, eventHandler);
		return () => document.removeEventListener(eventName, eventHandler);
	}
}

export default JinjxDOM;