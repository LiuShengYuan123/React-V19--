// @ts-nocheck

import { jsx } from './react/jsx'
import { ReactElementType } from '@/shared/ReactTypes';
// const App = jsx("div", {
//     children: jsx("span", {
//       id: "xxx",
//       children: "ssss"
//     })
// })
import { useState } from '@/react';
function App() {
	const [num, setNum] = useState(3);
	window.setNum = setNum;
	return num === 3 ? <Child onClick={() => setNum(111)} /> : <div>{num}</div>;
}

function Child() {
	return <span>九剑react</span>;
}
import ReactDom from '@/react-dom'
const root: any = document.querySelector('#root')

debugger
ReactDom.createRoot(root).render(<App />)
