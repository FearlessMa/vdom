import h from './core/h';
import patch from './core/patch';
// import  './testSnabbdom'
// import { init } from "snabbdom/init";
// import { classModule } from "snabbdom/modules/class";
// import { propsModule } from "snabbdom/modules/props";
// import { styleModule } from "snabbdom/modules/style";
// import { eventListenersModule } from "snabbdom/modules/eventlisteners";

// const patch = init([
//   // Init patch function with chosen modules
//   classModule, // makes it easy to toggle classes
//   propsModule, // for setting properties on DOM elements
//   styleModule, // handles styling on elements with support for animations
//   eventListenersModule // attaches event listeners
// ]);
const vnode1 = h('ul', {}, [
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'b' }, 'B'),
  h('li', { key: 'c' }, 'C'),
  h('li', { key: 'd' }, 'D'),
  h('li', { key: 'e' }, h('div', {}, '1234'))
]);
const vnode2 = h('ul', {}, [
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'b' }, 'B'),
  h('li', { key: 'c' }, h('div', {}, '1234')),
  h('li', { key: 'd' }, 'D')
  // h('li', { key: 'e' }, h('div', {}, '1234'))
]);
const vnode3 = h('ul', {}, [
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'd' }, 'D'),
  h('li', { key: 'c' }, 'C'),
  h('li', { key: 'b' }, 'B')
  // h('li', { key: 'e' }, h('div', {}, '11234'))
]);
const vnode4 = h('ul', {}, [
  h('li', { key: 'b' }, 'B'),
  h('li', { key: 'c' }, 'C'),
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'd' }, 'D')
]);

// c a d b
const vnode5 = h('ul', {}, [
  h('li', { key: 'c' }, h('div', {}, '1234')),
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'd' }, 'D'),
  h('li', { key: 'b' }, 'B'),
]);

const vnodeDec = h('ul', {}, [
  h('li', { key: 'd' }, 'D'),
  h('li', { key: 'c' }, h('div', {}, '1234'))
  // h('li', { key: 'e' }, h('div', {}, '1234'))
]);
const dom = document.getElementById('container');
patch(dom, vnode2);
const btn = document.getElementById('btn');
btn.onclick = function () {
  // 不同节点
  // patch(vnode1, vnode2);
  // 相同节点 不同子节点
  // patch(vnode2, vnode3);
  // 相同节点，子节点都是children
  // 1，3情况
  // new a d c b
  // old a b c d
  // 打印 1，3
  // patch(vnode2, vnode3);
  // 4 情况
  // new a d c b
  // old b c a d
  // patch(vnode2, vnode4);

  // 测试在 nextElementSibling = null 下插入位置为最后插入
  // let elDiv = document.createElement('div');
  // elDiv.innerText = 'div';
  // let elLi = document.querySelectorAll('li')[3];
  // console.log('elLi.nextElementSibling: ', elLi.nextElementSibling); // null
  // elLi.parentElement.insertBefore(elDiv, elLi.nextElementSibling);

  // 删除节点
  // patch(vnode2,vnodeDec);

  //  5 情况 vnode5 全部为命中，指针未移动
  // old a b c d
  // new c a d b
  patch(vnode2, vnode5);
};
