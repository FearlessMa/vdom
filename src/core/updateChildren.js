import createElement from './createElement';
import patch from './patch';
function sameVnode(oldVnode, vnode) {
  return oldVnode.sel === vnode.sel && oldVnode.key === vnode.key;
}
export default function updateChildren(parentElm, oldCh, newCh) {
  // 双端比较
  let newStartIdx = 0; // 新前
  let newEndIdx = newCh.length - 1; // 新后
  let oldStartIdx = 0; // 旧前
  let oldEndIdx = oldCh.length - 1; // 旧后
  let newStartNode = newCh[newStartIdx];
  let newEndNode = newCh[newEndIdx];
  let oldStartNode = oldCh[oldStartIdx];
  let oldEndNode = oldCh[oldEndIdx];
  // 先做双端比较 ，知道 其中一个数组遍历完
  // 1. 新前 与 旧前 比较 相同 指针都加一 ，退出本轮循环 不同进入下一种比较
  // 2. 新后 与 旧后 比较 相同 指针都减一， 退出本轮循环 不同进入下一种比较
  // 3. 新前 与 旧后 比较 相同 新前指针-1 ，旧后指针+1，退出本轮循环 不同进入下一种比较
  // 4. 新后 与 旧前 比较 相同 新后指针-1， 旧前指针+1，退出本轮循环 不同进入下一种比较
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    if (sameVnode(oldStartNode, newStartNode)) {
      // 1 两个数组开始节点相等 。path比较子节点是否需要更新，
      console.log('1: ', 1);
      patch(oldStartNode, newStartNode);
      // node指向新节点 指针后移
      newStartNode = newCh[++newStartIdx];
      oldStartNode = oldCh[++oldStartIdx];
    } else if (sameVnode(oldEndNode, newEndNode)) {
      //  2 两个数组末尾节点相等 。path比较子节点是否需要更新
      console.log('2: ', 2);
      patch(oldEndNode, newEndNode);
      // node指向新节点 指针前移
      oldEndNode = oldCh[--oldEndIdx];
      newEndNode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndNode, newStartNode)) {
      // 3   在旧前之前 加入
      // new a d c b
      // old a b c d
      console.log('3: ', 3);
      // 移动位置 在旧前之前加入旧后节点
      parentElm.insertBefore(oldEndNode.elm, oldStartNode.elm);
      // patch 比较 新旧节点是否有变化
      patch(oldEndNode, newStartNode);
      oldEndNode = oldCh[--oldEndIdx];
      newStartNode = newCh[++newStartIdx];
    } else if (sameVnode(oldStartNode, newEndNode)) {
      // 4
      // new a d c b
      // old b c a d

      console.log('4: ', 4);
      // 移动节点 在旧后的下一个兄弟节点之前加入
      parentElm.insertBefore(
        oldStartNode.elm,
        oldEndNode.elm.nextElementSibling
      );
      patch(oldStartNode, newEndNode);
      oldStartNode = oldCh[++oldStartIdx];
      newEndNode = newCh[--newEndIdx];
    }
  }
  // 如果newChildren遍历完 ，old有剩余，就是要删除的
  // old a b c d 
  // new c d
  // new d c
  if (newStartIdx > newEndIdx) {
    console.log('newChildren遍历完 ，old有剩余，就是要删除的: ');
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      parentElm.removeChild(oldCh[i].elm);
    }
  }
  // 如果old遍历完，新的有剩余就是要增加的
  // new a b c d e
  // old a b c d 
  // new e a b c d
  if(oldStartIdx > oldEndIdx){

  }

}
