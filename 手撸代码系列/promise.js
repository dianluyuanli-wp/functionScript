function myP(executor) {
    let self = this;
    self.status = 'pending';
    self.success = undefined;
    self.error = undefined;
    self.successCBList = [];
    self.errorCBList = [];
    function res(x) {
      if (self.status === 'pending') {
        self.success = x;
        self.status = 'resolved';
        self.successCBList.forEach(element => {
          element(x);
        });
      }
    }
    function rej(e) {
      if (self.status === 'pending') {
        self.error = e;
        self.status = 'rejected';
        self.errorCBList.forEach(element => {
          element(e);
        })
      }
    }
    executor(res, rej);
  }
  
  //  pro是是外层new的promise
  function resolveAnoP(pro, ans, res, rej) {
    if (pro === ans) {
      rej(new Error('循环调用'))
    }
    //  看看上层resolve的是否是promise
    if (ans && (typeof ans === 'Object' || typeof ans === 'function')) {
      try {
        let then = ans.then;
        if (typeof then === 'function') {
          //  绑定上级返回的promise
          then.call(ans, result => {
            // 自己造的pro，和自己造的res和rej一直透传，在恰当的时候解掉，如果外围一直有promise，要一直递归直到非promise
            //  result是最近一次promise resolve出来的结果
            resolveAnoP(pro, result, res, rej);
          }, (e) => {
            rej(e)
          })
        } else {
          res(ans);
        }
      } catch (e) {
        //  有error的话reject
        rej(e)
      }
    } else {
      //  如果是普通值直接resolve
      res(ans);
    }
  }
  
  myP.prototype.then = function(onRes, onRej) {
    // if (this.status === 'resolved') {
    //   onRes(this.success);
    // }
    // if (this.status === 'rejected') {
    //   onRej(this.error)
    // }
    // if (this.status === 'pending') {
    //   this.successCBList.push(onRes);
    //   this.errorCBList.push(onRej);
    // }
    let me = this;
    let anoMyp = new myP((res, rej) => {
      if (me.status === 'resolved') {
        let ans = onRes(me.success);
        resolveAnoP(anoMyp, ans, res, rej);
      }
      if (me.status === 'rejected') {
        let err = onRej(me.error);
        resolveAnoP(anoMyp, err, res, rej)
      }
      if (me.status === 'pending') {
        me.successCBList.push(() => {
          let ans = onRes(me.success);
          resolveAnoP(anoMyp, ans, res, rej);
        })
        me.errorCBList.push(() => {
          let err = onRej(me.error);
          resolveAnoP(anoMyp, err, res, rej)
        })
      }
    })
    return anoMyp;
  };
  let x = new myP((res, rej) => {
    setTimeout(() => {
      res(5)
    }, 2000);
  });
  const xx = x.then((x) => {
    console.log(x);
    return x;
  }, (e) => {
    console.log(e);
  }).then(a => {
    console.log('第二次操作', a);
    return a;
  }).then(a => {
    console.log('第三次操作', a);
    return a;
  });
  console.log(xx);