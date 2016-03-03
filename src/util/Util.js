
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

// export function getPosition(element, canUseDOM) {
// 	if (!canUseDOM) {
// 		return 0;
// 	}

// 	let elementTop = element.getBoundingClientRect().top;

// 	console.log(elementTop, element.offsetTop);
// }

export function getPosition(element) {
    var yPosition = 0;
  
    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    console.log(yPosition / window.innerHeight);
    return { y: yPosition };
}