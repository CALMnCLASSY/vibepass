// Sometimes the debouncer function is already defined (e.g., if page includes lightbox.js) so we should always check
// the global namespace before defining it.
if (typeof debouncer === "undefined") {
	function debouncer(func, timeout) {
		var timeoutID,
			timeout = timeout || 200;
		return function () {
			var scope = this,
				args = arguments;
			clearTimeout(timeoutID);
			timeoutID = setTimeout(function () {
				func.apply(scope, Array.prototype.slice.call(args));
			}, timeout);
		};
	}
}
