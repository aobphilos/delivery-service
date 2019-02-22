import { expect } from 'chai';
import { beforeEach } from 'mocha';
import { Edge, EdgeType, WeightedDiGraph, WeightedGraph, BellmanFord } from '../src';

describe('Case 3: ​Calculate​ ​the​ ​cheapest​ ​delivery​ ​route​ ​between​ ​two​ ​town.\n', () => {

    describe('Example:: ​the​ ​cost​ ​of​ ​cheapest​ ​delivery​ ​route​ ​between​ ​E​ ​to​ ​D', () => {

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

        it('The​ ​cost​ ​of​ ​cheapest​ ​delivery​ ​route​ ​between​ ​E​ ​to​ ​D\n', () => {
            algorthm = new BellmanFord(graph);
            const cost = algorthm.getCheapestRoute('E', 'D');
            expect(cost).to.equal(9);
        });
        
    });
});
