import "./Node.css"
import Layer from "../Layer";
import NetworkConfig from "../../NetworkConfig";
import Node from "./Node";
import "./Bias.css"

export default class Bias extends Node {
    constructor(
        parent: HTMLElement, networkConfig: NetworkConfig,
        lastLayer: Layer | undefined, type:string
    ) {
        /**
         * The weightValues will be null which prevents forward and backward passes.
         */
        super(parent, networkConfig, lastLayer, null, 0, type);
        this.self.innerHTML = "1";
        this.setValue(1);
    }

    createElement() {
        this.self = document.createElement("div");
        this.self.classList.add("node");
        this.self.classList.add("bias");
        this.self.innerHTML = "0";
    }

    /*
     * When the bias is part of the first layer it is not called
     */
    async forward(lastOutput: number[]): Promise<number> {
        return this.getValue();
    }
}
