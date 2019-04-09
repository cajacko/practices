# React Component Files

This is a guide to structuring React component files in such a way to maintain separation of
concerns (data, state, markup, styling).

- [React Component Files](#react-component-files)
  - [Update for Hooks](#update-for-hooks)
  - [Background](#background)
  - [Components](#components)
    - [index.js](#indexjs)
    - [ComponentName.container.js](#componentnamecontainerjs)
    - [ComponentName.component.js](#componentnamecomponentjs)
    - [ComponentName.render.js](#componentnamerenderjs)
    - [ComponentName.style.js](#componentnamestylejs)
  - [Higher Order Components](#higher-order-components)
  - [Context](#context)
  - [Scenes](#scenes)
  - [Overall React Component Folder Structure](#overall-react-component-folder-structure)
    - [ComponentGroup](#componentgroup)
  - [Eslint Plugin](#eslint-plugin)
  - [Notes](#notes)

## Update for Hooks

With React hooks out and about, this pattern needs a new look at. Initial thoughts are that you can
do away with the .component file is you're using hooks, and just include them in the .render file.

However if your state logic is getting big it's worth splitting it out of the .render file. Maybe
into a ComponentName.hooks.js file or useComponentName.js file? Not sure yet, will update after used
hooks for longer.

## Background

Have you ever been working on a React project that got larger and larger until one day you step back
and notice that some component files are 1000 lines long, with lots of state, data requirements,
styling and JSX tags everywhere? Well fret no more. Here's a pattern I've developed/stolen/mutated
over the years. A lot of the ideas have come from other people but I've combined them together and
can't remember where most of them came from anyways.

I tend to stick to this pattern quite religiously, even on small projects. As small project often
turn into big projects and going to back to adopt a pattern naming pattern is a ball ache. The
overhead of creating a folder, index.js file and ComponentName.render.js file even for small
components is nothing compared to getting screwed over later down the line when the project is now
huge, there's multiple standards and new devs join the project and do weird things to your repo.

## Components

For every React component structure it in the following way:

- ComponentName
  - [index.js](#indexjs)
  - [ComponentName.container.js](#componentnamecontainerjs)
  - [ComponentName.component.js](#componentnamecomponentjs)
  - [ComponentName.render.js](#componentnamerenderjs)
  - [ComponentName.style.js](#componentnamestylejs)

See the descriptions below for each specific file, but it's important to note that not every file
will exist for every component. If a component doesn't get any data from redux or an api, you don't
need a `ComponentName.container.js` file. Simple components may often just contain the `index.js`
and `ComponentName.render.js` files.

### index.js

This files only job is to point to the entry file for the component. As your component may start off
being only a simple `ComponentName.render.js` file. Over time it may grow to contain all of these
files and you don't want to have to go around updating imports from `ComponentName.render.js` to
`ComponentName.container.js` all over the place. So this file will just contain:

```
export { default } from './ComponentName.container'; // Or .component / .render, depending on what you got
```

### ComponentName.container.js

This file is responsible for any data requirements your component needs. If your familiar with the
container/component file pattern, this is a container component. If your unfamiliar with this, then
this file is responsible for getting the data your component needs from any global state management
you have e.g. from redux/mobx, any connections to apis e.g. Apollo/Relay for graphql data.

This file will not contain any internal component state, JSX markup or styling.

Example:

```
import { connect } from 'react-redux';
import { reduxAction } from '../../store/reducerKey/actions'
import ComponentName from './ComponentName.component';

const mapStateToProps = state => ({
  data: state.dataFromReduxStore,
});

const mapDispatchToProps = dispatch => ({
  onActionHappened: () => dispatch(reduxAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentName);
```

Note: If you need data from your global store and an api I would still include both parts in this 1
file. I've never had a situation where this file got big enough to split. If you did I guess you
could try `ComponentName.store.js` and `ComponentName.api.js`, but this is probably unlikely to
happen and maybe your component is too big anyway and should be split.

### ComponentName.component.js

This file is purely responsible for the components internal state and handling lifecycle methods
like `componentDidMount`. It will be a class component (See update for hooks)[(#update-for-hooks)]
and will only have 1 JSX tag, which is the `ComponentName.render.js` export (or occasionally a
single export from `ComponentName.style.js`). It will not directly fetch any data from the global
store or api (although it may use the props passed from `ComponentName.container.js`) and will not
contain any styling.

Example:

```
import React, { Component } from 'react';
import ComponentName from './ComponentName.render';

class ComponentNameComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      on: false,
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ on: !this.state.on });
  }

  render() {
    return (
      <ComponentName
        onClick={this.onClick}
        on={this.state.on}
      />;
    )
  }
}

export default ComponentNameComponent;
```

You may also notice in this example that the name of the class is `ComponentNameComponent`. You can
name it whatever you like but as you are importing `ComponentName from './ComponentName.render'` you
can't call it the same thing. So I like to add `Component` to whatever the component name is called
when used in a `.component` file e.g.

```
import Header from './Header.render';

class HeaderComponent extends Component {
```

### ComponentName.render.js

This file only handles the components markup. It will be a functional component without any state
(See update for hooks)[(#update-for-hooks)]. There will be no classes, styling or fetching data in
this file. You can sometimes not include this file if you only have 1 jsx tag in it, which is being
exported from `ComponentName.style.js`.

Example:

```
import React from 'react';
import { Container, H1 } from './ComponentName.style';

const ComponentName = ({ title }) => (
  <Container>
    <H1>{title}</H1>
  </Container>
);

export default ComponentName;
```

### ComponentName.style.js

If you haven't guessed already here is where all your styling lives. If you're not using css in js,
then this will be `ComponentName.css`/`ComponentName.scss` or whatever you use. If you are using JS
then there will be no markup, JSX, classes or data fetching going on here.

Example:

```
import styled from 'styled-components';

export const Container = styled.div`
  background-color: blue;
`;

export const H1 = styled.h1`
  font-size: 20px;
`;

```

## Higher Order Components

I always create a separate folder for Higher Order Components (HOCs) and follow the naming
convention `withComponentName.js`. Not much else to this really, expect look up HOCs if you're not
familiar with them.

## Context

If any of my projects use React context I'll have a separate folder for all the context components.
Each file will just be called `ComponentName.js` and will export a Provider and a Consumer.

## Scenes

I tend to have a separate folder in my repo called scenes. The idea is that each route in your app
will render a component from this scenes directory, which in turn renders the combination of
components needed for your route. I separate out scenes from components as often these components
are just `ComponentName.render.js` files which are a big bigger than normal. They typically have no
styling, data or state associated with them. They can therefore all be nested under the scenes dir
as `scenes/SceneName.js`.

Sometimes you may need to pass data to them or have state, in which case I'll still have a scenes
dir, but would follow same pattern as in the component folder e.g.

- SceneName
  - [index.js](#indexjs)
  - [SceneName.container.js](#componentnamecontainerjs)
  - [SceneName.component.js](#componentnamecomponentjs)
  - [SceneName.render.js](#componentnamerenderjs)
  - [SceneName.style.js](#componentnamestylejs)

## Overall React Component Folder Structure

<!--
For more detail on how I setup the folder structure for different kind of projects check out
[Repo Folder File Structure](../repo-folder-file-structure) -->

This a typical way I may structure React components inside a src folder

- src
  - components
    - ComponentName
      - index.js
      - ComponentName.container.js
      - ComponentName.component.js
      - ComponentName.render.js
      - ComponentName.style.js
    - ComponentGroup
      - ComponentName
        - index.js
        - ComponentName.container.js
        - ComponentName.component.js
        - ComponentName.render.js
        - ComponentName.style.js
  - HOCs
    - withComponentName.js
  - context
    - ComponentName.js
  - scenes
    - SceneName.js

### ComponentGroup

The only new thing shown in the structure above is `ComponentGroup`. As your component folder gets
larger and larger it will become unwieldy. At this point it may seem wise to group some components
together that make sense e.g.

- src
  - components
    - Forms
      - TextInput
        - index.js
        - TextInput.component.js
        - TextInput.style.js
      - FormGroup
        - ...
      - RadioList
        - ...
    - ... (lots more components)

A `ComponentGroup` will occasionally have an `index.js` file in it's root, exporting one of the sub
components. Otherwise there will not be any individual files as a direct child of `ComponentGroup`,
only other component folders. In Super crazy projects you may have multiple `ComponentGroup` dirs
nested inside them. But I do not encourage that, try and keep component folders and `ComponentGroup`
folders as flat as possible until they grow too large.

## Eslint Plugin

I'm planning to build one at some point, but it's low on the priority list. Ping me a message if you
want to help with it, as I have a bunch of ideas on how to enforce this stuff.

## Notes

- There's probably a better way of handling context, raise an issue and let me know your thoughts
- Tiny components
  - I use to have an additional folder at `src/components/UI` which just had a bunch of files
    inside which followed `ComponentName.js`. These were for small self contained components which
    would typically be things like a Text, Button or Spinner component. All the styling and markup
    would be contained in this file.
  - These files never got data from redux or an api and never had state. Just tiny styled components
- Component related utils or config
  - I've tried out having util function files or config files that are only related to an
    individual component nested inside the `src/components/ComponentName` dir. e.g.
    `src/components/ComponentName/utils/doComplicateThing.js`. However I've moved away from that
    pattern in favour of putting it inside `src/utils/doComplicatedThing.js`. As I would start
    getting confused as to whether util functions where nested somewhere in a component or in the
    utils dir.
- Using HOCs in `src/components/ComponentName` files
  - Feel free to import and use HOCs in any of the files except `index.js` and
    `ComponentName.style.js`.
