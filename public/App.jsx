"use strict";
import React, {Component} from "react";
import {FadeIn, SlideLeft, SlideRight} from './transitions';


export default class Example extends Component {
    constructor(...rest) {
        super(...rest);
        this.state = {fadeIn: true};
    }

    handleEnter = ()=> {
        this.setState({state: 'Entering'});
    };
    handleDidEnter = (done)=> {

        this.setState({state: 'Entered'});
        done();
    };
    handleAppear = ()=> {
        this.setState({state: 'Appearing'});
    };
    handleDidAppear = (done)=> {
        this.setState({state: 'Appeared'});
        done();
    };

    handleLeave = ()=> {
        this.setState({state: 'Leaving'});
    };

    handleDidLeave = (done)=> {
        this.setState({state: 'Left'});
        done();
    };


    render() {
        const label = `${this.props.label} ${this.state.fadeIn ? 'In' : 'Out'}`;
        const Component = this.props.component;
        return <div>
            <p> Animation state: {this.state.state}</p>

            <button onClick={()=>this.setState({fadeIn:!this.state.fadeIn})}>{label}</button>
            <Component onEnter={this.handleEnter} onDidEnter={this.handleDidEnter}
                    onLeave={this.handleLeave} onDidLeave={this.handleDidLeave}
                    onAppear={this.handleAppear} onDidAppear={this.handleDidAppear}>{
                this.state.fadeIn ?
                    <h3 style={{backgroundColor:'#fcf'}} key={this.props.label}>This Should {this.props.label} In</h3>
                    : null
            }</Component>
        </div>
    }
}
export default class App extends Component {

    render() {

        return <div>
            <h3>react-css-module-animations</h3>
            <p>Some helper tools for making react css animation use css 2 modules.<br/></p>
            <Example label="Fade" component={FadeIn}/>
            <Example label="Slide Left" component={SlideLeft}/>
            <Example label="Slide Right" component={SlideRight}/>

        </div>
    }
}