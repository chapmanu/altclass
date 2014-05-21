(function (ALTCLASS, DATA, CAPTURE, HAS_EVENT_LISTENER, MAP) {
	// every frame, find and enhance any [data-altclass] elements
	function onframe() {
		MAP.call(document.querySelectorAll('[' + DATA + ALTCLASS + ']'), function (element) {
			element[ALTCLASS] = element.getAttribute(DATA + ALTCLASS);

			element.removeAttribute(DATA + ALTCLASS);
		});

		setTimeout(onframe, 200);
	}

	// default altclass property
	Object.defineProperty(Element.prototype, ALTCLASS, {
		set: function (classNames) {
			init(this, classNames);
		}
	});

	// init altclass
	function init(element, source) {
		var breakpoints, className, iframe, iframeWindow, index, match;

		// on altclass iframe resize
		function onresize(width) {
			// get iframe width
			width = iframeWindow.innerWidth || document.documentElement.clientWidth;

			// create new class name
			className = MAP.call(breakpoints, function (breakpoint, classList) {
				classList = [];

				MAP.call(breakpoint, function (classNames, min) {
					if (min <= width) {
						classList = classNames;
					}
				});

				return classList.join(' ');
			}).join(' ');

			// conditionally write new class name
			if (className !== element.className) {
				element.className = className;
			}
		}

		// create and configure altclass iframe
		iframe = element.appendChild(document.createElement('iframe'));
		iframeWindow = iframe.contentWindow;

		// style iframe hidden from layout and without height
		iframe.style.cssText = 'border:0;clip:rect(0 0 0 0);height:0;left:0;position:absolute;top:0;width:100%;z-index:-1';

		// add iframe resize listener
		if (HAS_EVENT_LISTENER) {
			iframeWindow.addEventListener('resize', onresize);
		} else {
			iframeWindow.attachEvent('onresize', onresize);
		}

		// configure breakpoint classes
		function configure(source, breakpoint) {
			breakpoints = [[]];
			breakpoint = breakpoints[0];

			index = 0;

			// for each altclass part
			for (; (match = source.match(CAPTURE)); ) {
				// move to new min index
				if (match[1]) {
					index = parseFloat(match[1]);
				}

				// add new class name
				if (match[2]) {
					breakpoint[index] = breakpoint[index] || [];

					breakpoint[index].push(match[2]);
				}

				// add new breakpoint
				if (match[3]) {
					breakpoint = breakpoints[breakpoints.push([]) - 1];
				}

				// move to next class part
				source = source.slice(match[0].length);
			}

			// initialize altclass instance
			onresize();
		}

		// redefine altclass property
		Object.defineProperty(element, ALTCLASS, {
			get: function () {
				return source;
			},
			set: function (source) {
				configure(source);
			}
		});

		// configure altclass instance
		configure(source);
	}

	// initialize when document is ready
	if (HAS_EVENT_LISTENER) {
		document.addEventListener('DOMContentLoaded', onframe);
	} else document.attachEvent('onreadystatechange', function () {
		if (document.readyState[0] === 'c') {
			onframe();
		}
	});
})(
	'altclass',
	'data-',
	/^\s*(\d+)|^\s*(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)|^\s*(,)/, 
	'addEventListener' in this,
	[].map || function (callback) {
		for (var array = this, arrayB = [], index = 0, length = array.length, element; index < length; ++index) {
			element = array[index];

			if (element !== undefined) {
				arrayB.push(callback.call(window, array[index], index, array));
			}
		}

		return arrayB;
	}
);
