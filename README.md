# Neural Network implementation + Tutorial

This project consists of a javascript library made for
visualization of neural networks.

If you have any bugs or feature request feel free to create
an issue on github or make a pull request.

## Tutorial

The tutorial can be found here:
[Tutorial](https://schmiederdaniel.github.io/NeuralNetwork)

## Developing

### Neural Network Library

The library itself can be found under `src/lib/network`. The
library is written in TypeScript and can be added to your
project using the following code:

```javascript
import NetworkConfig from ".../network/NetworkConfig.js";

/* Your HTML Element in which the neural network should
  be added to */
let container;

const layerDimensions = [2, 3, 2]; // Can be changed.
const networkConfig = new NetworkConfig(layerDimensions)
	.setLearningRate(0.01)
	.setBiasEnabled(true);
let network = new Network(container, networkConfig);
```

To remove the network properly from its container use:

```javascript
network.onDestroy();
```

If you don't call the onDestroy function the network might
still have events registered in the background which can
cause unforeseen issues.

### Installing and running the development server

You can install the dependencies with

```
bun install
``` 

(or `npm install` or `yarn`).

To start a development server run:

```sh
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

## Building

To create a production version of your app run:

```sh
bun run build
```
