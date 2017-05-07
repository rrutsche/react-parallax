
export function isScrolledIntoView(element, canUseDOM) {
	if (!canUseDOM) {
		return false;
	}
	let elementTop = element.getBoundingClientRect().top,
		elementBottom = element.getBoundingClientRect().bottom;
	return elementTop <= 0 && elementBottom >= 0 ||
			elementTop >= 0 && elementBottom <= window.innerHeight ||
			elementTop <= window.innerHeight && elementBottom >= window.innerHeight;
}

export function getWindowHeight(canUseDOM) {
	if (!canUseDOM) {
		return 0;
	}

	let w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0];

	return w.innerHeight || e.clientHeight || g.clientHeight;
}

export function getNodeHeight(canUseDOM, parent) {
	if (!canUseDOM) {
		return 0;
	}

	if (!parent) {
		return getWindowHeight(canUseDOM);
	}

	return parent.clientHeight;
}

export function canUseDOM() {
	return !!((typeof window !== 'undefined' && window.document && window.document.createElement));
}

export function getRelativePosition(node, canUseDOM, parent) {
	if (!canUseDOM) {
		return 0;
	}
	let element = node;
    let y = Math.round(element.getBoundingClientRect().top);
    const parentHeight = getNodeHeight(canUseDOM);
    y = y > parentHeight ? parentHeight : y;

    return getPercentage(0, parentHeight, y);

}

export function getPercentage(startpos, endpos, currentpos) {
     let distance = endpos - startpos;
     let displacement = currentpos - startpos;
     return displacement / distance;
}

export function setStyleProp(node, style, value, canUseDOM) {
	if (!canUseDOM) {
		return;
	}

	switch(style.property) {
		case 'blur':
			node.style.filter = 'blur(' + value + (style.unit || 'px') + ')';
	}
}
