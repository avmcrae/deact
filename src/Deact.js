//IGNORE THIS! helper class for string literals. Sorry!!
class Component{constructor(element){if(!element.type)this.mount=()=>{const node = document.createElement('span');node.innerHTML = element;return node;};}};

export class DOMComponent extends Component {
  constructor(element) {
    //for demo purposes only.
    super(element);

    this.currentElement = element;
  }

  mount() {
    const element = this.currentElement;
    const props = element.props;
    const node = document.createElement(element.type);

    //set HTML attributes for all non-child props.
    Object.keys(props).forEach(propName => {
      if(propName !== 'children') node.setAttribute(propName, props[propName])
    });

    //handle different child cases (array of children, single child, no children).
    let children = props.children || [];
    if(!Array.isArray(children)) children = [children];

    //instantiate, mount, and append child elements.
    children.forEach(child => {
      const childInstance = new DOMComponent(child);
      const mountedChild = childInstance.mount();
      node.appendChild(mountedChild);
    });

    return node;
  }
}

/*
  Analogous to ReactDOM.render().
*/
const render = (element, containerNode) => {
  const instance = new DOMComponent(element);
  const domNode = instance.mount();
  containerNode.appendChild(domNode)
};

export default {
  render,
}