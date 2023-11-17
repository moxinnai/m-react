// ReactElement
// ReactElement 应该是跟宿主环境无关的包，所以它的类型定义应该是在shared包中
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';

import { Type, Key, Ref, Props, ReactElement, ElementType } from 'shared/ReactTypes';

// ReactElement 构造函数
const ReactElement = function name(type: Type, key: Key, ref: Ref, props: Props) {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'moxinnai'
	};
	return element;
};

// p1组件type，p2配置，结合babel看
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	// key 和 ref要注意，要单独处理，没传key应该是null
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	// 遍历config
	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			// 进入下一次循环
			continue;
		}

		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			// 进入下一次循环
			continue;
		}

		// 至于其他的prop就判断一下是不是自己的prop

		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}

		const maybeChildrenLength = maybeChildren.length;
		// props.children两种情况，一个单独child，child是一个reactelement，还有一个情况是数组，多个child
		if (maybeChildrenLength) {
			if (maybeChildrenLength === 1) {
				props.children = maybeChildren[0];
			} else {
				props.children = maybeChildren;
			}
		}
		// 返回一个新的reactElement
		return ReactElement(type, key, ref, props);
	}
};
// 生产环境和开发环境jsx是同样的实现
// react中dev和生产是不一样的，加了点东西
export const jsxDev = (type: ElementType, config: any) => {
	// key 和 ref要注意，要单独处理，没传key应该是null
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	// 遍历config
	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			// 进入下一次循环
			continue;
		}

		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			// 进入下一次循环
			continue;
		}

		// 至于其他的prop就判断一下是不是自己的prop

		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
		// 返回一个新的reactElement
		return ReactElement(type, key, ref, props);
	}
};
