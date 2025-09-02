import NetworkElement from '../utilities/NetworkElement';

export default abstract class Self extends NetworkElement {
	self: HTMLElement = document.createElement('div');

	protected constructor(parent: HTMLElement) {
		super(parent);
		parent.appendChild(this.self);
	}
}
