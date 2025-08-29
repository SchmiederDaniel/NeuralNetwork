import {Promise as promise} from 'es6-promise';

let enabled = false;
let waiting = true;
const pollInterval: number = 100;
let stepCallback = null;

export default {
    enable(): void {
        enabled = true;
        waiting = true;
        stepCallback = null;
    },
    disable(): void {
        enabled = false;
    },
    /**
     * This function is called to indicate that the next step in the process can be executed.
     * @param callback The callback function gets called when the next step is frozen.
     */
    nextStep(callback = null): void {
        waiting = false;
        stepCallback = callback;
    },
    sleep(): Promise<void> {
        return new Promise((resolve) => {
            if (!enabled) {
                stepCallback = null;
                resolve();
                return;
            }
            if (stepCallback)
                stepCallback();
            stepCallback = null;

            const checkCondition = () => {
                if (!waiting && enabled) {
                    waiting = true; // Reset for next use
                    resolve();
                } else {
                    setTimeout(checkCondition, pollInterval);
                }
            };
            checkCondition();
        });
    }
}
