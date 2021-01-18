// 观察者
class Subject {
    constructor() {
      this.obs = [];
    }
    add(observer) {
      if (this.obs.includes(observer)) {
        console.log('已经添加')
      } else {
        this.obs.push(observer);
      }
    }
    remove(observer) {
      let rank = this.obs.indexOf(observer);
      if(rank === -1) {
        console.log('不存在')
      } else {
        this.obs.splice(rank, 1)
      }
    }
    notify() {
      this.obs.forEach(item => {
        item.update();
      })
    }
  }
  
  class Observer {
    constructor() {
  
    }
    update() {
      console.log(111);
    }
  }

  // 发布订阅
  class Publisher{
    constructor() {
      this.sub = {}
    }
    add(type, cb) {
      if(type in this.sub) {
        this.sub[type].push(cb)
      } else {
        this.sub[type] = [cb]
      }
    }
    dispatch(type, ...params) {
      this.sub[type].forEach(item => {
        item.call(this, ...params)
      })
    }
    remove(type, cb) {
      let rank = this.sub[type].indexOf(cb);
      this.sub[type].splice(rank, 1);
    }
  }

  // https://juejin.cn/post/6850418111486885902#heading-1