import JinjxElement from "./dom/jinjx-element";

type AttributeChangedCallback = (newValue: string, oldValue: string) => void;

type ReactivePropHooks = readonly [
	(changeCb: AttributeChangedCallback) => void,
	VoidFunction
];

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
function propState(propName: string, el: JinjxElement): ReactivePropHooks {
	let mutator: MutationObserver | null = null;
	let value: string = el.attr(propName) || "";

	const onChange = (changeCb: AttributeChangedCallback): void => {
		if (mutator) {
			mutator.disconnect();
			mutator = null;
		}

		mutator = new MutationObserver((mutations: MutationRecord[]) => {
			for (const mutation of mutations) {
				if (
					mutation.type !== "attributes" ||
					mutation.attributeName !== propName
				) {
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

	return [onChange, off] as ReactivePropHooks;
}

/**
 * begins an interval and returns a function to stop it
 * @param intervalCb
 * @param ms
 * @returns {VoidFunction}
 */
function interval(intervalCb: VoidFunction, ms: number): VoidFunction {
	let id: number | null = window.setInterval(() => {
		intervalCb();
	}, ms);
	return () => {
		if (!id) return;
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
function countdown(timeoutCb: VoidFunction, ms: number): VoidFunction {
	let id: number | null = window.setTimeout(() => {
		timeoutCb();
	}, ms);
	return () => {
		if (!id) return;
		window.clearTimeout(id);
		id = null;
	};
}

const resolveTemplateString = (
	strings: TemplateStringsArray,
	...values: any[]
): HTMLTemplateElement => {
	const rawHTML = strings.reduce((result, string, i) => {
		const value = i < values.length ? String(values[i] ?? "") : "";
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
function snippet(
	strings: TemplateStringsArray,
	...values: any[]
): JinjxElement {
	const template = resolveTemplateString(strings, ...values);
	const content = template.content;
	return new JinjxElement(content.firstChild as HTMLElement);
}

export { snippet, propState, interval, countdown };
