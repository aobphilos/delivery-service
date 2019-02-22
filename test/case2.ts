import { expect } from 'chai';
import { beforeEach } from 'mocha';
import { Edge, EdgeType, WeightedDiGraph, WeightedGraph, BellmanFord } from '../src';

describe('Case 2: ​Calculate​ ​the​ ​number​ ​of​ ​possible​ ​delivery​ ​route​ ​that​ ​can​ ​be​ ​construct​ ​by​ ​the​ ​given conditions.\n', () => {

    describe('Example:: AB1,​ ​​ ​AC4,​ ​AD10,​ ​BE3,​ ​CD4,​ ​CF2,​ ​DE1,​ ​EB3,​ ​EA2,​ ​FD1', () => {

        let graph: WeightedGraph;
        let algorthm: BellmanFord;

        graph = new WeightedDiGraph(6);
        graph.addEdge(new Edge('A', 'B', 1.0));
        graph.addEdge(new Edge('A', 'C', 4.0));
        graph.addEdge(new Edge('A', 'D', 10.0));
        graph.addEdge(new Edge('B', 'E', 3.0));
        graph.addEdge(new Edge('C', 'D', 4.0));
        graph.addEdge(new Edge('C', 'F', 2.0));
        graph.addEdge(new Edge('D', 'E', 1.0));
        graph.addEdge(new Edge('E', 'B', 3.0));
        graph.addEdge(new Edge('E', 'A', 2.0));
        graph.addEdge(new Edge('F', 'D', 1.0));

        it('Calculate edage size\n', () => {
            let edgeCount = 0;
            for (let v = 0; v < graph.size; ++v) {
                let vertices = graph.vertices(v);
                edgeCount += vertices.length;
            }
            expect(graph.size).to.equal(6);
            expect(edgeCount).to.equal(10);
        });

        it('The​ ​number​ ​of​ ​possible​ ​delivery​ ​route​ ​from​ ​E​ ​to​ ​D​ ​with​ ​a​ ​maximum​ ​of​ ​4​ ​stop without​ ​using​ ​the​ ​same​ ​route​ ​twice​ ​in​ ​a​ ​delivery​ ​route\n', () => {
            algorthm = new BellmanFord(graph);
            const routeCount = algorthm.getPossibleRoute('E', 'D');
            expect(routeCount).to.equal(4);
        });
        
    });
});
