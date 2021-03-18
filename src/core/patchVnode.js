import createElement from './createElement';
import updateChildren from './updateChildren';

// 实现 节点只有children 或者 text
export default function patchVnode(oldVnode, newVnode) {
  if (oldVnode === newVnode) return;
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
    // 旧节点没有children
    if (!oldVnode.children) {
      console.log('旧节点没有children: ');
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
      console.log('旧节点和新节点 都是children: ');
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    }
  }
}
