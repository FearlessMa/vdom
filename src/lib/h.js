import vnode from "./vnode";
/**
 *
 *
 * @export
 * @param {*} sel
 * @param {*} data
 * @param {*} c  string number  [] {}
 * @returns vnode
 */
export default function h(sel, data, c) {
  if (arguments.length !== 3) throw new Error("参数必须为3");
  if (typeof c == "string" || typeof c == "number") {
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    const children = [];
    c.forEach(child => {
      children.push(child);
    });
    return vnode(sel,data,children,undefined,undefined)
  }else if(typeof c == 'object' && c.hasOwnProperty('sel')){
    return vnode(sel,data,[c],undefined,undefined)
  }else{
    throw new Error("参数类型错误")
  }

}
