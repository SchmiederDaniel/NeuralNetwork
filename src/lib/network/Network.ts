import "./Network.css"
import NetworkElement from "./utilities/NetworkElement";
import Layer from "./layer/Layer";
import NetworkConfig from "./NetworkConfig";
import {Random} from "./utilities/Random";

/**
 * Create a multidimensional array for the weights using the Random.ts implementation and a seed.
 * @param layerDimensions
 * @param seed
 * @returns {number[][][]} - The weights values
 */
function createWeights(layerDimensions: number[], seed: number): number[][][] {
    const weightValues: number[][][] = [];
    const random = new Random(seed);
    for (let layerIndex = 1; layerIndex < layerDimensions.length; layerIndex++) {
        const firstLayerCount = layerDimensions[layerIndex];
        const secondLayerCount = layerDimensions[layerIndex - 1];
        weightValues[layerIndex] = [];
        for (let nodeIndex = 0; nodeIndex < firstLayerCount; nodeIndex++) {
            weightValues[layerIndex][nodeIndex] = [];
            for (let k = 0; k < secondLayerCount; k++) {
                weightValues[layerIndex][nodeIndex][k] = random.randomFloat(-1, 1);
            }
        }
    }
    return weightValues;
}

export default class Network extends NetworkElement {
    private layerDimensions: number[];
    private labelContainer: HTMLDivElement;
    private self: HTMLElement;
    private layers: Layer[] = [];
    private y_pred: number[];
    private networkConfig: NetworkConfig;

    /**
     If the weights are manually created the first array has to be null to represent the input layer.
     For example: ```const weights = [null, [[2]]];```
     */
    constructor(parent: HTMLElement, networkConfig: NetworkConfig, weightValues: number[][][] | null) {
        super(parent);
        const layerDimensions = networkConfig.getLayerDimensions();
        this.networkConfig = networkConfig;
        this.layerDimensions = layerDimensions;

        if (!weightValues) {
            let seed = networkConfig.getSeed();
            if (!seed)
                seed = Math.random();
            weightValues = createWeights(this.layerDimensions, seed);
        }
        this.initializeLayers(weightValues)

        this.addResizeEvent();

        // When inserting nodes one after another, the positions will change, which is why resize event is needed.
        this.resize();
    }

    initializeLayers(weightValues: number[][][]): void {
        // Removing previous HTMLElements of layers from the network HTMLElement.
        if (this.layers) {
            for (const layer of this.layers) {
                layer.self.remove();
            }
        }
        this.layers = [];

        let lastLayer: Layer | undefined;
        for (let i = 0; i < this.layerDimensions.length; i++) {
            const layer = new Layer(this.self, this.networkConfig, this.layerTypeByIndex(i), this.layerDimensions[i], lastLayer, weightValues[i]);
            this.layers.push(layer);
            lastLayer = layer;
        }
    }

    setInputData(values: number[]) {
        const nodes = this.layers[0].getNodes();
        let biasOffset = 0;
        if (this.networkConfig.isBiasEnabled())
            biasOffset = 1; // The first node is the bias when the bias is enabled
        for (let i = 0; i < values.length; i++) {
            nodes[i + biasOffset].setValue(values[i]);
        }
    }

    public async forward(input: number[]): Promise<number[]> {
        let layerOutput = input.slice(); // Make a copy of the array
        if (this.networkConfig.isBiasEnabled()) {
            // The first bias value will have 1 as value
            layerOutput.unshift(1);
        }

        // run though all layers except the first one as it is only for input visualization
        for (let i = 1; i < this.layers.length; i++) {
            layerOutput = await this.layers[i].forward(layerOutput);
        }

        // saving the prediction for the backpropagation
        this.y_pred = layerOutput;
        return layerOutput;
    }

    async backward(y_true: number[]): Promise<number[]> {
        // calculating the error of the output layer using: (Mean Squared Error Gradient)
        let gradients: number[] = [];
        for (let i = 0; i < this.y_pred.length; i++) {
            gradients[i] = 2 * (this.y_pred[i] - y_true[i]); // MSE derivative: 2(y_pred - y_true)

            // let x = (this.y_pred[i] - y_true[i]);
            // gradients[i] = Math.tanh(x) + x * 2;
        }

        // backpropagate through all layers (from last to first)
        for (let i = this.layers.length - 1; i >= 1; i--) {
            gradients = await this.layers[i].backward(gradients);
        }

        return gradients;
    }

    layerTypeByIndex(index: number): string {
        if (index === 0) {
            return "input";
        } else if (index === this.layerDimensions.length - 1) {
            return "output";
        } else {
            return "hidden";
        }
    }

    addResizeEvent() {
        addEventListener("resize", this.resize.bind(this));
    }

    resize() {
        if (this.layers) {
            for (const layer of this.layers) {
                layer.resize();
            }
        }
    }

    onDestroy() {
        super.onDestroy();
        removeEventListener("resize", this.resize.bind(this));
        this.labelContainer.remove();
    }

    createElement(): void {
        this.labelContainer = document.createElement("div");
        this.labelContainer.classList.add("label-container");

        const label = document.createElement("div");
        label.classList.add("label");
        label.innerHTML = "Network";
        this.labelContainer.appendChild(label);

        this.self = document.createElement("div");
        this.self.classList.add("network");
        this.labelContainer.appendChild(this.self);
    }

    addToParent(parent: HTMLElement) {
        parent.appendChild(this.labelContainer);
    }
}