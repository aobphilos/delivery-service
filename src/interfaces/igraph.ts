export interface IGraphCommon {
  getEdgeId(srcIdx: number, dstIdx: number): string;
  addEdge(srcIdx: number, dstIdx: number): void;
  vertices(idx: number): Array<Number>;
  edge(srcIdx: number, dstIdx: number): any;
}

export interface IGraph<T> {
  addEdge(edge: T): void;
  vertices(idx: number): Array<T>;
  edge(srcIdx: number, dstIdx: number): T;
}
