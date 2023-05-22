// ReactDOM.createRoot(root).render(<App/>)

import {
	createContainer,
	updateContainer
} from '@/react-reconciler/fiberReconciler';
import { ReactElementType } from '@/shared/ReactTypes';
import { Container } from './hostConfig';

export function createRoot(container: Container) {
	const root = createContainer(container);
    console.log(333)
	return {
		render(element: ReactElementType) {
            debugger
			updateContainer(element, root);
		}
	};
}
