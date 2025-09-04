import './Node.css';
import Layer from '../Layer';
import Weights from './weight/Weights';
import sleep from '../../utilities/Sleep';
import NetworkConfig from '../../NetworkConfig';
import NumberFormatter from '../../utilities/NumberFormatter';
import Self from '../../utilities/Self';

export default class Node extends Self {
	private value: number;
	public weights: Weights[] = [];
	private networkConfig: NetworkConfig;
	private X: number[];
	private layerType: string; // The layer type e.g. (output, input, hidden)
	private z: number;
	private text: HTMLElement = document.createElement('div');

	/**
	 * weightValues can be null for Bias as Bias doesn't connect to nodes before.
	 */
	constructor(
		parent: HTMLElement,
		networkConfig: NetworkConfig,
		lastLayer: Layer | undefined,
		weightValues: number[] | null,
		nodeIndex: number,
		layerType: string
	) {
		super(parent);
		this.self.classList.add('node');
		this.self.classList.add(layerType);
		this.text.classList.add('node-text');
		this.self.appendChild(this.text);
		this.networkConfig = networkConfig;
		this.layerType = layerType;

		if (weightValues) {
			this.connectLayer(lastLayer, weightValues, nodeIndex);
		}
	}

	setValue(value: number) {
		this.value = value;
		if (!this.text) return;
		this.text.innerHTML = NumberFormatter.formatMost2(value);
	}

	async forward(X: number[]): Promise<number> {
		// console.log(this)
		this.X = X;

		let sum = 0;
		// calculate the weighted sum of all the inputs of the previous layer
		for (let i = 0; i < this.weights.length; i++) {
			// console.log(lastOutput[i]);
			const weightOutput = await this.weights[i].forward(X[i]);
			sum += weightOutput;
			await sleep.sleep();
		}

		// use the activation function
		const output = this.activationFunction(sum);
		this.setValue(output);
		this.z = output; // Save the output for the backward pass
		return output;
	}

	async backward(gradient: number): Promise<number[]> {
		const propagating_error: number[] = [];
		for (let weightIndex = 0; weightIndex < this.weights.length; weightIndex++) {
			const weight = this.weights[weightIndex];

			const grad_z = gradient * this.derivativeActivationFunction(this.z);
			const dW = this.X[weightIndex] * grad_z;
			propagating_error.push(grad_z * weight.getValue());
			weight.adjustWeight(dW);
		}
		return propagating_error;
	}

	activationFunction(value: number): number {
		if (this.layerType === 'output') {
			return value; // Use absolute error for output layer
		} else {
			return Math.max(value, 0.01 * value); // Leaky ReLU
		}

		// const t = Math.tanh(value);
		// return 1 - t * t;
		//
		// return value;
	}

	derivativeActivationFunction(value: number): number {
		if (this.layerType === 'output') {
			// Use absolute error for output layer
			return 1;
		} else {
			// return value > 0 ? 1 : 0; // ReLU Derivative
			return value > 0 ? 1 : 0.01; // Leaky Relu Derivative
		}

		// return 1;
	}

	/**
	 * Function is being called after creation of the network so that the weights can be connected to the next layer.
	 * @param lastLayer
	 * @param {number[]} weightValues
	 * @param {number} nodeIndex Gives the index of the node for text offsets
	 */
	connectLayer(lastLayer: Layer, weightValues: number[], nodeIndex: number) {
		const lastNodes = lastLayer.getNodes();
		for (let i = 0; i < lastNodes.length; i++) {
			const lastNode = lastNodes[i];
			const weight = new Weights(
				this.networkConfig,
				lastNode.self,
				this.self,
				weightValues[i],
				nodeIndex
			);
			this.weights.push(weight);
			this.addChild(weight);
		}
	}

	getWeights() {
		return this.weights;
	}

	getValue() {
		return this.value;
	}
}
