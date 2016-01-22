"use strict";
import React, {Component} from "react";
import {FadeIn} from './transitions';

export default class App extends Component {
    constructor(...rest) {
        super(...rest);
        this.state = {fadeIn: true};
    }

    handleEnter = ()=> {
        this.setState({fadeInProgress: true});
    };
    handleDidEnter = (done)=> {

        this.setState({fadeInProgress: false});
        done();
    };

    render() {
        const label = `Fad${this.state.fadeInProgress ? 'ing ' : 'ed'} ${this.state.fadeIn ? 'In' : 'Out'}`;

        return <div>
            <h3>react-css-module-animations</h3>
            <p>Some helper tools for making react css animation use css 2 modules. </p>
            <div>
                <button onClick={()=>this.setState({fadeIn:!this.state.fadeIn})}>{label}</button>
                <FadeIn  onEnter={this.handleEnter} onDidEnter={this.handleDidEnter}
                         onLeave={this.handleEnter} onDidLeave={this.handleDidEnter}
                         onAppear={this.handleEnter} onDidAppear={this.handleDidEnter}>{
                    this.state.fadeIn ?
                    <h3 style={{backgroundColor:'#fcf'}} key="fadeIn">This Should Fade In</h3>
                        : null
                    }</FadeIn>
            </div>
        </div>
    }
}