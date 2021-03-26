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
  let newStartVnode = newCh[newStartIdx];
  let newEndVnode = newCh[newEndIdx];
  let oldStartVnode = oldCh[oldStartIdx];
  let oldEndVnode = oldCh[oldEndIdx];
  let keyMap = null;
  // 先做双端比较 ，知道 其中一个数组遍历完
  // 1. 新前 与 旧前 比较 相同 指针都加一 ，退出本轮循环 不同进入下一种比较
  // 2. 新后 与 旧后 比较 相同 指针都减一， 退出本轮循环 不同进入下一种比较
  // 3. 新前 与 旧后 比较 相同 新前指针-1 ，旧后指针+1，退出本轮循环 不同进入下一种比较
  // 4. 新后 与 旧前 比较 相同 新后指针-1， 旧前指针+1，退出本轮循环 不同进入下一种比较
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    // 跳过标记为undefined的比较
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 1 两个数组开始节点相等 。path比较子节点是否需要更新，
      console.log('1: 旧前与新前', 1);
      patch(oldStartVnode, newStartVnode);
      // node指向新节点 指针后移
      newStartVnode = newCh[++newStartIdx];
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      //  2 两个数组末尾节点相等 。path比较子节点是否需要更新
      console.log('2: 旧后与新后', 2);
      patch(oldEndVnode, newEndVnode);
      // node指向新节点 指针前移
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // 3   在旧前之前 加入
      // new a d c b
      // old a b c d
      console.log('3: 旧后与新前', 3);
      // 移动位置 在旧前之前加入旧后节点
      console.log('oldStartVnode.elm): ', oldStartVnode.elm);
      console.log('oldEndVnode.elm: ', oldEndVnode.elm);
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      // patch 比较 新旧节点是否有变化
      patch(oldEndVnode, newStartVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // 4
      // new a d c b
      // old b c a d

      console.log('4: 旧前与新后', 4);
      // 移动节点 在旧后的下一个兄弟节点之前加入
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextElementSibling);
      patch(oldStartVnode, newEndVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else {
      console.log('5: ', 5);
      // 全部未命中 没有 指针移动
      console.log('全部未命中: 没有指针移动');
      // old a b c d
      // new c a d f
      // old b a d c
      // new a b c d
      // let isFind = false;
      // for (let i = 0; i < oldCh.length; i++) {
      //   if (oldCh[i] != undefined && sameVnode(oldCh[i], newStartVnode)) {
      //     console.log('oldCh[i]: ', oldCh[i]);
      //     console.log('oldCh[newStartIdx]: ', oldCh[newStartIdx]);
      //     // 判断是否 有oldCh[newStartIdx] 节点
      //     let pre = oldCh[newStartIdx] ? oldCh[newStartIdx].elm : null;
      //     parentElm.insertBefore(oldCh[i].elm, pre);
      //     patch(oldCh[i], newStartVnode);
      //     oldCh[i] = undefined;
      //     isFind = true;
      //   }
      // }
      // // 如果没找到 旧children中没有newStartNode,插入旧节点中，插入到oldCh[oldStartIdx]
      // if (!isFind) {
      //   console.log('newStartVnode: ', newStartVnode);
      //   console.log('oldCh[oldStartIdx].elm: ', oldCh[oldStartIdx].elm);
      //   console.log('oldCh[oldStartIdx]: ', oldCh[oldStartIdx]);
      //   parentElm.insertBefore(
      //     createElement(newStartVnode),
      //     oldCh[oldStartIdx].elm
      //   );
      //   // isFind = false;
      // }

      // old a b c d
      // new c a d f
      if (!keyMap) {
        keyMap = {};
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          keyMap[oldCh[i].key] = i;
        }
        console.log('keyMap: ', keyMap);
      }
      let idxInOld = keyMap[newStartVnode.key];
      let pre = oldCh[newStartIdx] ? oldCh[newStartIdx].elm : null;
      if (idxInOld == undefined) {
        console.log('idxInOld == undefined 需要新增的节点：', newStartVnode);
        createElement(newStartVnode);
        parentElm.insertBefore(createElement(newStartVnode), pre);
      } else {
        let elmToMove = oldCh[idxInOld];
        console.log('有idxInOld: 需要移动', idxInOld, elmToMove);
        // let pre = oldCh[newStartIdx] ? oldCh[newStartIdx].elm : null;
        parentElm.insertBefore(elmToMove.elm, pre);
        patch(elmToMove, newStartVnode);
        oldCh[idxInOld] = undefined;
      }
      newStartVnode = newCh[++newStartIdx]; // 防止死循环
    }
  }
  // 如果newChildren遍历完 ，old有剩余，就是要删除的
  // old a b c d
  // new c d
  // new d c
  if (oldStartIdx <= oldEndIdx) {
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      console.log('newChildren遍历完 ，oldChildren有剩余，就是要删除的: ', oldCh[i]);
      if (oldCh[i] !== undefined) {
        parentElm && parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
  // 如果old遍历完，新的有剩余就是要增加的
  // new a b c d e
  // old a b c d
  // new e a b c d
  if (newStartIdx <= newEndIdx) {
    console.log('oldChildren遍历完，newChildren有剩余就是要增加的 : ');
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      if (newCh[i] !== undefined && parentElm) {
        // newEndIdx 指向最尾端 时为 null ，就是在末尾追加
        // newEndIdx 指向 a 时，就是在 a 前增加
        let pre = oldCh[newEndIdx] ? oldCh[newEndIdx].elm : null;
        parentElm.insertBefore(createElement(newCh[i]), pre);
      }
    }
  }
}
