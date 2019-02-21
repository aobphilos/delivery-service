import { WeightedGraph } from './weighted-graph';
import { IndexMinPQ } from './index-min-pq';
import { Stack } from './stack';
import { Edge } from './edge';

export class Dijkstra {

  constructor(
    public graph: WeightedGraph,
    private startIdx: number,
    private marked: Array<boolean> = [],
    private edgeTo: Array<Edge> = [],
    private cost: Array<number> = [],
    private pq: IndexMinPQ = null) {

    for (let v = 0; v < this.graph.size; ++v) {
      this.marked.push(false);
      this.edgeTo.push(null);
      this.cost.push(Number.MAX_VALUE);
    }

    this.cost[this.startIdx] = 0;
    this.pq = new IndexMinPQ(graph.size, null);
    this.pq.insert(this.startIdx, this.cost[this.startIdx]);

    while (!this.pq.isEmpty()) {
      let srcIdx = this.pq.delMin();
      this.marked[srcIdx] = true;
      let vertices = this.graph.vertices(srcIdx);
      for (let i = 0; i < vertices.length; ++i) {
        let edge = vertices[i];
        this.relax(edge);
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

}