export const getWindowHeight = (useDOM: boolean): number => {
    if (!useDOM) {
        return 0;
    }
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];

    return w.innerHeight || e.clientHeight || g.clientHeight;
};

export const isScrolledIntoView = (element: HTMLElement, offset = 0, useDOM: boolean): boolean => {
    if (!useDOM) {
        return false;
    }
    const elementTop = element.getBoundingClientRect().top - offset;
    const elementBottom = element.getBoundingClientRect().bottom + offset;
    return elementTop <= getWindowHeight(useDOM) && elementBottom >= 0;
};

export const getNodeHeight = (useDOM: boolean, node?: HTMLElement | Document): number => {
    if (!useDOM) {
        return 0;
    }

    if (!node || !('clientHeight' in node)) {
        return getWindowHeight(useDOM);
    }

    return node.clientHeight;
};

export const canUseDOM = (): boolean => {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};
