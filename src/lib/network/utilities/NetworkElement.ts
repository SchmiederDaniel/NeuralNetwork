export default abstract class NetworkElement {
    protected parent: HTMLElement;
    private children: NetworkElement[] = [];

    protected constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    abstract forward(lastOutputs: number[] | number): Promise<number | number[]>;

    abstract backward(lastErrors: number[] | number) : Promise<number | number[]>;

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