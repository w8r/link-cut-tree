import {
  link,
  Node,
  lca,
  cut
} from '../src/link-cut-tree';
import { assert } from 'chai';

describe('Link/cut tree', () => {
  describe('LCA', () => {
    let n1 = new Node();
    let n2 = new Node();
    let n3 = new Node();
    let n4 = new Node();
    let n5 = new Node();

    link(n2, n1);
    link(n2, n3);
    link(n3, n4);

    it('least common ancestor', () => {
      assert.equal(n2, lca(n1, n4));
    });

    it('least common ancestor after cut', () => {
      cut(n4);
      link(n3, n5);
      assert.equal(n2, lca(n1, n5));
    });
  });
});
