const myAll = function(arr) {
    let results = new Array(arr.length).fill(false);
    if (!arr.every(item => item && (typeof item === 'object' || typeof item === 'function'))) {
      throw Error('比如都是promise');
    }
    return new Promise((res, rej) => {
      arr.forEach((item, index) => {
        item.then(_ => {
          results[index] = _;
          if (results.every(item => item)) {
            res(results);
          }
        }, e => {
          rej(e)
        })
      })
    })
  }
  const myRace = function(arr) {
    if (!arr.every(item => item && (typeof item === 'object' || typeof item === 'function'))) {
      throw Error('比如都是promise');
    }
    return new Promise((res, rej) => {
      arr.forEach((item, index) => {
        item.then(_ => {
          res(_);
        }, e => {
          rej(e)
        })
      })
    })
  }
  let a1 = new Promise((res) => setTimeout(() => {
    console.log(2);
    res(2);
  }, 2000));
  let b = new Promise((res) => setTimeout(() => {
    console.log(4)
    res(4);
  }, 4000));
  async function test() {
    let a = await myRace([a1,b]);
    console.log(a);
  }
  test();