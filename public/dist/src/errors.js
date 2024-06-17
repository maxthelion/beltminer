export var ErrUnnestedTree = new Error("Can't create an unnested ActionNode, it must be a leaf node.");
export var ErrZeroNodes = new Error("Can't create a behavior tree with zero nodes");
export var ErrInvNodeMustHaveChild = new Error("InverterNode must have a child node!");
export var ErrInvNodeMoreThanOneChild = new Error("Can't add more than a single child to InverterNode!");
export var ErrorSpliceUnnested = new Error('Cannot splice an unnested sub-tree, there must be a parent-tree.');
