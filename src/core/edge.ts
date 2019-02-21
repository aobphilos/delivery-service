export class Edge {
  constructor(public srcIdx: number
    , public dstIdx: number
    , public weight: number) {
  }

  either() {
    return this.srcIdx;
  }
  other(buffer: number) {
    return buffer == this.srcIdx ? this.dstIdx : this.srcIdx;
  }
  from() {
    return this.srcIdx;
  }
  to() {
    return this.dstIdx;
  }
}
