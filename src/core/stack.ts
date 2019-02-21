export class StackNode<T> {
  constructor(public value: T, public next: StackNode<T> = null) { }
}

export class Stack<T> {

  constructor(public size: number = 0,
    public first: StackNode<T> = null) {
  }

  private _push(x: StackNode<T>, a: T) {
    if (x == null) {
      this.size++;
      return new StackNode<T>(a);
    }
    const oldX = x;
    this.size++;
    x = new StackNode<T>(a);
    x.next = oldX;
    return x;
  }

  push(a: T) {
    this.first = this._push(this.first, a);
  }

  pop() {
    if (this.first == null) {
      return undefined;
    }

    const oldFirst = this.first;
    const item = oldFirst.value;
    this.first = oldFirst.next;
    this.size--;

    return item;
  }

  isEmpty() {
    return this.size == 0;
  }

  peep() {
    if (this.first == null) {
      return undefined;
    }

    return this.first.value;
  }

  toArray() {
    const result = [];
    let x = this.first;
    while (x != null) {
      result.push(x.value);
      x = x.next;
    }
    return result;
  };
}