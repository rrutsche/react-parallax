import React from 'react';
import { BlurProp, DynamicBlurProp } from '../../@types';

export function getWindowHeight(useDOM: boolean) {
    if (!useDOM) {
        return 0;
    }
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];

    return w.innerHeight || e.clientHeight || g.clientHeight;
}

export function isScrolledIntoView(element: HTMLElement, offset = 0, useDOM: boolean) {
    if (!useDOM) {
        return false;
    }
    const elementTop = element.getBoundingClientRect().top - offset;
    const elementBottom = element.getBoundingClientRect().bottom + offset;
    return elementTop <= getWindowHeight(useDOM) && elementBottom >= 0;
}

export function getNodeHeight(useDOM: boolean, node?: HTMLElement | Document) {
    if (!useDOM) {
        return 0;
    }

    if (!node || !('clientHeight' in node)) {
        return getWindowHeight(useDOM);
    }

    return node.clientHeight;
}

export function canUseDOM() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export function getPercentage(startpos: number, endpos: number, currentpos: number) {
    const distance = endpos - startpos;
    const displacement = currentpos - startpos;
    return displacement / distance || 0;
}

export function getRelativePosition(node: HTMLElement, useDOM: boolean) {
    if (!useDOM) {
        return 0;
    }
    const element = node;
    const { top, height } = element.getBoundingClientRect();
    const parentHeight = getNodeHeight(useDOM);
    const maxHeight = height > parentHeight ? height : parentHeight;
    const y = Math.round(top > maxHeight ? maxHeight : top);

    return getPercentage(-height, maxHeight, y);
}

interface SplitChildrenProps {
    children?: React.ReactNode;
}
export interface SplitChildrenResultType {
    bgChildren: Array<React.ReactNode>;
    children: Array<React.ReactNode>;
}
/**
 * Extracts children with type Background from others and returns an object with both arrays:
 *  {
 *      bgChildren: bgChildren, // typeof child === 'Background'
 *      children: children // rest of this.props.children
 *   }
 */
export function getSplitChildren(props: SplitChildrenProps): SplitChildrenResultType {
    let bgChildren: Array<React.ReactNode> = [];
    const children = React.Children.toArray(props.children);
    children.forEach((child, index) => {
        // @TODO get rid of any
        const c = <any>child;
        if (c.type && c.type.isParallaxBackground) {
            bgChildren = bgChildren.concat(children.splice(index, 1));
        }
    });
    return {
        bgChildren,
        children,
    };
}

export const getHasDynamicBlur = (blur: BlurProp) =>
    typeof blur === 'object' && blur.min !== undefined && blur.max !== undefined;

export const getBlurValue = (isDynamicBlur: boolean, blur: BlurProp, percentage: number) => {
    return isDynamicBlur
        ? (blur as DynamicBlurProp).min + (1 - percentage) * (blur as DynamicBlurProp).max
        : blur;
};

export function setBlur(node: HTMLElement, blur: number) {
    // eslint-disable-next-line no-param-reassign
    node.style.webkitFilter = `blur(${blur}px)`;
    // eslint-disable-next-line no-param-reassign
    node.style.filter = `blur(${blur}px)`;
}
