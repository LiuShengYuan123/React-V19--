import { Container } from '@/react-dom/hostConfig';
import { ReactElementType } from '@/shared/ReactTypes';
import { FiberNode, FiberRootNode } from './fiber';
import {
	createUpdate,
	createUpdateQueue,
	enqueueUpdate,
	UpdateQueue
} from './updateQueue';
import { scheduleUpdateOnFiber } from './workLoop';
import { HostRoot } from './workTags';

export function createContainer(container: Container) {
	// 凭空创建的， 是dom id=app的子节点
	const hostRootFiber = new FiberNode(HostRoot, {}, null);

	// container是dom id = app
	// 给容器和hostRootFiber之间建立关联关系
	const root = new FiberRootNode(container, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue();

	// 这是 fiberRootNode
	return root;
}

export function updateContainer(
	element: ReactElementType | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;

	// update对象就是接下来要更新的element对象
	const update = createUpdate<ReactElementType | null>(element);

	// 给update赋值
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
		update
	);
	
	scheduleUpdateOnFiber(hostRootFiber);
	return element;
}
