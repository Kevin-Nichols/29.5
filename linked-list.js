/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if(this.head === null){
      this.head = newNode;
      this.tail = this.head;
    }

    if(this.tail !== null){
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if(this.head === null){
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    if(this.length === 0) this.tail - this.head;
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getIdx(idx) gets node at idx provided. */
  getIdx(idx){
    let count = 0;
    let node = this.head;

    while(count != idx && node !== null){
      count += 1;
      node = node.next;
    }
    return node;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if(idx < 0 || idx >= this.length){
      throw new Error('Index does not exist')
    }
    return this.getIdx(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if(idx < 0 || idx >= this.length){
      throw new Error('Index does not exist')
    }
    let currentIdx = this.getIdx(idx);
    currentIdx.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if(idx < 0 || idx >= this.length){
      throw new Error('Index does not exist')
    }
    if(idx === this.length){
      return this.push(val);
    }
    if(idx === 0){
      return this.unshift(val);
    }

    let before = this.getIdx(idx -1);
    let newNode = new Node(val);

    newNode.next = before.next;
    before.next = newNode;
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if(idx < 0 || idx >= this.length){
      throw new Error('Index does not exist')
    }

    //Removes node if at first index.
    if(idx === 0){
      let headVal = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      if(this.length < 2){
        this.tail = this.head;
      }
      return headVal;
    }

    let before = this.getIdx(idx - 1);
    let beforeVal = before.next.val;

    //Removes node if at last index.
    if(idx === this.length - 1){
      let beforeVal = before.next.val;
      before.next = null;
      this.tail = before;
      this.length -= 1;

      return before;
    }

    //Removes node if between first index and last index.
    before.next = before.next.next;
    this.length -= 1;

    return beforeVal;
  }

  /** average(): return an average of all values in the list */

  average() {
    if(this.length === 0){
      return 0;
    }

    let sum = 0;
    let val = this.head;

    while(val){
      sum += val.val;
      val = val.next;
    }
    return sum / this.length;
  }
}

module.exports = LinkedList;
