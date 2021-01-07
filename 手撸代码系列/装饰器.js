@log()
class a {

};
function log(target) {
  target.prototype.logger = function(value) {
    console.log(value)
  }
}

// 带参数版本
@log(1)
class a {

};
function log(value1) {
  return function(target) {
    target.prototype.logger = function(value) {
      console.log(value1, value)
    }
  }
}

// 针对类属性，不带参数
class a {
    @obs
    b = 1;
  };
function obs(target, key, descriptor) {

}

// 带参数
class a {
    @obs(2)
    b = 1;
  };
function obs(value) {
    return function(target, key, descriptor) {

    }
}