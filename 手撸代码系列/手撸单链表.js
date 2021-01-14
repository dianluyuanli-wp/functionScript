class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  class List {
    constructor() {
      this.head = null;
      this.count = 0;
    }
    pushList(arr) {
      arr.forEach(item => this.pushNode(item));
    }
    pushNode(value) {
      let newNode = new Node(value);
      if (!this.head) {
        this.head = newNode
      } else {
        let curNode= this.head;
        while(curNode) {
          if (!curNode.next) {
            break;
          }
          curNode = curNode.next;
        }
        curNode.next = newNode;
      }
      this.count += 1;
    }
    insert(index, value) {
      let newNode = new Node(value);
      if (!this.head) {
        this.head = newNode
      } else {
        let curNode = this.head;
        let rank = 0;
        while(rank < index - 1) {
          curNode = curNode.next;
          rank++;
        }
        let next = curNode.next;
        curNode.next = newNode;
        newNode.next = next;
      }
      this.count += 1;
    }
    getElementAt(index) {
      let rank = 0;
      let curNode = this.head;
      while(rank < index) {
        curNode = curNode.next;
        rank++;
      }
      return curNode;
    }
    removeAt(index) {
      if (index < 0) return this.head;
      if (index) {
        let newNext = this.getElementAt(index).next;
        let target = this.getElementAt(index - 1);
        target.next = newNext;
      } else {
        this.head = this.head.next;
      }
      this.count -= 1;
      return this.head;
    }
    indexOf(value) {
      let rank = 0;
      let curNode = this.head;
      while(curNode) {
        if (curNode.value === value) {
          return rank;
        }
        if (!curNode.next) {
          break;
        }
        curNode = curNode.next;
        rank++;
      }
      return -1;
    }
    remove(value) {
      let rank = this.indexOf(value);
      this.removeAt(rank);
      this.count -= 1;
      return this.head;
    }
  }
  let aa = new List();
  aa.pushList([1,2,34,5]);
  // 单链表反序
  // 核心是要分清楚引用和真实的节点的区别
  function reverseList(node) {
    let ano = null;
    while(node) {
      if (!node.next) {
        node.next = ano;
        return node;
      }
      let temp = node.next;
      node.next = ano;
      ano = node;
      node = temp;
    }
  }
  console.log(reverseList(aa.head));