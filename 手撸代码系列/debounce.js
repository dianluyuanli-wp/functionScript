//  核心是不停刷新timer
function debounce(fn, delay,immediate) {
    let timer, result;
    let a = function() {
      if (timer) {
        clearTimeout(timer);
      }
      let me = this;
      let args = arguments;
      if (immediate && !hasRun) {
        fn.apply(me, args);
        hasRun = true;
      } else {
        timer = setTimeout(function() {
          fn.apply(me, args);
        }, delay)
      }
    }
    a.cancel = function() {
      clearTimeout(timer);
      timer = null;
    }
    return a;
}