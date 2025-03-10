import JinjxElement from "./jinjx-element";
declare class JinjxScope {
    private host;
    private _effectStore;
    constructor(host: JinjxElement);
    /**
     * delegates an event to a child that matches the selector
     *
     * @param eventName the name of the event to listen to
     * @param selector the selector to match the element
     * @param eventHandler the function to call when the event is triggered
     */
    delegate(eventName: string, selector: string, eventHandler: (e: Event, el: JinjxElement) => void): void;
    /**
     * adds an "effect" to clean up when the scope is disposed
     * @param effectFn
     */
    effect(effectFn: VoidFunction): void;
    /**
     * disposes the scope and all effects
     */
    dispose(): void;
    enter(callback: (scope: JinjxElement) => void): void;
}
export default JinjxScope;
