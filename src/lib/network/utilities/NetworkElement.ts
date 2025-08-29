export default abstract class NetworkElement {
    private parent: HTMLElement | null = null;
    private children: NetworkElement[] = [];

    protected constructor(parent: HTMLElement) {
        this.parent = parent;
        this.createElement();
        this.addToParent(parent);
    }

    abstract forward(lastOutputs: number[] | number): Promise<number | number[]>;

    abstract backward(lastErrors: number[] | number) : Promise<number | number[]>;

    /**
     * Creates a new HTML element for its visual representation.
     * The subclass handles the HTML element.
     */
    abstract createElement(): void;

    /**
     * Adds its HTML element to the parent element.
     * @param {HTMLElement} parent
     */
    abstract addToParent(parent: HTMLElement): void;

    protected addChild(child: NetworkElement) {
        this.children.push(child);
    }

    protected onDestroy() {
        for(const child of this.children) {
            child.onDestroy();
        }
    }

    public resize(): void {
        for(const child of this.children) {
            child.resize();
        }
    }

}