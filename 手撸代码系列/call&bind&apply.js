Function.prototype.myCall = function(incontext) {
    if (typeof this !== 'function') {
      throw '请在函数上调用'
    }
    const context = incontext || window;
    const fn = this;
    context.fn = fn;
    const args = [...arguments].slice(1);
    let res = context.fn(...args);
    delete context.fn;
    return res;
  }

  Function.prototype.myApply = function(incontext) {
    if (typeof this !== 'function') {
      throw '请在函数上调用'
    }
    const context = incontext || window;
    const fn = this;
    context.fn = fn;
    const args = [...arguments].slice(1);
    let res;
    if (arguments[1]) {
      res = context.fn(args);
    } else {
      res = context.fn()
    }
    delete context.fn;
    return res;
  }

  Function.prototype.myBind = function(incontext) {
    if (typeof this !== 'function') {
      throw '请在函数上调用'
    }
    const context = incontext || window;
    const _this = this;
    const outerArg = [...arguments].slice(1);
    return function F() {
      if (_this instanceof F) {
        //  因为bing只有第一次生效，所以要判断，如果上次是bind，那就不要再绑定context了
        return _this(arguments.contact(outerArg));
      }
      return _this.apply(incontext, arguments.contact(outerArg))
    }
  }