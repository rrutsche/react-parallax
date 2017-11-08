export function isScrolledIntoView(element, useDOM) {
    if (!useDOM) {
        return false;
    }
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    return (
        (elementTop <= 0 && elementBottom >= 0) ||
        (elementTop >= 0 && elementBottom <= window.innerHeight) ||
        (elementTop <= window.innerHeight && elementBottom >= window.innerHeight)
    );
}

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

export function getNodeHeight(useDOM, parent) {
    if (!useDOM) {
        return 0;
    }

    if (!parent) {
        return getWindowHeight(useDOM);
    }

    return parent.clientHeight;
}

export function canUseDOM() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export function getPercentage(startpos, endpos, currentpos) {
    const distance = endpos - startpos;
    const displacement = currentpos - startpos;
    return displacement / distance || 0;
}

export function getRelativePosition(node, useDOM, parent) {
    if (!useDOM) {
        return 0;
    }
    const element = node;
    let y = Math.round(element.getBoundingClientRect().top);
    const parentHeight = getNodeHeight(useDOM);
    y = y > parentHeight ? parentHeight : y;

    return getPercentage(0, parentHeight, y);
}
