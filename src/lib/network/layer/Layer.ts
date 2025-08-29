import Node from './node/Node';
import "./Layer.css"
import NetworkElement from "../utilities/NetworkElement";
import NetworkConfig from "../NetworkConfig";
import Bias from "./node/Bias";

export default class Layer extends NetworkElement {
    private labelContainer: HTMLDivElement;
    public nodes: Node[] = [];
    public self: HTMLDivElement;
    private label: HTMLElement;

    constructor(
        network: HTMLElement, networkConfig: NetworkConfig, type: string = "hidden", nodeCount: number,
        lastLayer: Layer | undefined, weightValues: number[][]
    ) {
        super(network);
        this.label.innerHTML = type;
        this.self.classList.add(type);

        if(!weightValues) {
            weightValues = [];
        }

        if(networkConfig.isBiasEnabled()) {
            if(type !== "input") {
                for (let i = 0; i < weightValues.length; i++) {
                    weightValues[i].unshift(0.01); // Inserting 0.01 for the bias weight to prevent the dying ReLU problem
                }
            }
            if(type !== "output") {
                const bias = new Bias(this.self, networkConfig, lastLayer, type);
                this.nodes.push(bias);
            }
        }
        for (let i = 0; i < nodeCount; i++) {
            const node = new Node(this.self, networkConfig, lastLayer, weightValues[i], this.nodes.length, type);
            this.nodes.push(node);
            this.addChild(node);
        }
    }

    getNodes() {
        return this.nodes;
    }

    async forward(lastLayerOutput: number[]): Promise<number[]> {
        let nodeOutputs: number[] = [];
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const outputs = await node.forward(lastLayerOutput);
            nodeOutputs.push(outputs); // Forward the last output to each node
        }
        return nodeOutputs;
    }

    async backward(gradients: number[]): Promise<number[]> {
        const previousLayerErrors: number[] = [];

        // For every node of this layer
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const nodeErrors = await node.backward(gradients[i]);

            // collect the errors for the previous layer
            for (let j = 0; j < nodeErrors.length; j++) {
                if (!previousLayerErrors[j]) {
                    previousLayerErrors[j] = 0;
                }
                previousLayerErrors[j] += nodeErrors[j];
            }
        }

        return previousLayerErrors;
    }

    createElement() {
        this.self = document.createElement("div");
        this.self.classList.add("layer");

        this.labelContainer = document.createElement("div");
        this.labelContainer.classList.add("label-container");
        this.label = document.createElement("div");
        this.label.classList.add("label");
        this.labelContainer.appendChild(this.label);

        this.labelContainer.appendChild(this.self);
    }

    addToParent(parent: HTMLElement) {
        parent.appendChild(this.labelContainer);
    }
}