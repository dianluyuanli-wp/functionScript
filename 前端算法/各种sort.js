// 快速排序
function sort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    if (arr.length === 2) {
      let firstIsBig = arr[0] > arr[1];
      return firstIsBig ? [arr[1], arr[0]] : arr;
    }
    let mid = arr[0];
    let lP = [];
    let rP = [];
    for (let i = 1; i<arr.length; i++) {
      let value = arr[i];
      if (value < mid) {
        lP.push(value)
      } else {
        rP.push(value);
      }
    }
    return sort(lP).concat(mid).concat(sort(rP))
  }

// 冒泡
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

// 归并排序
function merge(arr1, arr2 = []) {
    let newArr = [];
    let a1p = 0, a2p = 0;
    let a1l = arr1.length, a2l = arr2.length;
    while(a1p < a1l && a2p < a2l) {
      let v1 = arr1[a1p], v2 = arr2[a2p];
      if (v1 <= v2) {
        newArr.push(v1);
        a1p += 1;
      } else {
        newArr.push(v2);
        a2p += 1;
      }
    }
    if (a1p === a1l) {
      newArr = newArr.concat(arr2.slice(a2p))
    } else {
      newArr = newArr.concat(arr1.slice(a1p))
    }
    return newArr;
}
  
function guibing(arr) {
    let allG = arr.map(item => [item]);
    while (allG.length > 1) {
        let newG = []
        for (let i =0; i<allG.length; i +=2) {
        newG.push(merge(allG[i], allG[i+1]));
        }
        allG = newG;
    }
    return allG[0];
}


// 堆排序，用数组模拟堆（优先队列）
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
function heapify(arr, rank, length) {
    let father = arr[rank],leftChild = arr[rank * 2 + 1], rightChild = arr[rank * 2 + 2];
    if (father < leftChild && length > rank * 2 + 1) {
        swap(arr, rank, rank * 2 + 1);
        father = leftChild;
    }
    if (father < rightChild && length > rank * 2 + 2) {
        swap(arr, rank, rank * 2 + 2);
    }
}
  
//  从小到大,堆顶(ar[0])最大
function heapsort(arr) {
    for(let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
        heapify(arr, i, arr.length);
    }
    for (let i = 0; i<arr.length - 1; i++) {
        swap(arr, 0, arr.length - i - 1);
        for(let j = Math.floor((arr.length - i - 1) / 2 - 1); j >= 0; j--) {
        heapify(arr, j, arr.length - i - 1);
        }
    }
    return arr;
}
// 堆排序结束 

// 选择排序 从小到大
function select(arr) {
    for(let i=0; i<arr.length; i++) {
      let min = Infinity, rank = i;
      for(j = i; j<arr.length; j++) {
        if (arr[j] < min) {
          min = arr[j];
          rank = j;
        }
      }
      let temp = arr[i];
      arr[i] = min;
      arr[rank] = temp;
    }
    return arr;
}

// 插入排序
function insert(arr) {
    let newArr = [arr[0]];
    for(let i = 1; i < arr.length; i++) {
      for(let j = newArr.length - 1; j >= 0 ; j--) {
        if (arr[i] < newArr[j]) {
          if (j === 0) {
            newArr.unshift(arr[i]);
            break;
          }
          continue;
        }
        newArr.splice(j + 1, 0, arr[i])
        break
      }
    }
    return newArr;
}

//  计数排序
function buekt(arr) {
    let max = -Infinity, min = Infinity;
    for(let i = 0; i < arr.length; i++) {
      if (max < a[i]) {
        max = a[i]
      }
      if (min > a[i]) {
        min = a[i]
      }
    }
    let keng = new Array(max - min + 1).fill(0);
    for(let i = 0; i < arr.length; i++) {
      let value = arr[i]
      keng[value - min] += 1;
    }
    let newArr = [];
    keng.forEach((item, index) => {
      if(item !== 0) {
        let xx = new Array(item).fill(index + min);
        newArr = newArr.concat(xx)
      }
    })
    return newArr;
}