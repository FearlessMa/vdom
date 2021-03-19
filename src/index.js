import h from './core/h';
import patch from './core/patch';
const dom = document.getElementById('container');
const btnGroup = document.getElementById('btnGroup');
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
  h('li', { key: 'd' }, 'D')
]);
const vNode3 = h('ul', {}, [
  h('li', { key: 'b' }, 'B'),
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'd' }, 'D'),
  h('li', { key: 'c' }, 'C')
]);

const vNode4 = h('ul', {}, [
  h('li', { key: 'e' }, 'E'),
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'b' }, 'B'),
  h('li', { key: 'c' }, 'C'),
  h('li', { key: 'd' }, 'D'),
  h('li', { key: 'f' }, 'F')
]);
const vNodeChildText = h(
  'ul',
  {},
  '新旧节点相同: 子元素 old children , new tex'
);

const vNodeText = h('span', {}, '1-2 新旧节点不同:old children ，new  text');

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
createBtn(diff21, '需要初始化：2-1 新旧节点相同: 子元素 old children , new text');

// 2-2 新旧节点相同 子元素 old text , new children
function diff22() {
  patch(vNodeChildText, vNode);
}
createBtn(diff22, '2-2  新旧节点相同: 子元素 old text , new children');

// 3-1 新旧节点相同 子元素 old children , new children 尾新增了元素
function diff31() {
  patch(vNode, vNode1);
}
createBtn(
  diff31,
  ' 3-1 新旧节点相同 子元素 old children , new children 尾新增了元素'
);
// 3-2 新旧节点相同 子元素 old children , new children 尾删除了元素
function diff32() {
  console.log('=======需要先执行一次3-1========');
  patch(vNode1, vNode);
}
createBtn(
  diff32,
  ' 3-2 新旧节点相同 子元素 old children , new children 尾删除了元素'
);
// 3-3 新旧节点相同 子元素 old children , new children 首增加了元素
function diff33() {
  patch(vNode, vNode2);
}
createBtn(
  diff33,
  ' 3-3 新旧节点相同 子元素 old children , new children 首增加了元素'
);
// 3-4 新旧节点相同 子元素 old children , new children 首删除了元素
function diff34() {
  console.log('=======需要先执行一次3-3========');
  patch(vNode2, vNode);
}
createBtn(
  diff34,
  ' 3-4 新旧节点相同 子元素 old children , new children 首删除了元素'
);

// 3-5 新旧节点相同 子元素 old children , new children 顺序错乱badc
function diff35() {
  // 会改变vNode
  patch(vNode, vNode3);
}
createBtn(
  diff35,
  ' 3-5 新旧节点相同 子元素 old children , new children 顺序错乱badc'
);
// 3-6 新旧节点相同 子元素 old children , new children 顺序错乱abcd
const vNode36 = h('ul', {}, [
  h('li', { key: 'a' }, 'A'),
  h('li', { key: 'b' }, 'B'),
  h('li', { key: 'c' }, 'C'),
  h('li', { key: 'd' }, 'D')
]);
function diff36() {
  console.log('=======需要先执行一次3-5========');
  patch(vNode3, vNode36);
}
createBtn(
  diff36,
  ' 3-6 新旧节点相同 子元素 old children , new children 顺序错乱abcd'
);

// 3-7 新旧节点相同 子元素 old children , new children 两端增加
function diff37() {
  console.log('=======需要先执行一次3-6========');

  console.log('vNode4: ', vNode4);
  patch(vNode36, vNode4);
  console.log('vNode4: ', vNode4);
}
createBtn(
  diff37,
  ' 3-7 新旧节点相同 子元素 old children , new children 两端增加eabcdf'
);

// 3-8 新旧节点相同 子元素 old children , new children 两端减少dabc
function diff38() {
  const vNode = h('ul', {}, [
    h('li', { key: 'd' }, 'D'),
    h('li', { key: 'a' }, 'A'),
    h('li', { key: 'b' }, 'B'),
    h('li', { key: 'c' }, 'C')
  ]);
  console.log('vNode4: ', vNode4);
  patch(vNode4, vNode);
}
createBtn(
  diff38,
  ' 3-8 新旧节点相同 子元素 old children , new children 两端减少dabc'
);
// 3-9 新旧节点相同 子元素 old children abcd , new children  abcf
function diff39() {
  const vNode4 = h('ul', {}, [
    h('li', { key: 'a' }, 'A'),
    h('li', { key: 'b' }, 'B'),
    h('li', { key: 'c' }, 'C'),
    h('li', { key: 'f' }, 'f'),
  ]);
  patch( vNode,vNode4);
}
createBtn(
  diff39,
  '需要初始化： 3-9 新旧节点相同 子元素 old children：abcd , new children ：abcf'
);

