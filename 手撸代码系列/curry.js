function curry(fn) {
    this.allArgs = [];
    let a = function() {
      const curArg = [].slice.call(arguments);
      if (curArg.length) {
        this.allArgs = allArgs.concat(curArg.slice(0, curArg.length));
        return a;
      } else {
        return fn.apply(this, allArgs)
      }
    }
    a.toString = function() {
      return fn.call(null, this.allArgs)
    }
    a.valueOf = function() {
      return fn.call(null, this.allArgs)
    }
    return a;
  }
  
  let add = curry(function() {
    return this.allArgs.reduce((all, cur) => {
      return all + cur;
    }, 0);
  })
  let a = add(2)(3,4)(2);
  console.log(a);

  function Toast(option){
    this.prompt = '';
  }
  Toast.prototype = {
    constructor: Toast,
    // 输出提示
    show: function(){
      console.log(this.prompt);
    }
  };
  
  // 新对象
  var obj = {
      prompt: '新对象'
  };
  
  function unCurry(fn) {
    return function() {
      let args = arguments;
      fn.apply(arguments[0], args);
    }
  }
  
  let x = unCurry(Toast.prototype.show);
  x(obj);