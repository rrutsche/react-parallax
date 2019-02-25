import React from 'react';

export function getWindowHeight(useDOM) {
    if (!useDOM) {
        return 0;
    }
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];

    return w.innerHeight || e.clientHeight || g.clientHeight;
}

export function isScrolledIntoView(element, offset = 0, useDOM) {
    if (!useDOM) {
        return false;
    }
    const elementTop = element.getBoundingClientRect().top - offset;
    const elementBottom = element.getBoundingClientRect().bottom + offset;
    return elementTop <= getWindowHeight(useDOM) && elementBottom >= 0;
}

export function getNodeHeight(useDOM, node) {
    if (!useDOM) {
        return 0;
    }

    if (!node) {
        return getWindowHeight(useDOM);
    }

    return node.clientHeight;
}

export function canUseDOM() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export function getPercentage(startpos, endpos, currentpos) {
    const distance = endpos - startpos;
    const displacement = currentpos - startpos;
    return displacement / distance || 0;
}

export function getRelativePosition(node, useDOM) {
    if (!useDOM) {
        return 0;
    }
    const element = node;
    const { top, height } = element.getBoundingClientRect();
    const parentHeight = getNodeHeight(useDOM);
    const maxHeight = height > parentHeight ? height : parentHeight;
    const y = Math.round(top > maxHeight ? maxHeight : top);

    return getPercentage(-height, maxHeight, y, height);
}

/**
 * Extracts children with type Background from others and returns an object with both arrays:
 *  {
 *      bgChildren: bgChildren, // typeof child === 'Background'
 *      children: children // rest of this.props.children
 *   }
 * @return {Object} splitchildren object
 */
export function getSplitChildren(props) {
    let bgChildren = [];
    const children = React.Children.toArray(props.children);
    children.forEach((child, index) => {
        if (child.type && child.type.isParallaxBackground) {
            bgChildren = bgChildren.concat(children.splice(index, 1));
        }
    });
    return {
        bgChildren,
        children,
    };
}

export function setBlur(node, blur) {
    // eslint-disable-next-line no-param-reassign
    node.style.WebkitFilter = `blur(${blur}px)`;
    // eslint-disable-next-line no-param-reassign
    node.style.filter = `blur(${blur}px)`;
}
