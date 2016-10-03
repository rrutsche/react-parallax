
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
	let range = height
    let y = 0;
  
    while(element) {
        y += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    y = y > window.innerHeight ? window.innerHeight : (y < (-height) ? -height : y);

	// just for testing start
	// let point = document.getElementById('point');
	// if (!point) {
	// 	point = document.createElement('div');
	// 	point.id = 'point';
	// 	point.style.position = 'fixed';
	// 	point.style.left = 0;
	// 	point.style.width = '10px';
	// 	point.style.height = '10px';
	// 	point.style.backgroundColor = 'red';
	// 	node.appendChild(point);
	// }
	// point.style.top = getPercentage(-height, window.innerHeight, y) * window.innerHeight + 'px';
	// just for testing end

    return getPercentage(-height, window.innerHeight, y);

}

export function getPercentage(startpos, endpos, currentpos) {
     let distance = endpos - startpos;
     let displacement = currentpos - startpos;
     return displacement / distance;
}