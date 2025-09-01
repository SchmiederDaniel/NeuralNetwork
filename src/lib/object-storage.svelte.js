import { getContext, setContext } from 'svelte';

const key = Symbol('layout-slots');

/* From:
   https://stackoverflow.com/questions/79344551/other-than-children-can-i-import-and-render-multiple-snippets-in-layout-svel/79351277#79351277
   https://www.sveltelab.dev/0geo0t2fzno1hn3
*/

/** Gives back a reference object which the child routes/pages can use to define objects and functions of.
 * @returns {Object<?>}
 */
export function getObjectReference() {
	const context = $state({});
	return setContext(key, context);
}

/** Saves an object which can be used to render data on the parent.
 * @param context
 */
export function setObject(context) {
	Object.assign(getContext(key), context);
}
