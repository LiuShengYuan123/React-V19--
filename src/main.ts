import { jsx } from './react/jsx'
const res = jsx("div", {
    children: jsx("span", {
      id: "xxx",
      children: "ssss"
    })
})

console.log(res)