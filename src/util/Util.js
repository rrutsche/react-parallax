
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

export function canUseDOM() {
	return !!((typeof window !== 'undefined' && window.document && window.document.createElement));
}

export function getRelativePosition(node, canUseDOM) {
	if (!canUseDOM) {
		return 0;
	}
	let element = node;
	let height = node.getBoundingClientRect().height;
    let y = Math.round(element.getBoundingClientRect().top);

    y = y > window.innerHeight ? window.innerHeight : y;

    return getPercentage(0, window.innerHeight, y);

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
	console.log('hello')
	switch(style.property) {
		case 'blur':
			node.style.filter = 'blur(' + value + (style.unit || 'px') + ')';
	}
}
