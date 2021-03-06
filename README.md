# __Deact__
## React under the hood

*__Please note that this project is in its infancy. The slide deck and curriculum are far from completed.__*

#### what
This repository is for those looking to learn how React works under the hood.

The curriculum assumes a familiarity with Javascript, React and git.

#### structure
Lessons are split up into branches. Lesson x.0 contains the answer key - for
example, branch 2.0-static-render-dom contains the answer key for
Lesson 2, static-render-dom.

I am working on making branching checkpoints inside of lessons, so you can follow along by checking out x.1, x.2, etc, but this is incomplete.

#### how
Run the following command at project root to track all remote branches, which are used as "chapters":

`git branch -a | grep -v HEAD | perl -ne 'chomp($_); s|^\*?\s*||; if (m|(.+)/(.+)| && not $d{$2}) {print qq(git branch --track $2 $1/$2\n)} else {$d{$_}=1}' | csh -xfs`

then run `yarn install`.

Follow along with [this slide deck](https://docs.google.com/a/thoughtworks.com/presentation/d/1ylwz_h6AxcJDuLLxcrhzVnG_gjdru9byCsRsFmX5uQ4/edit?usp=sharing). You will be prompted when it is time to start coding.

Lessons are generally in a test-driven fashion: for each lesson, you will have a suite of tests that you must pass. However, some branches are simply examples.

Once all tests are passing in a suite, you will have built a new piece of Deact. Run `yarn devserver` to see the fruits of your labor in a browser.

This is based on React's stack reconciler. This implementation has been overhauled with React Fiber, but the concepts are similar.

### Table of Contents
**1. The Anatomy of an Element**

**2. DOMComponent**
- 2.1: blank slate
- 2.2:
  - create DOM elements by type
  - set HTML attributes from props
- 2.3:
  - mount string literal children inside a < span />
  - render and attach child elements
- 2.4:
  - render() method: attach a DOM node to container node, like ReactDOM.render()
  
**3. instantiateComponent()**
- 3.1: blank slate
- 3.2: build the instantiateComponent() method
- 3.3: use instantiateComponent() in DOMComponent

**4. CompositeComponent**
- 4.1: blank slate
- 4.2: mounting functional components
- 4.3: mounting class components
- 4.4: calling componentWillMount() before rendering class components
