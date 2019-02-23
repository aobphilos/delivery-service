import { expect } from 'chai';
import { Edge, WeightedDiGraph } from '../src';

describe('Case 1:  ​Calculate​ ​the​ ​delivery​ ​cost​ ​of​ ​the​ ​given​ ​delivery​ ​route.\n', () => {

    describe('Example:: AB1,​ ​​ ​AC4,​ ​AD10,​ ​BE3,​ ​CD4,​ ​CF2,​ ​DE1,​ ​EB3,​ ​EA2,​ ​FD1', () => {

        let graph: WeightedDiGraph;
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

        it('The​ ​delivery​ ​cost​ ​for​ ​route​ : ​A-B-E, output : 4\n', () => {
            const cost = graph.getDeliveryCostForRoute('A', 'B', 'E');
            expect(cost).to.equal('4');
        });

        it('The​ ​delivery​ ​cost​ ​for​ ​route​ : ​A-D, output : 10\n', () => {
            const cost = graph.getDeliveryCostForRoute('A', 'D');
            expect(cost).to.equal('10');
        });

        it('The​ ​delivery​ ​cost​ ​for​ ​route​ : ​E-A-C-F, output : 8\n', () => {
            const cost = graph.getDeliveryCostForRoute('E', 'A', 'C', 'F');
            expect(cost).to.equal('8');
        });

        it('The​ ​delivery​ ​cost​ ​for​ ​route​ : A-D-F, output : No​ ​Such​ ​Route\n', () => {
            const cost = graph.getDeliveryCostForRoute('A', 'D', 'F');
            expect(cost).to.equal('No​ ​Such​ ​Route');
        });

        it('The​ ​delivery​ ​cost​ ​for​ ​route​ : ​E, output : 0\n', () => {
            const cost = graph.getDeliveryCostForRoute('E');
            expect(cost).to.equal('0');
        });

        it(`The​ ​delivery​ ​cost​ ​for​ ​route​ : null or empty, output : Invalid Route\n`, () => {
            const cost1 = graph.getDeliveryCostForRoute();
            expect(cost1).to.equal('Invalid Route');

            const cost2 = graph.getDeliveryCostForRoute('');
            expect(cost2).to.equal('Invalid Route');
        });

    });

});
