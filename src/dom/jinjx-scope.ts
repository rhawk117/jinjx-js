import JinjxElement from "./jinjx-element";

class JinjxScope {
	private _effectStore: VoidFunction[] = [];
	constructor(private host: JinjxElement) {}

	/**
	 * delegates an event to a child that matches the selector 
	 * 
	 * @param eventName the name of the event to listen to
	 * @param selector the selector to match the element 
	 * @param eventHandler the function to call when the event is triggered
	 */
	public delegate(
		eventName: string,
		selector: string, 
		eventHandler: (e: Event, el: JinjxElement) => void
	): void {
		const computedHandler = (e: Event) => {
			const target = e.target as HTMLElement;
			if(target && target.matches(selector)) {
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
	public effect(effectFn: VoidFunction): void {
		this._effectStore.push(effectFn);
	}

	/**
	 * disposes the scope and all effects
	 */
	public dispose(): void {
		for (const effect of this._effectStore) {
			effect();
		}
		this._effectStore = [];
	}
	
	public enter(callback: (scope: JinjxElement) => void): void {
		callback(this.host);
	}
}

export default JinjxScope;