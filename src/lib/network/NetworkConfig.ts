import Network from './Network';

export enum ActivationFunction {
	LINEAR = 'linear',
	SIGMOID = 'sigmoid',
	TANH = 'tanh',
	RELU = 'relu'
}

export function setupNetwork(
	networkContainer: HTMLElement,
	seed: number,
	layerDimensions: number[],
	bias: boolean = true
) {
	const networkConfig = new NetworkConfig(layerDimensions)
		.setSeed(seed)
		.setLearningRate(0.01)
		.setBiasEnabled(bias);
	return new Network(networkContainer, networkConfig);
}

export default class NetworkConfig {
	constructor(layerDimensions: number[], inputData?: number[][], outputData?: number[][]) {
		this.setLayerDimensions(layerDimensions);
		if (inputData) this.setInputData(inputData);
		if (outputData) this.setOutputData(outputData);
	}

	private seed: number | undefined;

	public setSeed(seed: number): NetworkConfig {
		this.seed = seed;
		return this;
	}

	public getSeed(): number | undefined {
		return this.seed;
	}

	// Layer Dimensions
	private layerDimensions: number[] = [];

	public setLayerDimensions(dimensions: number[]): NetworkConfig {
		if (!Array.isArray(dimensions) || dimensions.length < 2) {
			throw new Error('Layer dimensions must be an array with at least two elements.');
		}
		this.layerDimensions = dimensions;
		return this;
	}

	public getLayerDimensions(): number[] {
		return this.layerDimensions;
	}

	// Learning Rate
	private learningRate: number = 0.01;

	public setLearningRate(rate: number): NetworkConfig {
		if (rate <= 0 || rate > 1) {
			throw new Error('Learning rate must be between 0 and 1.');
		}
		this.learningRate = rate;
		return this;
	}

	public getLearningRate(): number {
		return this.learningRate;
	}

	// Animation Speed
	private animationSpeed: number = 500;

	public setAnimationSpeed(speed: number): NetworkConfig {
		if (speed < 0) {
			throw new Error('Animation speed cannot be negative.');
		}
		this.animationSpeed = speed;
		return this;
	}

	public getAnimationSpeed(): number {
		return this.animationSpeed;
	}

	// Bias
	private biasEnabled: boolean = false;

	public setBiasEnabled(enabled: boolean): NetworkConfig {
		this.biasEnabled = enabled;
		return this;
	}

	public isBiasEnabled(): boolean {
		return this.biasEnabled;
	}

	// Activation Function
	private activationFunction: ActivationFunction = ActivationFunction.LINEAR;

	public setActivationFunction(type: ActivationFunction): NetworkConfig {
		this.activationFunction = type;
		return this;
	}

	// Input and Output Data
	private inputData: number[][] = [];
	private outputData: number[][] = [];

	public setInputData(data: number[][]): NetworkConfig {
		if (!Array.isArray(data) || data.length === 0 || !data.every((arr) => Array.isArray(arr))) {
			throw new Error('Input data must be a non-empty array of arrays.');
		}
		this.inputData = data;
		return this;
	}

	public getInputData(): number[][] {
		return this.inputData;
	}

	public setOutputData(data: number[][]): NetworkConfig {
		if (!Array.isArray(data) || data.length === 0 || !data.every((arr) => Array.isArray(arr))) {
			throw new Error('Output data must be a non-empty array of arrays.');
		}
		this.outputData = data;
		return this;
	}

	public getOutputData(): number[][] {
		return this.outputData;
	}

	private testSet: number[][];

	setTestSet(testset: number[][]): NetworkConfig {
		this.testSet = testset;
		return this;
	}

	getTestSet() {
		return this.testSet;
	}
}
