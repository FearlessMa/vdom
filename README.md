# 实现简易vDom

- [x] `h`方法 (只能接收三个参数)
- [x] `vnode`方法 (不能识别属性)
- [x] `patch`方法 (不是对比属性，支持子元素，文本)
- [x] 实现子元素的diff

```js
// h函数生成vnode
// h函数可以嵌套使用
h(sel,props,c)=>vnode

vnode:{
  // 子元素
  children:undefined,
  // dom 属性
  data:{},
  // 真实元素
  elm:undefined,
  // 选择器
  sel:'div',
  // key
  key:undefined
}
```


## snabbdom
```js
import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes
import { toVNode } from 'snabbdom/tovnode'

const patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
])

const newVNode = h('div', { style: { color: '#000' } }, [
  h('h1', 'Headline'),
  h('p', 'A paragraph'),
])

patch(toVNode(document.querySelector('.container')), newVNode)
```