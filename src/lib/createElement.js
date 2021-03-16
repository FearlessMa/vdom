export default function createElement(vnode) {
  const el = document.createElement(vnode.sel);
  // 文本节点处理
  if (vnode.text) {
    el.innerText = vnode.text;
  }
  const children = vnode.children;
  // 判断是否有子节点
  if (Array.isArray(children) && children.length) {
    children.forEach((child) => {
      const eleChild = createElement(child);
      el.append(eleChild);
    });
  }
  return el;
}
