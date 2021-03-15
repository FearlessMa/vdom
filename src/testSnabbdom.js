import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes
import { toVNode } from 'snabbdom/tovnode'

const patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
])

const newVNode = h('div', { style: { color: '#000' } }, [
  h('h1', 'Headline'),
  h('p', 'A paragraph'),
])

console.log('newVNode: ', newVNode);
patch(toVNode(document.querySelector('#container')), newVNode)