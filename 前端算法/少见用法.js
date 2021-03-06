numbers = new Proxy(numbers, { // (*)
    set(target, prop, val) { // 拦截写入操作
      if (typeof val == 'number') {
        target[prop] = val;
        return true;
      } else {
        return false;
      }
    }
  });

dictionary = new Proxy(dictionary, {
    get(target, phrase) { // 拦截读取属性操作
        if (phrase in target) { //如果字典包含该短语
        return target[phrase]; // 返回译文
        } else {
        // 否则返回未翻译的短语
        return phrase;
        }
    }
});