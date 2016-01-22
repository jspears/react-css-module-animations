"use strict";

import React from "react";
import EventCSSTransitionGroup from './EventCSSTransitionGroup.jsx';
import capitalize from 'lodash/string/capitalize';

export const DEF_OPTIONS = {
    transitionAppearTimeout: 1500,
    transitionLeaveTimeout: 1500,
    transitionEnterTimeout: 1500
};

export default function transitionFactory(less, options) {
    options = options || DEF_OPTIONS;

    const rest = ['enter', 'leave', 'appear'].reduce((ret, key)=> {
        const timeoutKey = `transition${capitalize(key)}Timeout`;
        if (less[key]) {
            ret[timeoutKey] = options[timeoutKey] || DEF_OPTIONS[timeoutKey];
        }
        return ret;
    }, {});

    return function TransitionFactory(oprops) {
        const {children, ...props} = oprops;
        return <EventCSSTransitionGroup transitionName={less} {...rest} {...props}>
            {children}
        </EventCSSTransitionGroup>
    }
}