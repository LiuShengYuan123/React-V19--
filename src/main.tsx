import { jsx } from './react/jsx'
// const App = jsx("div", {
//     children: jsx("span", {
//       id: "xxx",
//       children: "ssss"
//     })
// })

const App: any = function () {
    return (
        <h1>
            <h2>
                <h3>3333</h3>
            </h2>
        </h1>
    )
}


console.log(App)
import ReactDom from '@/react-dom'
const root: any = document.querySelector('#root')
console.log('ReactDom', ReactDom)
ReactDom.createRoot(root).render(App)
console.log(222) 