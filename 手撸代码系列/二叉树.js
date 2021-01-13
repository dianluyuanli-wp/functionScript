class BinaryTree {
    constructor(list = []) {
      this.root = null;
      if (typeof list === 'number') {
        this.insertNode(this.root, this.createNode(list))
      } else if (list instanceof Array) {
        this.insertArray(list);
      } else {
        alert('请输入数字或数组')
      }
    }
    createNode(value) {
      let a = Object.create(null, {});
      a.left = null;
      a.right = null;
      a.value = value;
      return a;
    }
    insertNode(node, insertN) {
      if (!this.root) {
        this.root = insertN;
        return;
      }
      if (node.value > insertN.value) {
        if (!node.left) {
          node.left = insertN
        } else {
          this.insertNode(node.left, insertN)
        }
      } else {
        if (!node.right) {
          node.right = insertN
        } else {
          this.insertNode(node.right, insertN)
        }
      }
    }
    insertArray(arr) {
      arr.forEach(item => {
        this.insertNode(this.root, this.createNode(item))
      })
    }
    showTree() {
      return this.root;
    }
    // 递归中序
    inOrder(node, cb) {
        if (node.left) {
        this.inOrder(node.left, cb)
        }
        cb(node);
        if (node.right) {
        this.inOrder(node.right, cb)
        }
    }
    // 递归前序
    preOrder(node,cb) {
        cb(node);
        if (node.left) {
        this.preOrder(node.left, cb)
        }
        if (node.right) {
        this.preOrder(node.right, cb)
        }
    }
    // 递归后续
    postOrder(node,cb) {
        if (node.left) {
        this.postOrder(node.left, cb)
        }
        if (node.right) {
        this.postOrder(node.right, cb)
        }
        cb(node);
    }
    // 中序非递归
    iOFor(node, cb) {
        let res = [];
        let originNode = node;
        while(true) {
        while(originNode) {
            res.push(originNode);
            originNode = originNode.left;
        }
        if (res.length === 0) {
            break;
        }
        originNode && cb(originNode);
        let temp = res.pop();
        cb(temp);
        originNode = temp.right;
        }
    }
    // 先序非递归
    pOFor(node, cb) {
        let res = [];
        while(true) {
        //node && cb(node);
        while(node) {
            cb(node);
            res.push(node.right);
            node = node.left;
        }
        if (!res.length) {
            break;
        }
        let temp = res.pop();
        node = temp;
        }
    }
    // 后续非递归
    postOFor(node, cb) {
        let res = [], nodeList = [];
        while(true) {
        while(node) {
            nodeList.push(node);
            res.push(node.left);
            node = node.right;
        }
        if (!res.length) {
            break;
        }
        let temp = res.pop();
        node = temp;
        }
        nodeList.reverse().forEach(cb);
    }
    findNode(node, target) {
      if (!node) {
        return null
      }
      if (node.value < target) {
        return this.findNode(node.right, target)
      } else if (node.value > target) {
        return this.findNode(node.left, target)
      } else {
        return node;
      }
    }
    max() {
      let node = this.root;
      while(node.right) {
        node = node.right;
      }
      return node.value;
    }
    min() {
      let node = this.root;
      while(node.left) {
        node = node.left;
      }
      return node.value;
    }
    remove(rootN, target) {
      // 这样有问题，应为targetN赋值的时候，只是内存指向了null(targetN是一个新的副本，只是指向原来的节点，)
      //  修改指向的话，原来的指向并不会改变
      // let targetN = this.findNode(rootN, target);
      // if (!targetN) {
      //   return null;
      // }
      // if (targetN.left === null && targetN.right === null) {
      //   targetN = null;
      // } else if(targetN.left === null && targetN.right) {
      //   targetN = targetN.right;
      // } else if (targetN.right === null && targetN.left) {
      //   targetN = targetN.left
      // } else {
      //   let tn = targetN.right;
      //   while(tn.left) {
      //     tn = tn.left;
      //   }
      //   targetN.value = tn.value;
      //   this.remove(targetN.right, tn.value);
      // }
      const removeNode = (node, value) => {
        if (!node) {
          return node;
        }
        if (node.value < value) {
          node.right = removeNode(node.right, value);
          return node;
        } else if(node.value > value) {
          node.left = removeNode(node.left, value);
          return node;
        } else {
          if (!node.left && !node.right) {
            node = null;
            return node;
          } else if (node.left && !node.right) {
            node = node.left;
            return node;
          } else if (node.right && !node.left) {
            node = node.right;
            return node;
          } else {
            let tn = node.right;
            while(tn.left) {
              tn = tn.left;
            }
            node.value = tn.value;
            node.right = removeNode(node.right, tn.value);
            return node;
          }
        }
      }
      this.root = removeNode(rootN, target);
    }
  }
  let nodes = [8,3,6,4,9,11,2,5,7];
  let binaryTree = new BinaryTree(nodes);
  let tree = binaryTree.showTree();
  binaryTree.remove(binaryTree.root, 6);
  console.log(binaryTree.showTree(), '111')

//  递归计算最大深度
function getDeep(node) {
    if (!node) {
        return 0;
    }
    return Math.max(getDeep(node.left), getDeep(node.right)) + 1;
}

// 找到所有路径和为某个值的路径
function fr(node, target) {
    let res = [];
    function findr(node, path) {
      if (!node) {
        return;
      }
      if (!node.left && !node.right) {
        sum = path.reduce((old, item) => {
          return old + item.value
        }, 0) + node.value;
        if (sum === target) {
          path.push(node);
          res.push(path.slice());
        }
      } else {
        // let left1 = path.slice();
        // left1.push(node);
        path.push(node);
        findr(node.left, path.slice());
        findr(node.right, path.slice());
      }
    }
    findr(node, []);
    return res.map((item) => item.map(item => item.value));
}

  // https://juejin.cn/post/6844903507988840456#heading-3
  // https://juejin.cn/post/6844904082038063118#heading-9