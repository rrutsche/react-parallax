/// <reference types="react" />
declare module "util/util" {
    import * as React from 'react';
    import { BlurProp } from "modules/Parallax";
    export function getWindowHeight(useDOM: boolean): number;
    export function isScrolledIntoView(element: HTMLElement, offset: number, useDOM: boolean): boolean;
    export function getNodeHeight(useDOM: boolean, node?: HTMLElement | Document): number;
    export function canUseDOM(): boolean;
    export function getPercentage(startpos: number, endpos: number, currentpos: number): number;
    export function getRelativePosition(node: HTMLElement, useDOM: boolean): number;
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
    export function getSplitChildren(props: SplitChildrenProps): SplitChildrenResultType;
    export const getHasDynamicBlur: (blur: BlurProp) => boolean;
    export const getBlurValue: (isDynamicBlur: boolean, blur: BlurProp, percentage: number) => BlurProp;
    export function setBlur(node: HTMLElement, blur: number): void;
}
declare module "modules/ParallaxChildren" {
    import React from 'react';
    export interface ParallaxChildrenProps {
        className?: string;
        children?: React.ReactNode;
        onMount(node: HTMLDivElement): void;
    }
    const ParallaxChildren: React.SFC<ParallaxChildrenProps>;
    export default ParallaxChildren;
}
declare module "modules/Parallax" {
    import React from 'react';
    import { SplitChildrenResultType } from "util/util";
    export type DynamicBlurProp = {
        min: number;
        max: number;
    };
    export type BlurProp = number | DynamicBlurProp;
    export type BgImageProp = string;
    export type BgImageSrcSetProp = string;
    export type BgImageSizesProp = string;
    type ParallaxProps = {
        bgClassName?: string;
        bgImageStyle?: {
            [key: string]: any;
        };
        blur?: BlurProp;
        children?: React.ReactNode;
        className?: string;
        contentClassName?: string;
        disabled?: boolean;
        bgImage?: BgImageProp;
        bgImageAlt?: string;
        bgImageSrcSet?: BgImageSrcSetProp;
        bgImageSizes?: BgImageSizesProp;
        bgStyle?: {
            [key: string]: any;
        };
        log?: boolean;
        parent?: HTMLElement;
        renderLayer?: (percentage: number) => any;
        strength?: number;
        style?: {
            [key: string]: any;
        };
    };
    type ParallaxState = {
        bgImage: string;
        bgImageSrcSet: string;
        bgImageSizes: string;
        bgStyle?: {
            [key: string]: any;
        };
        imgStyle: {
            [key: string]: any;
        };
        percentage: number;
    };
    class Parallax extends React.Component<ParallaxProps, ParallaxState> {
        bg: HTMLDivElement;
        canUseDOM: boolean;
        contentHeight: number;
        contentWidth: number;
        node: HTMLElement;
        content: HTMLElement;
        img: HTMLImageElement;
        splitChildren: SplitChildrenResultType;
        bgImageLoaded: boolean;
        bgImageRef: HTMLImageElement;
        parent: HTMLElement | Document;
        parentHeight: number;
        timestamp: number;
        isDynamicBlur: boolean;
        static defaultProps: {
            bgClassName: string;
            bgImageAlt: string;
            className: string;
            contentClassName: string;
            disabled: boolean;
            log: boolean;
            strength: number;
        };
        constructor(props: ParallaxProps);
        /**
         * bind some eventlisteners for page load, scroll and resize
         * save component ref after rendering, update all values and set static style values
         */
        componentDidMount(): void;
        componentDidUpdate(): void;
        /**
         * remove all eventlisteners before component is destroyed
         */
        componentWillUnmount(): void;
        /**
         * update window height and positions on window resize
         */
        onWindowResize: () => void;
        onWindowLoad: () => void;
        onScroll: () => void;
        onContentMount: (content: HTMLElement) => void;
        setBackgroundPosition(percentage: number): void;
        /**
         * sets position for the background image
         */
        setImagePosition(percentage: number, autoHeight?: boolean): void;
        /**
         * The image height depends on parallax direction. If strength value is negative we have to give it more height
         * so there is no white space at start/end of container visiblility.
         */
        getImageHeight(): number;
        /**
         * updates scroll position of this component and also its width and height.
         * defines, if the background image should have autoHeight or autoWidth to
         * fit the component space optimally
         */
        updatePosition: () => void;
        /**
         * Makes sure that the image was loaded before render
         */
        loadImage(bgImage: BgImageProp, bgImageSrcSet: BgImageSrcSetProp, bgImageSizes: BgImageSizesProp): void;
        /**
         * Unbind eventlistener of bg image and delete it
         */
        releaseImage(): void;
        addListeners(): void;
        removeListeners(): void;
        log(...args: any): void;
        render(): JSX.Element;
    }
    export default Parallax;
}
declare module "modules/Background" {
    import { Component } from 'react';
    export interface BackgroundProps {
        className?: string;
    }
    class Background extends Component<BackgroundProps, {}> {
        static defaultProps: {
            className: string;
        };
        static isParallaxBackground(): boolean;
        render(): JSX.Element;
    }
    export default Background;
}
declare module "modules/index" {
    import Parallax from "modules/Parallax";
    import Background from "modules/Background";
    export { Parallax, Background };
}
declare module "kitchensink/PageOne" {
    import React from 'react';
    type PageOneProps = {};
    type PageOneState = {
        BG: number;
        srcSet?: number;
    };
    export default class PageOne extends React.Component<PageOneProps, PageOneState> {
        srcSets: {
            [key: string]: string;
        };
        backgrounds: {
            [key: string]: string;
        };
        constructor(props: PageOneProps);
        toggleBackground: () => void;
        toggleSrcSet: () => void;
        render(): any;
    }
}
declare module "kitchensink/PageThree" {
    import React from 'react';
    type PageThreeProps = {};
    type PageThreeState = {
        theParentRef: HTMLDivElement | null;
    };
    export default class PageThree extends React.Component<PageThreeProps, PageThreeState> {
        constructor(props: PageThreeProps);
        onParentRefMounted(ref: HTMLDivElement): void;
        getParentRef(): HTMLDivElement;
        render(): any;
    }
}
declare module "kitchensink/PageTwo" {
    import React from 'react';
    type PageTwoProps = {};
    type PageTwoState = {
        image: string;
        children: React.ReactNode;
    };
    export default class PageTwo extends React.Component<PageTwoProps, PageTwoState> {
        constructor(props: PageTwoProps);
        changeImage(): void;
        changeChildren(): void;
        render(): any;
    }
}
declare module "kitchensink/index" { }
