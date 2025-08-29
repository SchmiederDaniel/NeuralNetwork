import NetworkElement from "../../../utilities/NetworkElement";
import NetworkConfig from "../../../NetworkConfig";
import NumberFormatter from "../../../utilities/NumberFormatter";
import sleep from "../../../utilities/Sleep";
import "./Weights.css"

/**
 * Calculates the offset (distance and angle) from one HTML element to another.
 * This is the core function you requested.
 * @param {HTMLElement} first - The starting element.
 * @param {HTMLElement} second - The ending element.
 */
function calculateOffset(first: HTMLElement, second: HTMLElement): {length: number; angle: number } {
    // Get the center point of each element
    const rect1 = first.getBoundingClientRect();
    const rect2 = second.getBoundingClientRect();

    const center1 = {
        x: rect1.left + rect1.width / 2,
        y: rect1.top + rect1.height / 2
    };

    const center2 = {
        x: rect2.left + rect2.width / 2,
        y: rect2.top + rect2.height / 2
    };

    // Calculate the difference in coordinates
    const dx = center2.x - center1.x;
    const dy = center2.y - center1.y;

    // Calculate the length of the line using Pythagorean theorem
    const length = Math.sqrt(dx * dx + dy * dy);

    // Calculate the angle using arctangent
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const yOffset = rect1.top;

    return { length, angle};
}

/**
 * Connects two HTML elements with a line and adds text along the line.
 * @param {HTMLElement} from - The first HTML element.
 * @param {HTMLElement} to - The second HTML element.
 * @param {HTMLElement} container - The container to draw the line in.
 * @param nodeIndex
 * @returns { line: HTMLDivElement; text: HTMLDivElement } - The line and lineText variable which is being created.
 */
function createLine(from: HTMLElement, to: HTMLElement, container: HTMLElement | null, nodeIndex: number): {
    line: HTMLDivElement;
    text: HTMLDivElement
} {
    const line = document.createElement('div');
    line.className = 'line';

    const text = document.createElement('div');
    text.className = 'line-text';

    adjustPosition(line, text, from, to, nodeIndex);

    if (container) {
        container.appendChild(line);
        line.appendChild(text);
    }

    return {line, text};
}

/**
 * Recalculates and moves the weight line.
 * It can be used to make the weights reactive for page resizes.
 * @param {HTMLElement} line
 * @param {HTMLElement} text
 * @param {HTMLElement} from
 * @param {HTMLElement} to
 * @param nodeIndex The Node index which this weight is connected to. Used for text offsets.
 */
function adjustPosition(line: HTMLElement, text: HTMLDivElement, from: HTMLElement, to: HTMLElement, nodeIndex: number): void {
    // Get the center coordinates of the elements

    // const rect1 = from.getBoundingClientRect();
    // const rect2 = to.getBoundingClientRect();
    //
    // const x1 = rect1.left + rect1.width / 2;
    // const y1 = rect1.top + rect1.height / 2;
    // const x2 = rect2.left + rect2.width / 2;
    // const y2 = rect2.top + rect2.height / 2;
    //
    // // Calculate distance and angle between the two points
    // const deltaX = x2 - x1;
    // const deltaY = y2 - y1;
    // const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    // const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    //
    // line.style.left = `${x1}px`;
    // line.style.top = `${y1}px`;
    // line.style.width = `${length}px`;
    // line.style.transform = `rotate(${angle}deg)`;


    const { length, angle} = calculateOffset(from, to);
    line.style.top = `${from.offsetTop + from.offsetHeight / 2}px`;
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`

    const textXOffset = 22 * (nodeIndex % 2 === 0 ? -1 : 1);
    text.style.transform = `translate(${textXOffset}px, -1.5em)`;
}

export default class Weight extends NetworkElement {
    private weight: number;
    private readonly from: HTMLElement;
    private readonly to: HTMLElement;
    private readonly nodeIndex: number;
    private networkConfig: NetworkConfig;
    public readonly line: HTMLDivElement;
    private readonly text: HTMLDivElement;

    constructor(networkConfig: NetworkConfig, from: HTMLElement, to: HTMLElement, value: number, nodeIndex: number) {
        super(from);
        this.nodeIndex = nodeIndex;
        this.from = from;
        this.to = to;
        this.networkConfig = networkConfig;
        this.weight = value;

        const {line, text} = createLine(from, to, from.parentElement, nodeIndex);
        this.line = line;
        this.text = text;

        // rotateLineAndText(from, to, line, text, nodeIndex);
        this.setValue(value)
    }

    setValue(value: number): void {
        this.weight = value;
        this.text.textContent = NumberFormatter.formatMost2(this.weight); // Display the weight value
    }

    /**
     * Calculates the output of this weight based on the last output from the previous node.
     * @param lastOutput The input value from the node before this weight.
     * @return {number} Input x weight
     */
    async forward(lastOutput: number): Promise<number> {
        try {
            return lastOutput * this.weight;
        } finally {
            await sleep.sleep();
        }
    }

    async backward(gradient: number): Promise<number> {
        return this.weight * gradient;
    }

    resize() {
        super.resize();
        // rotateLineAndText(this.from, this.to, this.line, this.text, this.nodeIndex)
        adjustPosition(this.line, this.text, this.from, this.to, this.nodeIndex);
    }

    adjustWeight(gradient: number): void {
        const learningRate = this.networkConfig.getLearningRate();
        this.setValue(this.weight - gradient * learningRate);
    }

    /**
     * The weight does not have its own HTML element but instead uses the SVG
     * elements because drawing lines and text is more suitable for SVG.
     */
    createElement(): void {
    }

    /**
     * The weight does not have its own HTML element but instead uses the SVG elements.
     */
    addToParent(_parent: HTMLElement): void {
    }

    mathString(): string {
        return "weight += node_input * gradient * learningrate";
    }

    getValue() {
        return this.weight;
    }

    protected onDestroy() {
        super.onDestroy();
        this.line.remove();
        this.text.remove();
    }
}