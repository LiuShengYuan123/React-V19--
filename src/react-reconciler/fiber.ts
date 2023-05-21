import { Props, Key, Ref } from '@/shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlag';

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

    // 连体婴儿
	alternate: FiberNode | null;

    // 副作用标记
	flags: Flags;

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

		this.alternate = null;

		// 副作用, 更新元素的标记
		this.flags = NoFlags;
	}
}
