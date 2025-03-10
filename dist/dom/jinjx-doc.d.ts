import JinjxElement from "./jinjx-element";
declare class JinjxDOM {
    static ready(callback: (e: Event) => void): void;
    static id(id: string): JinjxElement;
    static classed(className: string): JinjxElement[];
    static tags(tagName: string): JinjxElement[];
    static forms(): JinjxElement[];
    static select(selector: string): JinjxElement;
    static all(selector: string): JinjxElement[];
    /**
     * creates a new JinjxElement from a tag name and returns it
     * @param tagName The tag name of the element to create
     * @returns
     */
    static create(tagName: string, options?: ElementCreationOptions): JinjxElement;
    /**
     * creates a VexdElement from a template literal and returns the
     * "top-level" element or container, if there are multiple only the
     * first one is returned as to ensure your templates are short as this
     * shouldn't be used for massive templates
     */
    static template(strings: TemplateStringsArray, ...values: any[]): JinjxElement;
    static emit(eventName: string, options?: CustomEventInit): void;
}
export default JinjxDOM;
