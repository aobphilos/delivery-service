import { WeightedGraph } from './weighted-graph';
import { IndexMinPQ } from './index-min-pq';
import { Stack } from './stack';
import { Edge } from './edge';
import { EdgeType } from '../enum/edge-type';

export class Dijkstra {

  constructor(
    public graph: WeightedGraph,
    private startIdx: number = 0,
    private marked: Array<boolean> = [],
    private edgeTo: Array<Edge> = [],
    private cost: Array<number> = [],
    private pq: IndexMinPQ = null) {
    this.initial(this.startIdx);
  }

  private initial(startIdx: number) {
    this.startIdx = startIdx;
    this.marked = [];
    this.edgeTo = [];
    this.cost = [];

    for (let v = 0; v < this.graph.size; ++v) {
      this.marked.push(false);
      this.edgeTo.push(null);
      this.cost.push(Number.MAX_VALUE);
    }

    this.cost[startIdx] = 0;
    this.marked[startIdx] = true;

    for (let j = 0; j < this.graph.size; ++j) {
      for (let v = 0; v < this.graph.size; ++v) {
        let vertices = this.graph.vertices(v);
        for (let i = 0; i < vertices.length; ++i) {
          let edge = vertices[i];
          this.relax(edge);
        }
      }
    }

  }

  relax(edge: Edge) {
    const srcIdx = edge.from();
    const dstIdx = edge.to();

    if (this.cost[dstIdx] > this.cost[srcIdx] + edge.weight) {
      this.cost[dstIdx] = this.cost[srcIdx] + edge.weight;
      this.edgeTo[dstIdx] = edge;
      if (this.pq.containsIndex(dstIdx)) {
        this.pq.decreaseKey(dstIdx, this.cost[dstIdx]);
      } else {
        this.pq.insert(dstIdx, this.cost[dstIdx]);
      }
    }
  }

  hasPathTo(idx: number) {
    return this.marked[idx];
  }

  pathTo(srcIdx: number) {
    let path = new Stack<Edge>();
    for (let x = srcIdx; x != this.startIdx; x = this.edgeTo[x].other(x)) {
      path.push(this.edgeTo[x]);
    }

    return path.toArray();
  }

  distanceTo(idx: number) {
    return this.cost[idx];
  }

  getPossibleRoute(labelFrom: string, labelTo: string) {

    const from: number = EdgeType[labelFrom];
    const to: number = EdgeType[labelTo];
    let routeCount = 0;
    this.initial(from);

    console.log(`Find route from ${labelFrom} to ${labelTo}`);

    let v = to;
    if (this.hasPathTo(v)) {
      let path = this.pathTo(v);
      for (let i = 0; i < path.length; ++i) {
        let edge = path[i];
        console.log(`${edge.labelFrom()} => ${edge.labelTo()} , cost: ${edge.weight}`);
        ++routeCount;
      }

      console.log(`Total route: ${routeCount}`);

    } else {
      console.log('===== No​ ​Such​ ​Route ======');
    }


    return routeCount;
  }

  getCheapestRoute(labelFrom: string, labelTo: string) {
    const from: number = EdgeType[labelFrom];
    const to: number = EdgeType[labelTo];
    let routeCost = 0;
    this.initial(from);

    console.log(`Find the cheapest cost for a route from ${labelFrom} to ${labelTo}`);

    let v = to;
    if (this.hasPathTo(v)) {
      let path = this.pathTo(v);
      for (let i = 0; i < path.length; ++i) {
        let edge = path[i];
        console.log(`${edge.labelFrom()} => ${edge.labelTo()} , cost: ${edge.weight}`);
        routeCost += edge.weight;
      }

      console.log(`Total cost: ${routeCost}`);

    } else {
      console.log('===== No​ ​Such​ ​Route ======');
    }

    return routeCost;

  }

}