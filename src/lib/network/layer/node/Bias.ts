import './Node.css';
import Layer from '../Layer';
import NetworkConfig from '../../NetworkConfig';
import Node from './Node';
import './Bias.css';

export default class Bias extends Node {
	constructor(
		parent: HTMLElement,
		networkConfig: NetworkConfig,
		lastLayer: Layer | undefined,
		type: string
	) {
		/**
		 * The weightValues will be null which prevents forward and backward passes.
		 */
		super(parent, networkConfig, lastLayer, null, 0, type);
		this.self.classList.add('bias');
		this.setValue(1);
	}

	/*
	 * When the bias is part of the first layer it is not called
	 */
	async forward(lastOutput: number[]): Promise<number> {
		return this.getValue();
	}
}
