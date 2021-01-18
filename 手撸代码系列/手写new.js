function myNew(fn) {
    let args = [...arguments];
    let obj = Object.create(null, {});
    obj.__proto__ = fn.prototype;
    let ret = args[0].call(obj, ...args.slice(1))
    return (typeof ret === 'object' ? ret : obj);
  }