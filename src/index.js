import h from "./lib/h";
import patch from './lib/patch'
// import  './testSnabbdom'
// import { init } from "snabbdom/init";
// import { classModule } from "snabbdom/modules/class";
// import { propsModule } from "snabbdom/modules/props";
// import { styleModule } from "snabbdom/modules/style";
// import { eventListenersModule } from "snabbdom/modules/eventlisteners";

// const patch = init([
//   // Init patch function with chosen modules
//   classModule, // makes it easy to toggle classes
//   propsModule, // for setting properties on DOM elements
//   styleModule, // handles styling on elements with support for animations
//   eventListenersModule // attaches event listeners
// ]);
const vnode1 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
  h("li", {}, h("div", {}, "1234"))
]);
console.log("vnode1: ", vnode1);
// const vnode2 = h("div", {}, [
//   h("li", {}, "A"),
//   h("li", {}, "B"),
//   h("li", {}, "C"),
//   h("li", {}, "D"),
//   h("li", {}, h("div", {}, "1234"))
// ]);
// const vnode3 = h("ul", {},'同一个节点，变为text');
const vnode4 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "D"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, h("div", {}, "1234"))
]);
const dom = document.getElementById("container");
patch(dom, vnode1);
const btn = document.getElementById("btn");
btn.onclick= function(){
  // 不同节点
  // patch(vnode1, vnode2);
  // 相同节点 不同子节点 
  // patch(vnode1, vnode3);
  // 相同节点，子节点都是children
  patch(vnode1,vnode4)
}
