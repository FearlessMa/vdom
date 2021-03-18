import h from './core/h';
import patch from './core/patch';
const dom = document.getElementById('container');
const btnGroup = document.getElementById('btnGroup');
// patch(dom, vnode2);
// const btn = document.getElementById('btn');
// btn.onclick = function () {
//   // 不同节点
//   // patch(vnode1, vnode2);
//   // 相同节点 不同子节点
//   // patch(vnode2, vnode3);
//   // 相同节点，子节点都是children
//   // 1，3情况
//   // new a d c b
//   // old a b c d
//   // 打印 1，3
//   // patch(vnode2, vnode3);
//   // 4 情况
//   // new a d c b
//   // old b c a d
//   // patch(vnode2, vnode4);
//   // 测试在 nextElementSibling = null 下插入位置为最后插入
//   // let elDiv = document.createElement('div');
//   // elDiv.innerText = 'div';
//   // let elLi = document.querySelectorAll('li')[3];
//   // console.log('elLi.nextElementSibling: ', elLi.nextElementSibling); // null
//   // elLi.parentElement.insertBefore(elDiv, elLi.nextElementSibling);
//   // 删除节点
//   // patch(vnode2,vnodeDec);
//   // 增加节点
//   // patch(vnode2,vnodeInc)
//   //  5 情况 vnode5 全部为命中，指针未移动
//   // old a b c d
//   // new c a d b
//   // patch(vnode2, vnode5);
// };
function createBtn(fn, name) {
  const btn = document.createElement('button');
  btn.onclick = fn;
  btn.innerText = name || fn.name;
  btnGroup.appendChild(btn);
}

const vNode = h('ul', {}, [
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'b' }, 'B'),
  h('li', { key: 'c' }, 'C'),
  h('li', { key: 'd' }, 'D')
]);
const vNode1 = h('ul', {}, [
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'b' }, 'B'),
  h('li', { key: 'c' }, 'C'),
  h('li', { key: 'd' }, 'D'),
  h('li', { key: 'e' }, 'E')
]);
const vNode2 = h('ul', {}, [
  h('li', { key: 'e' }, 'E'),
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'b' }, 'B'),
  h('li', { key: 'c' }, 'C'),
  h('li', { key: 'd' }, 'D'),
]);
const vNode3 = h('ul', {}, [
  h('li', { key: 'b' }, 'B'),
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'd' }, 'D'),
  h('li', { key: 'c' }, 'C'),
]);
const vNodeChildText = h('ul', {}, '新旧节点相同: 子元素 old children , new tex');


const vNodeText = h('span', {}, '新旧节点不同old children ，new  text ');

// 挂载虚拟节点
patch(dom, vNode);
// 1-1 初始化：新旧节点不同old children ，new  text
createBtn(function init() {
  location.reload();
}, '1-1 初始化：新旧节点不同old text ，new  children ');

// 1-2 新旧节点不同 old children， new text
function diff12() {
  patch(vNode, vNodeText);
}
createBtn(diff12, '1-2 新旧节点不同:old children ，new  text');

// 2-1 新旧节点相同 子元素 old children , new text
function diff21() {
  patch(vNode, vNodeChildText);
}
createBtn(diff21, '2-1 新旧节点相同: 子元素 old children , new text');


// 2-2 新旧节点相同 子元素 old text , new children
function diff22() {
  patch(vNodeChildText, vNode);
}
createBtn(diff22, '2-2  新旧节点相同: 子元素 old text , new children');

// 3-1 新旧节点相同 子元素 old children , new children 尾新增了元素
function diff31() {
  patch(vNode,vNode1 );
}
createBtn(diff31, ' 3-1 新旧节点相同 子元素 old children , new children 尾新增了元素');
// 3-2 新旧节点相同 子元素 old children , new children 尾删除了元素
function diff32() {
  console.log('=======需要先执行一次3-1========')
  patch(vNode1,vNode );
}
createBtn(diff32, ' 3-2 新旧节点相同 子元素 old children , new children 尾删除了元素');
// 3-3 新旧节点相同 子元素 old children , new children 首增加了元素
function diff33() {
  patch(vNode,vNode2 );
}
createBtn(diff33, ' 3-3 新旧节点相同 子元素 old children , new children 首增加了元素');
// 3-4 新旧节点相同 子元素 old children , new children 首删除了元素
function diff34() {
  console.log('=======需要先执行一次3-3========')
  patch(vNode2,vNode );
}
createBtn(diff34, ' 3-4 新旧节点相同 子元素 old children , new children 首删除了元素');

// 3-5 新旧节点相同 子元素 old children , new children 顺序错乱badc
function diff35() {
  patch(vNode, vNode3);
}
createBtn(diff35, ' 3-5 新旧节点相同 子元素 old children , new children 顺序错乱badc');
// 3-6 新旧节点相同 子元素 old children , new children 顺序错乱abcd
function diff36() {
  console.log('=======需要先执行一次3-5========')

  patch( vNode3,vNode);
}
createBtn(diff36, ' 3-6 新旧节点相同 子元素 old children , new children 顺序错乱abcd');