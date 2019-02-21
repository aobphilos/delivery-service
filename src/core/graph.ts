
import { IGraphCommon } from '../interfaces/igraph';
import { Edge } from './edge';

export class Graph implements IGraphCommon {

  constructor(public size: number
    , public verticesList: Array<Array<number>> = []
    , public edges: Array<Edge> = []) {
    for (let i = 0; i < this.size; ++i) {
      this.verticesList[i] = [];
    }
  }

  getEdgeId(srcIdx: number, dstIdx: number) {
    return (srcIdx > dstIdx) ? `${dstIdx}_${srcIdx}` : `${srcIdx}_${dstIdx}`;
  }

  addEdge(srcIdx: number, dstIdx: number) {
    this.verticesList[srcIdx].push(dstIdx);
    this.verticesList[dstIdx].push(srcIdx);
    const edge_id = this.getEdgeId(srcIdx, dstIdx);
    this.edges[edge_id] = new Edge(srcIdx, dstIdx, 0);
  }

  vertices(idx: number) {
    return this.verticesList[idx];
  }

  edge(srcIdx: number, dstIdx: number) {
    const edge_id = this.getEdgeId(srcIdx, dstIdx);
    if (edge_id in this.edges) {
      return this.edges[edge_id];
    }
    return null;
  }

}

export class DiGraph implements IGraphCommon {

  constructor(public size: number
    , public verticesList: Array<Array<number>> = []
    , public edges: Array<Edge> = []) {
    for (let i = 0; i < this.size; ++i) {
      this.verticesList[i] = [];
    }
  }

  getEdgeId(srcIdx: number, dstIdx: number) {
    return (srcIdx > dstIdx) ? `${dstIdx}_${srcIdx}` : `${srcIdx}_${dstIdx}`;
  }

  addEdge(srcIdx: number, dstIdx: number) {
    const edge_id = `${srcIdx}_${dstIdx}`;
    this.verticesList[srcIdx].push(dstIdx);
    this.edges[edge_id] = new Edge(srcIdx, dstIdx, 0);
  }

  edge(srcIdx: number, dstIdx: number) {
    const edge_id = `${srcIdx}_${dstIdx}`;
    if (edge_id in this.edges) {
      return this.edges[edge_id];
    } else {
      return null;
    }
  }

  vertices(idx: number) {
    return this.verticesList[idx];
  }

  reverse() {
    let g = new DiGraph(this.size);
    for (let srcIdx = 0; srcIdx < this.size; ++srcIdx) {
      let vertices = this.verticesList[srcIdx];
      for (let i = 0; i < vertices.length; ++i) {
        let dstIdx = vertices[i];
        g.addEdge(dstIdx, srcIdx);
      }
    }
    return g;
  }
}
