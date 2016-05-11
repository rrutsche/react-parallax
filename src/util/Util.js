
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

export function getPosition(node, canUseDOM) {
	if (!canUseDOM) {
		return 0;
	}
	let element = node;
	let height = node.getBoundingClientRect().height;
    let y = 0;
  
    while(element) {
        y += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    y = y > window.innerHeight ? window.innerHeight : (y < (-height) ? 0 : y);
    // this is a value between 0 - 1 where 0 is top and 1 is bottom of the screen
    let relativePosition = y / window.innerHeight;
    // the relative anchor represents the relative position on screen including the DOMNode heigth
    // so value does not get 0 before bottom of element reaches top of the screen
    let relativeAnchor = relativePosition + ((1 - relativePosition) * height / window.innerHeight);

    return relativeAnchor;
}