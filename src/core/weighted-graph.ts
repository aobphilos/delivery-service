import { IGraph } from '../interfaces/igraph';
import { Edge } from './edge';
import { DiGraph } from './graph';

export class WeightedGraph implements IGraph<Edge> {

  constructor(public size: number
    , public verticesList: Array<Array<Edge>> = []
    , public edges: Array<Edge> = []) {
    for (let i = 0; i < this.size; ++i) {
      this.verticesList[i] = [];
    }
  }

  vertices(idx: number) {
    return this.verticesList[idx];
  }

  edge(srcIdx: number, dstIdx: number) {
    let vertices = this.verticesList[srcIdx];
    for (let i = 0; i < vertices.length; ++i) {
      let x = vertices[i].other(srcIdx);
      if (x == dstIdx) {
        return vertices[i];
      }
    }
    return null;
  }

  addEdge(edge: Edge) {
    const srcIdx = edge.either();
    const dstIdx = edge.other(srcIdx);
    this.vertices[srcIdx].push(edge);
    this.vertices[dstIdx].push(edge);
  }

}

export class WeightedDiGraph extends WeightedGraph {

  addEdge(edge: Edge) {
    let idx = edge.from();
    this.verticesList[idx].push(edge);
  }

  edge(srcIdx: number, dstIdx: number) {
    let vertices = this.verticesList[srcIdx];
    for (let i = 0; i < vertices.length; ++i) {
      let x = vertices[i].other(srcIdx);
      if (x == dstIdx) {
        return vertices[i];
      }
    }
    return null;
  }

  toDiGraph() {
    const graph = new DiGraph(this.size);
    for (let srcIdx = 0; srcIdx < this.size; ++srcIdx) {
      let vertices = this.verticesList[srcIdx];
      for (let i = 0; i < vertices.length; ++i) {
        let edge = vertices[i];
        let dstIdx = edge.other(srcIdx);
        graph.addEdge(srcIdx, dstIdx);
      }
    }
    return graph;
  }

}