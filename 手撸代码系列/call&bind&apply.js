Function.prototype.myCall = function(ctx) {
  if (typeof this !== 'function') {
      throw '请在函数上调用'
  }
  let context = ctx || window;
  let fn = this;
  context.fn = fn;
  let arg = [...arguments].slice(1);
  let res = context.fn(...arg);
  delete context.fn;
  return res;
}

Function.prototype.myApply = function(ctx) {
  if (typeof this !== 'function') {
      throw '请在函数上调用'
  }
  let context = ctx || window;
  let fn = this;
  context.fn = fn;
  let arg = [...arguments].slice(1);
  let res;
  if (arg.length) {
    res = context.fn(...arg[0]);
  } else {
    res = context.fn();
  }
  delete context.fn;
  return res;
}

Function.prototype.myBind = function(ctx) {
  if (typeof this !== 'function') {
      throw '请在函数上调用'
  }
  let arg = [...arguments].slice(1);
  let fn = this;
  const context = [...arguments][0]
  function F() {
    let arg2 = [...arguments]
    if (fn instanceof F) {
      return fn(arg.concat(arg2))
    } else {
      return fn.myApply(context, arg.concat(arg2))
    }
  }
  return F;
}