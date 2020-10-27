import { ReactNode, Children } from 'react';
import { BlurProp, DynamicBlurProp, SplitChildrenResultType } from '../../@types';
import { getNodeHeight } from './dom';

export function getPercentage(startpos: number, endpos: number, currentpos: number) {
    const distance = endpos - startpos;
    const displacement = currentpos - startpos;
    return displacement / distance || 0;
}

export function getRelativePosition(node: HTMLElement, useDOM: boolean) {
    if (!useDOM) {
        return 0;
    }
    const { top, height } = node.getBoundingClientRect();
    const parentHeight = getNodeHeight(useDOM);
    const maxHeight = height > parentHeight ? height : parentHeight;
    const y = Math.round(top > maxHeight ? maxHeight : top);

    return getPercentage(0, maxHeight, y);
}

interface SplitChildrenProps {
    children?: ReactNode;
}

/**
 * Extracts children with type Background from others and returns an object with both arrays:
 *  {
 *      bgChildren: bgChildren, // typeof child === 'Background'
 *      children: children // rest of this.props.children
 *   }
 */
export function getSplitChildren(props: SplitChildrenProps): SplitChildrenResultType {
    let bgChildren: Array<ReactNode> = [];

    const children = Children.toArray(props.children);
    children.forEach((child, index) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = child as any;
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
