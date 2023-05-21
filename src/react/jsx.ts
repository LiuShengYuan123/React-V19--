import { REACT_ELEMENT_TYPE } from '../shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElementType,
	ElementType
} from '../shared/ReactTypes';

// ReactElement

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'KaSong'
	};
	return element;
};

// 1. 元素类型  2. 属性  3.子元素
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

    // 遍历第二个参数对象中的属性
	for (const prop in config) {
		const val = config[prop];
        
        // 如果为key，赋值
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
        // 如果为ref， 赋值
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}

        // 给props赋值
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

    // 处理子元素
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}
	return ReactElement(type, key, ref, props);
};
