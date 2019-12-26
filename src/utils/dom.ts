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
