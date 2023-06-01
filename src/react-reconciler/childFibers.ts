import { REACT_ELEMENT_TYPE } from '@/shared/ReactSymbols';
import { ReactElementType } from '@/shared/ReactTypes';
import { createFiberFromElement, FiberNode } from './fiber';
import { Placement } from './fiberFlags';
import { HostText } from './workTags';

// 把element创建为子节点，通过return属性和父fiber挂钩
function ChildReconciler(shouldTrackEffects: boolean) {
    function reconcileSingleElement(
        returnFiber: FiberNode,
        currentFiber: FiberNode | null,
        element: ReactElementType
    ) {
        // 根据element创建fiber
        const fiber = createFiberFromElement(element);
        fiber.return = returnFiber;
        return fiber;
    }

    function reconcileSingleTextNode(
        returnFiber: FiberNode,
        currentFiber: FiberNode | null,
        content: string | number
    ) {
        const fiber = new FiberNode(HostText, { content }, null);
        fiber.return = returnFiber;
        return fiber;
    }

    function placeSingleChild(fiber: FiberNode) {

        // 如果老的节点没有，则标记为要更新
        if (shouldTrackEffects && fiber.alternate === null) {
            fiber.flags |= Placement;
        }
        return fiber;
    }

    // 父级fiber  子fiber childElement
    return function reconcileChildFibers(
        returnFiber: FiberNode,
        currentFiber: FiberNode | null,
        newChild?: ReactElementType
    ) {
        // 判断当前fiber的类型
        if (typeof newChild === 'object' && newChild !== null) {
            switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    return placeSingleChild(
                        // 用新element创建新fiber, reture执行父级fiber
                        // 返回父级节点
                        reconcileSingleElement(returnFiber, currentFiber, newChild)
                    );
                default:
                    console.warn('未实现的reconcile类型', newChild);
                    break;
            }
        }
        // TODO 多节点的情况 ul> li*3

        // HostText
        if (typeof newChild === 'string' || typeof newChild === 'number') {
            return placeSingleChild(
                reconcileSingleTextNode(returnFiber, currentFiber, newChild)
            );
        }


        console.warn('未实现的reconcile类型', newChild);

        return null;
    };
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
