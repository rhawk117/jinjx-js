


export class JinjxElementNotFound extends Error {
	constructor(selector: string) {
		super(`JinjxElementNotFound: Could not find element with selector "${selector}"`);
		this.name = "JinjxElementNotFoundError";
	}
}

