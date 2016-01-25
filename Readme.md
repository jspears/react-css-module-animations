react-css-module-animations
===
Some helper tools for making react css animation use css 2 modules.  

## *In Development Use at your own risk*

##Demo
See it in action [here](http://jspears.github.io/react-css-module-animations)

Or run it 

```sh
  git clone http://github.com/jspears/react-css-module-animations
  cd react-css-module-animations
  npm install
  npm run hot &
  open http://localhost:8082
```

##Installation
```sh
 $ npm install react-css-module-animations
``

##API
EventCSSTransitionGroup 

Is basically the same as ReactCSSTransitionGroup minus the backwards compatibilty and plus the addition of optional
onAppear, onAppearEnd, onEnter, onEnterEnd, onLeave, onLeaveEnd properties.

transitionFactory

Wraps extracted css modules and returns a React component configured from the extracted data.


##Usage

Step 1) - Setup CSS loader to expose css modules. 
webpack.config
```
  module:{
  loaders:[
   {
                test: /\.less$/,
                include: [join('src'), join('public')],
                loader: ExtractTextPlugin.extract('style-loader', 'css-transition-loader!css?modules&importLoaders=1&localIdentName=[hash:base64:5]_[name]__[local]!less')
   }
   ]

```

Step 2) - Includ

```jsx

"use strict";
import React, {Component} from "react";
import {FadeIn} from './transitions';

export default class App extends Component {
    render() {
        return <div>
            <h3>react-css-module-animations</h3>
            <p>Some helper tools for making react css animation use css 2 modules. </p>
            <div>
                <button onClick={this.setState({fadeIn:!this.state.fadeIn})}>
                    Fade {this.state.fadeIn ?  'Out' : 'In'}</button>
                <FadeIn>{this.state.fadeIn ?<h3 key="fadeIn">This Should Fade In</h3> : null}</FadeIn>
            </div>
        </div>
    }
}
  
```