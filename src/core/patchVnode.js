import createElement from './createElement';
function sameVnode(oldVnode, vnode) {
  return oldVnode.sel === vnode.sel && oldVnode.elm === vnode.elm;
}

// 实现 节点只有children 或者 text
export default function patchVnode(oldVnode, newVnode) {
  console.log('oldVnode: ', oldVnode);
  console.log('newVnode: ', newVnode);
  if (sameVnode(oldVnode, newVnode)) return;
  console.log('是同一个节点');
  // 同一个节点 新节点没有children，有text
  if (newVnode.text && (!newVnode.children || newVnode.children.length === 0)) {
    console.log('有text');
    // 新旧text是否相同
    if (newVnode.text === oldVnode.text) return;
    // 不同直接替换
    oldVnode.elm.innerText = newVnode.text;
  } else {
    // newVnode有children
    console.log('同一个节点。且都有children: ');
    // 旧节点有text ，没有children
    if (oldVnode.text && newVnode.children && newVnode.children.length) {
      const children = newVnode.children;
      const ele = oldVnode.elm;
      // 清空旧的text
      ele.innerHTML = '';
      // 旧节点挂在 新节点children
      children.forEach((ch) => {
        const elCh = createElement(ch);
        ele.appendChild(elCh);
      });
    } else {
      //  旧节点和新节点 都是children
      // 双端比较
      const oldChildren = oldVnode.children;
      const newChildren = newVnode.children;
      let newStartIdx = 0; // 新前
      let newEndIdx = newChildren.length - 1; // 新后
      let oldStartIdx = 0; // 旧前
      let oldEndIdx = oldChildren.length - 1; // 旧后

      // 先做双端比较 ，知道 其中一个数组遍历完
      // 1. 新前 与 旧前 比较 相同 指针都加一 ，退出本轮循环 不同进入下一种比较
      // 2. 新后 与 旧后 比较 相同 指针都减一， 退出本轮循环 不同进入下一种比较
      // 3. 新前 与 旧后 比较 相同 新前指针-1 ，旧后指针+1，退出本轮循环 不同进入下一种比较
      // 4. 新后 与 旧前 比较 相同 新后指针-1， 旧前指针+1，退出本轮循环 不同进入下一种比较
      while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
        if (sameVnode(oldChildren[oldStartIdx], newChildren[newStartIdx])) {
          // 1
          console.log('1: ', 1);
          newStartIdx++;
          oldStartIdx++;
        } else if (sameVnode(oldChildren[oldEndIdx], newChildren[newEndIdx])) {
          //  2
          console.log('2: ', 2);
          newEndIdx--;
          oldEndIdx--;
        } else if (
          sameVnode(oldChildren[oldEndIdx], newChildren[newStartIdx])
        ) {
          // 3
          console.log('3: ', 3);
          newStartIdx++;
          oldEndIdx--;
        } else if (
          sameVnode(oldChildren[oldStartIdx], newChildren[newEndIdx])
        ) {
          // 4
          console.log('4: ', 4);
          newEndIdx--;
          oldStartIdx++;
        }
      }
      // 如果newChildren遍历完 ，old有剩余，就是要删除的

      // 如果old遍历完，新的有剩余就是要增加的
    }
  }
}
