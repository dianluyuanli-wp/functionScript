//  核心是不停刷新timer
function debounce(fn, delay,immediate) {
    let timer, result;
    function a() {
      const context = this;
      if (timer) {
        clearTimeout(timer);
      }

      if (immediate) {
        const callNow = !timer;
        // 立即执行
        if (callNow) {
          // 保留返回值，因为第一次时立即执行，需要返回，后续注定是异步，注定返回undefined
          result = fn.apply(context, args);
        }
        if (!timer) {
          timer = setTimeout(function() {fn.apply(context, args)}, delay);
        }
      } else {
        timer = setTimeout(function() {
          fn.apply(this, args)
        }, delay);
      }
      return result;
    }
    a.cancel = function() {
      clearTimeout(timer);
      timer = null;
    }
    return a;
}