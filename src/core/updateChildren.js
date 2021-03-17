import patch from './patch';
function sameVnode(oldVnode, vnode) {
  return oldVnode.sel === vnode.sel && oldVnode.key === vnode.key;
}
export default function updateChildren(parentElm,oldCh,newCh) {
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
			patch(oldStartNode,newStartNode);
			// node指向新节点 指针后移
			newStartNode = newCh[++newStartIdx];
			oldStartNode = oldCh[++oldStartIdx];
    } else if (sameVnode(oldEndNode, newEndNode)) {
      //  2 两个数组末尾节点相等 。path比较子节点是否需要更新
      console.log('2: ', 2);
			patch(oldEndNode,newEndNode);
			// node指向新节点 指针前移
			oldEndNode = oldCh[--oldEndIdx];
			newEndNode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndNode, newStartNode)) {
      // 3
      console.log('3: ', 3);
      newStartIdx++;
      oldEndIdx--;
    } else if (sameVnode(oldStartNode, newEndNode)) {
      // 4
      console.log('4: ', 4);
      newEndIdx--;
      oldStartIdx++;
    }
  }
  // 如果newChildren遍历完 ，old有剩余，就是要删除的

  // 如果old遍历完，新的有剩余就是要增加的
}
