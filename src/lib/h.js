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
  // TODO 目前版本只接受三个参数
  if (arguments.length !== 3) throw new Error("参数必须为3");
  // 基本类型 直接生成vnode
  if (typeof c == "string" || typeof c == "number") {
    return vnode(sel, data, undefined, c, undefined);
    //  数组类型 遍历生成vnode
  } else if (Array.isArray(c)) {
    const children = [];
    c.forEach(child => {
      children.push(child);
    });
    return vnode(sel,data,children,undefined,undefined)
    // object 类型 直接包装为array 类型
  }else if(typeof c == 'object' && c.hasOwnProperty('sel')){
    return vnode(sel,data,[c],undefined,undefined)
  }else{
    throw new Error("参数类型错误")
  }

}
