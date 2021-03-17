
/**
 * vnode 
 *
 * @export
 * @param {*} sel 选择器
 * @param {*} data 数据
 * @param {*} children 子元素 []
 * @param {*} text 文本 
 * @param {*} elm dom元素
 * @returns vnode:{}
 */
export default function vnode(sel, data, children, text, elm) {
  return {
    sel,
    data,
    children,
    text,
    elm,
    key: data.key 
  };
}
