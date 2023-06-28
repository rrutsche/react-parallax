import { ReactNode, Children } from 'react';
import { BlurProp, DynamicBlurProp, SplitChildrenResultType } from '../types';
import { getNodeHeight } from './dom';

export const getPercentage = (startpos: number, endpos: number, currentpos: number): number => {
    const distance = endpos - startpos;
    const displacement = currentpos - startpos;
    return displacement / distance || 0;
};

export const getRelativePosition = (node: HTMLElement, useDOM: boolean): number => {
    if (!useDOM) {
        return 0;
    }
    const { top, height } = node.getBoundingClientRect();
    const parentHeight = getNodeHeight(useDOM);
    const maxHeight = height > parentHeight ? height : parentHeight;
    const y = Math.round(top > maxHeight ? maxHeight : top);

    return getPercentage(0, maxHeight, y);
};

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
export const getSplitChildren = (props: SplitChildrenProps): SplitChildrenResultType => {
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
};

export const getHasDynamicBlur = (blur?: BlurProp): boolean =>
    typeof blur === 'object' && blur.min !== undefined && blur.max !== undefined;

export const getBlurValue = (
    isDynamicBlur: boolean,
    blur: BlurProp,
    percentage: number,
): BlurProp => {
    return isDynamicBlur
        ? (blur as DynamicBlurProp).min + (1 - percentage) * (blur as DynamicBlurProp).max
        : blur;
};

export const setBlur = (node: HTMLElement, blur: number): void => {
    // eslint-disable-next-line no-param-reassign
    node.style.webkitFilter = `blur(${blur}px)`;
    // eslint-disable-next-line no-param-reassign
    node.style.filter = `blur(${blur}px)`;
};
