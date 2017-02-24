export class Node {
  constructor (data) {
    this.data = data;
    this.left = this.right = this.parent = null;
    this.revert = false;
  }
}

function connect (child, parent, leftChild) {
  if (leftChild) parent.right = child;
  else           parent.left  = child;
  if (child !== null) child.parent = parent;
}

// rotate an edge x.parent to x
function rotate (x) {
  let p = x.parent;
  let g = p.parent;
  let isRootP = isRoot(p);
  let leftChildX = (x === p.right);

  connect(leftChildX ? x.left : x.right, p, leftChildX);
  connect(p, x, !leftChildX);

  if (!isRootP) connect(x, g, p == g.right);
  else x.parent = g;
}

function splay (x) {
  while (!isRoot(x)) {
    let p  = x.parent;
    let gp = p.parent;
    if (!isRoot(p)) {
      let xIsRight = x === p.right;
      let pIsRight = p === gp.right;
      if (xIsRight === pIsRight) rotate(p); // zig-zig
      else rotate(x) // zig-zag
    }
    rotate(x);
  }
}

function access (x) {
  let last = null;
  for (let y = x; y !== null; y = y.parent) {
    splay(y);
    y.right = last;
    last = y;
  }
  splay(x);
  return last;
}

export function link (parent, child) {
  if (findRoot(child) === findRoot(parent)) return;
  access(child);
  child.parent = parent;
}

export function cut (x) {
  access(x);
  x.left.parent = null;
  x.left = null;
}

export function lca (x, y) {
  if (findRoot(x) !== findRoot(y)) return null;
  access(x);
  return access(y);
}

export function findRoot (x) {
  access(x);
  while (x.left !== null) x = x.left;
  return x;
}

export function isRoot (x) {
  return x.parent === null || (x.parent.left !== x && x.parent.right !== x);
}

export class LinkCutTree {

  constructor () {
    this.root = new Node();
  }

  link (u, v) {
    return link(u, v);
  }

  cut (u) {
    return cut(u);
  }

  isRoot (u) {
    return isRoot(u);
  }

  lca(u, v) {
    return lca(u, v);
  }
};
