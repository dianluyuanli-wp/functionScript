// 判断回文
// 字符串没有reverse方法
function isHui(str) {
    return str === str.split().reverse().join('');
}

// 去重
function noRepeat(arr) {
    let b = [];
    for (let i = 0; i < arr.length; i++) {
        if (!b.includes(arr[i])) {
            b.push(arr[i])
        }
    }
    let a = new Set(arr);
    return Array.from(a);
}

// 一个字符串中出现最多字母
// 万一有两个呢？
function findMaxChar(str) {
    let map = {};
    let maxChars = [];
    let maxNum = 0;
    for (let i = 0; i < str.length; i++) {
        let key = str[i];
        if (!map[key]) {
            map[key] = 1;
        } else {
            map[key] += 1; 
        }
        if (map[key] === maxNum) {
            maxChars.push(key);
            break;
        }
        if (map[key] > maxNum) {
            maxChars = [key];
            maxNum = map[key];
        }
    }
    return maxChars
}

// 排序算法
function mySort(arr) {
    //  return arr.sort((a, b) => a - b >= 0);
    //  冒冒泡,从小到大
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] < arr[j - 1]) {
                let temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

// 不申请内存，交换变量
function swap(a, b) {
    a = a - b;
    b = (b + a);
    a = b - a;
    return [a, b];
}

// 生成斐波那契数列
function feibo(tn) {
    let res = new Array(tn);
    function getNum(n) {
        let sum;
        if (n === 0 || n === 1) {
            sum = 1;
            res[n] = 1;
            return 1
        }
        sum = getNum(n - 2) + getNum(n - 1);
        res[n] = sum;
        //res.push(sum);
        return sum;
    }
    getNum(tn);
    return res;
}

//  循环版本实现
function fb2(n) {
    let arr = [];
    let i = 0;
    while(i < n) {
      if ([0, 1].includes(i)) {
        arr[i] = 1;
      } else {
        arr[i] = arr[i-1] + arr[i-2]
      }
      i++;
    }
    return arr;
}

// 找到数组中的最大最小之差
function findMinus(arr) {
    let max = arr[0], min = arr[0];
    for (let i = 0; i < arr.length; i++) {
        let value = arr[i];
        if (value > max) {
            max = value;
            break;
        }
        if (value < min) {
            min = value;
        }
    }
    return max - min;
}

// 罗马数字映射
let map = {
    I: 1, V: 5, X: 10, L:50,C:100,D:500,M:1000
  }
  let s = 'MCMXCIV';
  let sum = 0;
  for(let i = 0; i<s.length; i++){
    let num = map[s[i]];
    if(i<s.length - 1 && num<map[s[i+1]]) {
      sum -= num;
    } else {
      sum += num;
    }
  }
console.log(sum);

// 手写observe
let obj = {
    a: 1,
    b: {
      a: 2
    },
    c: [1,2,3]
  };
  function observe(obj) {
    for(let key in obj) {
      // 必须提前处理，否则会递归报错
      let trValue = obj[key];
      if (obj.hasOwnProperty(key)) {
        // Object.defineProperty(obj, key, {
        //     get() {
        //       return trValue;
        //     },
        //     set(value) {
        //       console.log('1', value);
        //       return value;
        //     }
        // })
        if (typeof obj[key] !== 'object') {
          Object.defineProperty(obj, key, {
            get() {
              return trValue;
            },
            set(value) {
              console.log('1', value);
              return value;
            }
          })
        } else {
          observe(obj[key])
        }
      }
    }
  }
  observe(obj);
  obj.a = 10;
  console.log(obj.c[2], '11');
  obj.c[0] = 2;
  console.log(obj);
