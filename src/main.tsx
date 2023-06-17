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
	// const [num, setNum] = useState(100);
	const [arr, setArr] = useState(['one', 'two', 'three'])


	function handle_click() {
		debugger
		setArr([ 'two', 'three','one'])
	}

	// a => a
	return (
		<div >
			<h1 onClick={handle_click}>点我改变数组</h1>
			<ul>
				{
					arr.map((item) => {
						return <li key={item}>{item}</li>
					})
				}
			</ul>
		</div>
	);	
}


import ReactDom from '@/react-dom'
const root: any = document.querySelector('#root')

// debugger
ReactDom.createRoot(root).render(<App />)
