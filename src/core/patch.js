import createElement from './createElement';
// import h from './h';
import vnode from './vnode';
import patchVnode from './patchVnode';
// 更新vnode上树
export default function patch(oldVnode, newVnode) {
  //  如果 oldVnode 不是vnode节点 ，变为vnode节点
  if (oldVnode.sel === undefined && oldVnode.elm === undefined) {
    let element = oldVnode;
    oldVnode = vnode(
      element.tagName.toLowerCase(),
      {},
      undefined,
      undefined,
      element
    );
  }
  // 同一个虚拟节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    newVnode.elm = oldVnode.elm;
    patchVnode(oldVnode, newVnode);
    // if (oldVnode === newVnode) return;
    // console.log('是同一个节点');
    // // 同一个节点 新节点且 没有children，有text
    // if (
    //   newVnode.text &&
    //   (!newVnode.children || newVnode.children.length === 0)
    // ) {
    //   // 新旧text是否相同
    //   if (newVnode.text === oldVnode.text) return;
    //   // 不同直接替换
    //   oldVnode.elm.innerText = newVnode.text;
    // } else {
    //   // 同一个节点。且都有children
    //   console.log('同一个节点。且都有children: ');
    //   // 旧节点有text ，没有children
    //   if (oldVnode.text && newVnode.children && newVnode.children.length) {
    //     const children = newVnode.children;
    //     const ele = oldVnode.elm;
    //     // 清空旧的text
    //     ele.innerHTML = '';
    //     // 旧节点挂在 新节点children
    //     children.forEach((ch) => {
    //       const elCh = createElement(ch);
    //       ele.appendChild(elCh);
    //     });
    //   }
    // }
  } else {
    // 非同一个虚拟节点 暴力删除旧，挂载新
    console.log('非同一个虚拟节点: ');
    const ele = createElement(newVnode);
    if (oldVnode.elm && oldVnode.elm.parentNode) {
      const parent = oldVnode.elm.parentNode;
      // 旧节点之前插入
      parent.insertBefore(ele, oldVnode.elm);
      // 删除旧节点
      parent.removeChild(oldVnode.elm);
    }
  }
}
