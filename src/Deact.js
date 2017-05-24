//IGNORE THIS! helper class for string literals. Sorry!!
class Component{constructor(element){if(!element.type)this.mount=()=>{const node = document.createElement('span');node.innerHTML = element;return node;};}};

export class DOMComponent extends Component {
  constructor(element) {
    super(element);
    this.element = element;
  }

  mount() {
    const {props} = this.element;
    const element = document.createElement(this.element.type);

    Object.keys(props).forEach((key) => {
      if (key !== 'children') {
        element.setAttribute(key, props[key]);
      } else if (props[key]) {
        const children = Array.isArray(props[key]) ? props[key] : [props[key]];

        children.forEach((child) => {
          const childElement = new DOMComponent(child).mount();
          element.appendChild(childElement);
        })
      }
    });

    return element;
  }
}

/*
  Analogous to ReactDOM.render().
*/
const render = (element, containerNode) => {
  const mountedElement = new DOMComponent(element).mount();
  containerNode.appendChild(mountedElement);
  return containerNode;
};

export default {
  render,
}