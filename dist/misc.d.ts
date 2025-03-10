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
declare function propState(propName: string, el: JinjxElement): ReactivePropHooks;
/**
 * begins an interval and returns a function to stop it
 * @param intervalCb
 * @param ms
 * @returns {VoidFunction}
 */
declare function interval(intervalCb: VoidFunction, ms: number): VoidFunction;
/**
 * begins a timeout and returns a function to clear it
 * @param timeoutCb
 * @param ms
 * @returns {VoidFunction}
 */
declare function countdown(timeoutCb: VoidFunction, ms: number): VoidFunction;
/**
 * creates a JinjxElement from a template literal and returns the
 * "top-level" element or container, if there are multiple only the
 * first one is returned as to ensure your templates are short.
 * @param strings
 * @param values
 * @returns
 */
declare function snippet(strings: TemplateStringsArray, ...values: any[]): JinjxElement;
export { snippet, propState, interval, countdown };
