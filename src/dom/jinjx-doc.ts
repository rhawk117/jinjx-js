import { JinjxElementNotFound } from "./error";
import JinjxElement from "./jinjx-element";

class JinjxDOM {
	static ready(callback: (e: Event) => void) {
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", callback);
		} else {
			callback(new Event("DOMContentLoaded"));
		}
	}

	static id(id: string): JinjxElement {
		const element = document.getElementById(id);
		if (!element) {
			throw new JinjxElementNotFound(`Element with id "${id}" not found.`);
		}
		return new JinjxElement(element);
	}

	static classed(className: string): JinjxElement[] {
		const elements = document.getElementsByClassName(className);
		return Array.from(elements).map(
			(el) => new JinjxElement(el as HTMLElement)
		);
	}

	static tags(tagName: string): JinjxElement[] {
		const elements = document.getElementsByTagName(tagName);
		return Array.from(elements).map(
			(el) => new JinjxElement(el as HTMLElement)
		);
	}

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
	 * creates a VexdElement from a template literal and returns the
	 * "top-level" element or container, if there are multiple only the
	 * first one is returned as to ensure your templates are short as this
	 * shouldn't be used for massive templates
	 */
	static template(
		strings: TemplateStringsArray,
		...values: any[]
	): JinjxElement {
		const rawHTML = strings.reduce((result, string, i) => {
			const value = i < values.length ? String(values[i] ?? "") : "";
			return result + string + value;
		}, "");

		const template = document.createElement("template");
		template.innerHTML = rawHTML.trim();

		const content = template.content;
		return new JinjxElement(content.firstChild as HTMLElement);
	}

	static emit(eventName: string, options?: CustomEventInit): void {
		const event = new CustomEvent(eventName, options);
		document.dispatchEvent(event);
	}
}

export default JinjxDOM;