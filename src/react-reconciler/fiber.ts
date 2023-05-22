import { Props, Key, Ref, ReactElementType } from '@/shared/ReactTypes';
import { FunctionComponent, HostComponent, WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from '@/react-dom/hostConfig';
export class FiberNode {
    // 元素类型，函数式组件就是函数本身
	type: any;

    // 组件对象类型
	tag: WorkTag;

    // 组件初始props
	pendingProps: Props;
	key: Key;

    // 真实dom
	stateNode: any;
	ref: Ref;


	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

    // 更新后的props状态
	memoizedProps: Props | null;
    memoizedState: any;

    // 连体婴儿
	alternate: FiberNode | null;

    // 副作用标记
	flags: Flags;
	subtreeFlags: Flags;
	updateQueue: unknown;
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例
		this.tag = tag;
		this.key = key;
		// HostComponent <div> div DOM
		this.stateNode = null;
		// FunctionComponent () => {}
		this.type = null;

		// 构成树状结构
		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;

		this.ref = null;

		// 作为工作单元
		this.pendingProps = pendingProps;
		this.memoizedProps = null;
        this.memoizedState = null;
		this.updateQueue = null;

		this.alternate = null;

		// 副作用, 更新元素的标记
		this.flags = NoFlags;
		this.subtreeFlags = NoFlags;
	}
}


// current代表子元素的指针
// fiberRootNode (根节点) => hostRootFiber (rootDom) => App
export class FiberRootNode {
	container: Container;
	current: FiberNode;
	finishedWork: FiberNode | null;
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate;

	// 初始化，挂载阶段
	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.stateNode = current.stateNode;

		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
		wip.subtreeFlags = NoFlags;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;

	return wip;
};

export function createFiberFromElement(element: ReactElementType): FiberNode {
	const { type, key, props } = element;
	let fiberTag: WorkTag = FunctionComponent;

	if (typeof type === 'string') {
		// <div/> type: 'div'
		fiberTag = HostComponent;
	} else if (typeof type !== 'function') {
		console.warn('未定义的type类型', element);
	}
	const fiber = new FiberNode(fiberTag, props, key);
	fiber.type = type;
	return fiber;
}