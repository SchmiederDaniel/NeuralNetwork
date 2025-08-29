/**
 * AI generated simple hash function to help generating random seeds for the LCG Random below.
 * It should not be used for anything cryptography related.
 * The simpleHash function works also with floating point values as input which is required when using "Math.random()"
 * as input
 * @param value {number} - A floating point or integer value to be hashed.
 * @returns {number} - A integer hash based on the input value.
 */
function simpleHash(value: number): number {
    value = Math.sin(value * 3585601) * 43542668;
    const buffer = new ArrayBuffer(8); // 64-bit
    const floatView = new Float64Array(buffer);
    const intView = new Uint32Array(buffer);

    floatView[0] = value;

    // Mix the high and low 32 bits
    let hash = intView[0] ^ intView[1];
    hash = (hash * 0x45d9f3b) ^ (hash >>> 16); // mix bits
    return hash >>> 0; // force unsigned
}

/**
 * Implementation of the "Linear Congruential Generator" algorithm.
 */
export class Random {
    private seed: number;
    private readonly a: number;
    private readonly c: number;
    private readonly m: number;

    constructor(seed = Date.now()) {
        this.seed = simpleHash(seed);
        this.a = 1664525; // Good multiplier for 32-bit systems
        this.c = 1013904223; // Good increment for 32-bit systems
        this.m = 2 ** 32;
    }

    private nextInt() {
        this.seed = (this.a * this.seed + this.c) % this.m;
        return this.seed;
    }

    public randomInt(min: number, max: number) {
        const range = max - min + 1;
        return Math.floor(this.nextInt() / (this.m / range)) + min;
    }

    public randomFloat(min: number, max: number) {
        return this.nextInt() / this.m * (max - min) + min;
    }
}