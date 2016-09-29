
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
	let range = height
    let y = 0;
  
    while(element) {
        y += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    y = y > window.innerHeight ? window.innerHeight : (y < (-height) ? -height : y);

    return getPercentage(-height, window.innerHeight, y);

 //    // this is a value between 0 - 1 where 0 is top and 1 is bottom of the screen
 //    let relativePosition = y / window.innerHeight;
 //    // the relative anchor represents the relative position on screen including the DOMNode height
 //    // so value does not get 0 before bottom of element reaches top of the screen
 //    // let relativeAnchor = relativePosition + ((1 - relativePosition) * height / window.innerHeight);
 //    let relativeAnchor = height - (relativePosition * height);

	// 	// just for testing start
	// 	let point = document.getElementById('point');
	// 	if (!point) {
	// 		point = document.createElement('div');
	// 		point.id = 'point';
	// 		point.style.position = 'absolute';
	// 		point.style.left = 0;
	// 		point.style.width = '10px';
	// 		point.style.height = '10px';
	// 		point.style.backgroundColor = 'red';
	// 		node.appendChild(point);
	// 	}
	// 	// point.style.top = relativeAnchor + 'px';
	// 	// just for testing end
	// // console.log('__', relativePosition );
 //    return relativeAnchor;
}

export function getPercentage(startpos, endpos, currentpos) {
     let distance = endpos - startpos;
     let displacement = currentpos - startpos;
     return displacement / distance;
}