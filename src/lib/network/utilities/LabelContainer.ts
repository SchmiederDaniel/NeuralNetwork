import Self from './Self';

function createContainer(originalParent: HTMLElement) {
	const container = document.createElement('div');
	container.classList.add('label-container');
	originalParent.appendChild(container);
	return container;
}

export default abstract class LabelContainer extends Self {
	container: HTMLElement;
	label: HTMLElement | undefined;

	protected constructor(parent: HTMLElement, labelText: string | null = null) {
		super(createContainer(parent));

		this.container = this.parent;

		if (labelText) {
			this.label = document.createElement('div');
			this.label.classList.add('label');
			this.label.innerHTML = labelText;
			this.container.prepend(this.label);
		}
	}
}
