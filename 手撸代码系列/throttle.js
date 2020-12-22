//  核心两个问题，第一次是否触发，结束后是否触发

// function throttle(fn, delay) {
//   let lastStm;
//   const tfn = function() {
//     const args = arguments;
//     const context = this;
//     const currentStm = new Date().valueOf();
//     if (!lastStm || (currentStm - lastStm > delay)) {
//       lastStm = currentStm;
//       fn.apply(context, args);
//     }
//   }
//   return tfn;
// }
// function throttle(fn, delay) {
//   let timer;
//   const tfn = function() {
//     const args = arguments;
//     const context = this;
//     if (timer) {
//       return;
//       //clearTimeout(timer);
//     }
//     timer = setTimeout(function() {
//       fn.apply(context, args);
//       clearTimeout(timer);
//       timer = null;
//     }, delay)
//   }
//   return tfn;
// }
const global = +new Date();
function throttle(fn, delay, option = {}) {
    let lastStm, timer;
    const tfn = function() {
      const args = arguments;
      const context = this;
      const currentStm = new Date().valueOf();
      if (!lastStm && !option.leading) {
        lastStm = currentStm;
      }
      const remain = delay - (currentStm - lastStm);
      console.log(remain, 'remain')
      if (currentStm - lastStm > delay) {
        lastStm = currentStm;
        console.log(currentStm - global, '1');
        fn.apply(context, args);
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      } else if (!timer && option.tailing !== false) {
        timer = setTimeout(function() {
          lastStm = +new Date();
          console.log(lastStm - global, '2');
          fn.apply(context, args);
          clearTimeout(timer);
          timer = null;
        }, remain)
      }
    }
    tfn.cancel = function() {
      timer && clearTimeout(timer);
      timer = null;
      currentStm = 1;
    }
    return tfn;
}
let a = throttle((ar) => console.log(ar), 1000, { leading: true });
a(0);
setTimeout(() => a(500), 500);
setTimeout(() => a(1200), 1200);
setTimeout(() => a(1900), 1900);