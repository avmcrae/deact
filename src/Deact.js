import MountableString from './MountableString';

export class DOMComponent {
  constructor(element) {
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
      const childInstance = instantiateComponent(child);
      const mountedChild = childInstance.mount();
      node.appendChild(mountedChild);
    });

    return node;
  }
}

/*
* Helper function to determine if a composite component type is a function or class.
* React.Component subclasses have the isReactComponent flag.
* */
const isClass = (type) => Boolean(type.prototype) && Boolean(type.prototype.isReactComponent);

export class CompositeComponent {
  constructor(element) {
    this.currentElement = element;
  }

  mount() {
    const {props, type} = this.currentElement;

    let renderedElement;
    if (isClass(type)) {
      const element = new type(props);
      if (element.componentWillMount) {
        element.componentWillMount();
      }
      renderedElement = element.render();
    } else {
      renderedElement = type(props);
    }

    return instantiateComponent(renderedElement).mount();
  }
}

const instantiateComponent = (element) => {
  if(typeof element.type === 'string') return new DOMComponent(element);
  else if (typeof element.type === 'function') return new CompositeComponent(element);
  else return new MountableString(element);
};

/*
  Analogous to ReactDOM.render().
*/
const render = (element, containerNode) => {
  const instance = instantiateComponent(element);
  const domNode = instance.mount();
  containerNode.appendChild(domNode)
};

export default {
  render,
  instantiateComponent
}