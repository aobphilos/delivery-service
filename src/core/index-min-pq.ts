export class IndexMinPQ {

  constructor(public size: number,
    public compare = (a: number, b: number) => a - b,
    public keys: Array<number> = [],
    private pq: Array<number> = [],
    private qp: Array<number> = []) {

    for (let i = 0; i <= this.size; ++i) {
      this.keys.push(null);
      this.pq.push(0);
      this.qp.push(-1);
    }

    this.size = 0;
  }

  less(a1: number, a2: number,
    compare: (b1: number, b2: number) => number) {
    return compare(a1, a2) < 0;
  }

  exchange(list: Array<number>, srcIdx: number, dstIdx: number) {
    let temp = list[srcIdx];
    list[srcIdx] = list[dstIdx];
    list[dstIdx] = temp;
  }

  insert(index: number, key: number) {
    this.keys[index] = key;
    this.pq[++this.size] = index;
    this.qp[index] = this.size;
    this.swim(this.size);
  }

  decreaseKey(index: number, key: number) {
    if (this.less(key, this.keys[index], this.compare)) {
      this.keys[index] = key;
      this.swim(this.qp[index]);
    }
  }

  minKey() {
    return this.keys[this.pq[1]];
  }

  min() {
    return this.pq[1];
  }

  delMin() {
    let key = this.pq[1];
    this.exchange(this.pq, 1, this.size);
    this.qp[this.pq[1]] = 1;

    this.qp[this.pq[this.size]] = -1;
    this.keys[this.pq[this.size]] = null;

    this.size--;
    this.sink(1);
    return key;
  }

  swim(key: number) {
    while (key > 1) {
      let parent = Math.floor(key / 2);
      if (this.less(this.keys[this.pq[key]], this.keys[this.pq[parent]], this.compare)) {
        this.exchange(this.pq, key, parent);
        this.qp[this.pq[key]] = key;
        this.qp[this.pq[parent]] = parent;
        key = parent;
      } else {
        break;
      }
    }
  }

  sink(key: number) {
    while (2 * key <= this.size) {
      let child = key * 2;
      if (child < this.size && this.less(this.keys[this.pq[child + 1]], this.keys[this.pq[child]], this.compare)) {
        child++;
      }
      if (this.less(this.keys[this.pq[child]], this.keys[this.pq[key]], this.compare)) {
        this.exchange(this.pq, key, child);
        this.qp[this.pq[key]] = key;
        this.qp[this.pq[child]] = child;
        key = child;
      } else {
        break;
      }
    }
  }

  containsIndex(idx: number) {
    return this.qp[idx] != -1;
  }

  isEmpty() {
    return this.size == 0;
  }

}