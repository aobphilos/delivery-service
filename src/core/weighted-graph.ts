import { IGraph } from '../interfaces/igraph';
import { Edge } from './edge';
import { DiGraph } from './graph';
import { EdgeType } from '../enum/edge-type';

export class WeightedGraph implements IGraph<Edge> {

  constructor(public size: number = 0
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
    this.verticesList[srcIdx].push(edge);
    this.verticesList[dstIdx].push(edge);
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

  getDeliveryCostForRoute(...labels: string[]) {

    if (!labels || labels.length === 0) {
      return 'Invalid Route';
    }

    if (labels.length === 1) {
      console.log(`Cost for route (${labels.join('-')}) = 0`)
      return "0";
    }

    let deliveryCost = 'No​ ​Such​ ​Route';
    let totalCost = 0;

    for (let i = 0; i < labels.length && i + 1 < labels.length; ++i) {
      let from = labels[i];
      let to = labels[i + 1];

      const edge = this.edge(EdgeType[from], EdgeType[to]);

      if (!edge) {
        totalCost = 0;
        break;
      }

      totalCost += edge.weight;
    }

    if (totalCost > 0) {
      deliveryCost = `${totalCost}`;
    }

    console.log(`Output for route (${labels.join('-')}) = ${deliveryCost}`);

    return deliveryCost;
  }

}