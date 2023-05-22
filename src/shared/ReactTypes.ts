export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;
export type ElementType = any;
export type Action<State> = State | ((prevState: State) => State);

export interface ReactElementType {
    // 元素类型
	$$typeof: symbol | number;

	type: ElementType;
    // for循环中的key，不加默认用index代替
	key: Key;

    // 组件的props
	props: Props;

    // 组件ref
	ref: Ref;

    // 我们自己的特殊标记
	__mark: string;
}
