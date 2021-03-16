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
const vnode = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
  h("li", {}, h("div", {}, "1234"))
]);
console.log("vnode: ", vnode);

const dom = document.getElementById("container");
patch(dom, vnode);
