var f = {
    debounce: function (func, wait, immediate) {
        var timeout;
        return function() {
            var context = this;
            var later = function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, arguments)
                };
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, arguments)
            };
        };
    }
};
