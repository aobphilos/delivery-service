import { EdgeType } from '../enum/edge-type';

export class Edge {

  constructor(labelFrom: string
    , labelTo: string
    , public weight: number
    , public srcIdx: number = 0
    , public dstIdx: number = 0) {
    this.srcIdx = EdgeType[labelFrom];
    this.dstIdx = EdgeType[labelTo];
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
  labelFrom() {
    return EdgeType[this.srcIdx];
  }
  labelTo() {
    return EdgeType[this.dstIdx];
  }
}
