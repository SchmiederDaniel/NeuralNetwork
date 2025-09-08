import gsap from 'gsap';
import Flip from 'gsap/Flip';

function initialize() {
	gsap.registerPlugin(Flip);
}

/**
 * Creates an animation where a "position: absolute" HTML element gets cloned and flies to a target position.
 * @param element {HTMLElement}
 * @param destinationContainer {HTMLElement}
 * @param duration {number=}
 */
export function cloneFloatAnimation(
	element: HTMLElement,
	destinationContainer: HTMLElement,
	duration = 1.5
) {
	initialize();

	const state = Flip.getState(element);
	const clone: HTMLElement = element.cloneNode(true) as HTMLElement;
	const originalStyle = getComputedStyle(element);
	const destinationStyle = getComputedStyle(destinationContainer);
	destinationContainer.prepend(clone);

	gsap.set(clone, {
		yPercent: 0,
		xPercent: 0,
		left: '0%',
		top: '0%',
		position: 'relative',
		zIndex: 100,
		transform: '',
		fontSize: originalStyle.fontSize
	});

	gsap.fromTo(
		clone,
		{
			fontSize: originalStyle.fontSize
		},
		{
			duration: duration,
			ease: 'power1.inOut',
			fontSize: destinationStyle.fontSize
		}
	);

	Flip.from(state, {
		duration: duration,
		ease: 'power1.inOut',
		absolute: true,
		targets: clone,
		onComplete: () => {
			// Optional: remove the temporary absolute class after animation
			clone.style.transform = '';
			clone.style.zIndex = '';
			clone.style.position = '';
			clone.style.rotate = '';
			clone.style.left = '';
			clone.style.top = '';
		}
	});
}

/**
 * Highlights a html element.
 * @param element {HTMLElement | string} The element to animate or the selector for querySelector.
 * @param radius {number | undefined} Defines how far the outline animation goes.
 * @returns {(Function())|*} Callback function which can be called to stop the effect.
 */
export function highlightElement(element: HTMLElement | string, radius: number = 7): Function {
	let animatable: HTMLElement | NodeListOf<HTMLElement>;
	if (typeof element === 'string') {
		animatable = document.querySelectorAll(element) as NodeListOf<HTMLElement>;
	} else {
		animatable = element;
	}

	const context = gsap.context(() => {
		gsap.set(animatable, {
			outlineStyle: 'solid'
		});
		gsap
			.timeline({ repeat: -1 })
			.to(animatable, {
				duration: 0.2,
				outlineColor: 'rgba(0,130,200,0.7)',
				ease: 'power1.out'
			})
			.to(animatable, {
				duration: 1.4,
				outlineWidth: `${radius}px`,
				outlineOffset: `${radius * 0.3}px`,
				outlineColor: 'rgba(0,130,200,0)',
				ease: 'power1.out'
			})
			.to(animatable, {
				duration: 0.8,
				outlineColor: 'rgba(100,100,100,0)',
				ease: 'none'
			});
	}, animatable);
	return () => {
		context.revert();
	};
}

/**
 * Creates an animation where an HTML element is being faded out
 * and can be made visible again by calling the callback function.
 * @param element {HTMLElement | string} The element to animate or the selector for querySelector.
 * @param opacity {number=} The opacity which it fades to.
 * @param duration {number=} The time the animation takes.
 * @returns {(function(): void)|*} Callback function which can be called to stop the effect.
 */
export function hideElement(
	element: HTMLElement | string,
	opacity: number = 0.25,
	duration: number = 1
) {
	let animatable: HTMLElement | NodeListOf<HTMLElement>;
	if (typeof element === 'string') {
		animatable = document.querySelectorAll(element) as NodeListOf<HTMLElement>;
	} else {
		animatable = element;
	}

	const context = gsap.context(() => {
		gsap.to(animatable, {
			opacity: opacity,
			duration: duration
		});
	}, animatable);
	return () => {
		context.revert();
	};
}
