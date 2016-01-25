"use strict";

import React from "react";
import EventCSSTransitionGroup from './EventCSSTransitionGroup.jsx';
import capitalize from 'lodash/string/capitalize';

export default function transitionFactory(less, options) {
    options = options || {};
    const delay = options.delay || 80;
    const rest = ['enter', 'leave', 'appear'].reduce((ret, key)=> {
        const transitionKey = `transition${capitalize(key)}`;

        if (less[key]) {
            const lessTimeout = less[`@${key}Timeout`];
            ret[`${transitionKey}Timeout`] = lessTimeout ? lessTimeout + delay : options[`${transitionKey}Timeout`];
            ret[transitionKey] = less[key];
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