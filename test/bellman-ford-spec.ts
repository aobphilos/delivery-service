import { expect } from 'chai';
import { WeightedDiGraph, Edge, BellmanFord } from '../src';

describe('Bellman Ford', () => {
    it('should get shortest path from Weigthed Directed Graph', () => {
        var g = new WeightedDiGraph(8);

        g.addEdge(new Edge(0, 1, 5.0));
        g.addEdge(new Edge(0, 4, 9.0));
        g.addEdge(new Edge(0, 7, 8.0));
        g.addEdge(new Edge(1, 2, 12.0));
        g.addEdge(new Edge(1, 3, 15.0));
        g.addEdge(new Edge(1, 7, 4.0));
        g.addEdge(new Edge(2, 3, 3.0));
        g.addEdge(new Edge(2, 6, 11.0));
        g.addEdge(new Edge(3, 1, 20.0));
        g.addEdge(new Edge(3, 6, 9.0));
        g.addEdge(new Edge(4, 5, 5.0));
        g.addEdge(new Edge(4, 6, 20.0));
        g.addEdge(new Edge(4, 7, 5.0));
        g.addEdge(new Edge(5, 2, 1.0));
        g.addEdge(new Edge(5, 6, 13.0));
        g.addEdge(new Edge(7, 5, 6.0));
        g.addEdge(new Edge(7, 2, 7.0));

        expect(g.size).to.equal(8);
        var edgeCount = 0;
        for (var v = 0; v < g.size; ++v) {
            var vertices = g.vertices(v);
            edgeCount += vertices.length;
        }
        expect(edgeCount).to.equal(17);
        var s = 3;
        var algorthm = new BellmanFord(g, s);

        for (var v = 1; v < g.size + 1; ++v) {
            if (algorthm.hasPathTo(v)) {
                var path = algorthm.pathTo(v);
                console.log(`=====path from ${s} to ${v} start==========`);
                for (var i = 0; i < path.length; ++i) {
                    var e = path[i];
                    console.log(e.from() + ' => ' + e.to() + ': ' + e.weight);
                }
                console.log(`=====path from ${s} to ${v} end==========`);
                console.log('=====distance: ' + algorthm.distanceTo(v) + '=========');
            } else {
                console.log(`***** not found path from ${s} to ${v} *****`);
            }
        }
    });
});
