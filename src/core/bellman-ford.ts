import { WeightedGraph } from './weighted-graph';
import { Stack } from './stack';
import { Edge } from './edge';

export class BellmanFord {

  constructor(
    public graph: WeightedGraph,
    private startIdx: number,
    private marked: Array<boolean> = [],
    private edgeTo: Array<Edge> = [],
    private cost: Array<number> = []) {

    for (let v = 0; v < this.graph.size; ++v) {
      this.marked.push(false);
      this.edgeTo.push(null);
      this.cost.push(Number.MAX_VALUE);
    }

    this.cost[this.startIdx] = 0;
    this.marked[this.startIdx] = true;

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
    let srcIdx = edge.from();
    let dstIdx = edge.to();
    if (this.cost[dstIdx] > this.cost[srcIdx] + edge.weight) {
      this.cost[dstIdx] = this.cost[srcIdx] + edge.weight;
      this.marked[dstIdx] = true;
      this.edgeTo[dstIdx] = edge;
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