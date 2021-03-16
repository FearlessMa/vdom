import createElement from './createElement';

// 更新vnode上树
export default function patch(oldVnode, newVnode) {
  console.log('oldVnode: ', oldVnode);
  console.log('newVnode: ', newVnode);
  //  如果 oldVnode 不是vnode 直接挂载
  if (!oldVnode.sel) {
    const el = createElement(newVnode);
    oldVnode.appendChild(el);
  }
}
