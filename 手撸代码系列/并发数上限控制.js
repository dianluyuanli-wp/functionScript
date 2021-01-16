async function test(value) {
    return new Promise(res => {
      setTimeout(() => {
        res(value);
      }, value);
    })
  }
  async function multiReq(arr, maxLimit) {
    let curNum = 0, results = [];
    return new Promise((res, rej) => {
      function next() {
        let snap = curNum;
        test(arr[curNum]).then(_ => {
          console.log(_, 'finish');
          results[snap] = _;
          if(curNum < arr.length) {
            next();
          } else if(results.length === arr.length) {
            res(results);
          }
        })
        curNum++;
      }
      while(curNum < maxLimit) {
        next();
      }
    })
  }
  async function wrap() {
    let a = await multiReq([1000, 3000, 2000, 1500, 4500], 3);
    console.log(a);
  }
  wrap();