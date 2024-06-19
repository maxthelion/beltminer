var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    Stack.prototype.push = function (item) {
        this.items.push(item);
    };
    Stack.prototype.pop = function () {
        return this.items.pop();
    };
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1];
    };
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    return Stack;
}());
export { Stack };
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.items = [];
    }
    LinkedList.prototype.add = function (item) {
        this.items.push(item);
    };
    LinkedList.prototype.every = function (func) {
        return this.items.every(func);
    };
    return LinkedList;
}());
var BehaviourTreeBuilder = /** @class */ (function () {
    function BehaviourTreeBuilder() {
        // tree: BehaviourTree;
        this.curNode = undefined;
        this.parentNodeStack = new Stack();
    }
    // constructor() {
    //     this.tree = new BehaviourTree();
    // }
    BehaviourTreeBuilder.prototype.action = function (name, func) {
        if (this.parentNodeStack.isEmpty()) {
            throw new Error('Unnested tree');
        }
        var action = new Action(name, func);
        this.parentNodeStack.peek().addChild(action);
        return this;
    };
    // condition(name: string, func: Function) {
    //     let condition = new Condition(name, func);
    //     this.tree.currentNode.children.push(condition);
    //     return this;
    // }
    BehaviourTreeBuilder.prototype.sequence = function (name) {
        var sequenceNode = new Sequence(name);
        if (!this.parentNodeStack.isEmpty()) {
            this.parentNodeStack.peek().addChild(sequenceNode);
        }
        this.parentNodeStack.push(sequenceNode);
        return this;
    };
    BehaviourTreeBuilder.prototype.selector = function (name) {
        var selectorNode = new Selector(name);
        if (!this.parentNodeStack.isEmpty()) {
            this.parentNodeStack.peek().addChild(selectorNode);
        }
        this.parentNodeStack.push(selectorNode);
        return this;
    };
    // parallel() {
    //     let parallel = new Parallel();
    //     this.currentNode.children.push(parallel);
    //     this.currentNode = parallel;
    //     return this;
    // }
    BehaviourTreeBuilder.prototype.end = function () {
        this.curNode = this.parentNodeStack.pop();
        return this;
    };
    BehaviourTreeBuilder.prototype.build = function () {
        if (this.curNode === undefined) {
            throw new Error('No root node');
        }
        return this.curNode;
    };
    return BehaviourTreeBuilder;
}());
export { BehaviourTreeBuilder };
var BehaviourTreeReturnValues = /** @class */ (function () {
    function BehaviourTreeReturnValues() {
    }
    BehaviourTreeReturnValues.SUCCESS = 1;
    BehaviourTreeReturnValues.FAILURE = 2;
    BehaviourTreeReturnValues.RUNNING = 3;
    return BehaviourTreeReturnValues;
}());
export { BehaviourTreeReturnValues };
// export class BehaviourTree {
//     root: BehaviourTreeNode;
//     currentNode: BehaviourTreeNode;
//     constructor() {
//         this.root = new Sequence('root');
//         this.currentNode = this.root;
//     }
//     tick(actor: Actor) {
//         console.log('tick tree');
//         return this.root.tick(actor);
//     }
// }
var BehaviourTreeNode = /** @class */ (function () {
    function BehaviourTreeNode(name) {
        if (name === void 0) { name = ''; }
        this.params = {
            func: function () { },
            name: ''
        };
        this.params.name = name;
    }
    BehaviourTreeNode.prototype.tick = function (actor) {
        // console.log('ticker ', this.params.name);
        return BehaviourTreeReturnValues.SUCCESS;
    };
    return BehaviourTreeNode;
}());
export { BehaviourTreeNode };
var Condition = /** @class */ (function (_super) {
    __extends(Condition, _super);
    function Condition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Condition;
}(BehaviourTreeNode));
var Action = /** @class */ (function (_super) {
    __extends(Action, _super);
    function Action(name, func) {
        var _this = _super.call(this, name) || this;
        _this.params.func = func;
        return _this;
    }
    Action.prototype.tick = function (actor) {
        _super.prototype.tick.call(this, actor);
        return this.params.func(actor);
    };
    return Action;
}(BehaviourTreeNode));
var Sequence = /** @class */ (function (_super) {
    __extends(Sequence, _super);
    function Sequence() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = new LinkedList();
        return _this;
    }
    Sequence.prototype.tick = function (actor) {
        _super.prototype.tick.call(this, actor);
        var result = BehaviourTreeReturnValues.SUCCESS;
        this.children.every(function (child) {
            result = child.tick(actor);
            if (result === BehaviourTreeReturnValues.FAILURE) {
                return result;
            }
        });
        return result;
    };
    Sequence.prototype.addChild = function (node) {
        this.children.add(node);
    };
    return Sequence;
}(BehaviourTreeNode));
var Selector = /** @class */ (function (_super) {
    __extends(Selector, _super);
    function Selector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = new LinkedList();
        return _this;
    }
    Selector.prototype.tick = function (actor) {
        _super.prototype.tick.call(this, actor);
        var result = BehaviourTreeReturnValues.FAILURE;
        this.children.items.every(function (child) {
            result = child.tick(actor);
            if (result !== BehaviourTreeReturnValues.FAILURE) {
                // console.log('breaking out of loop');
                return false;
            }
            return true;
        });
        return result;
    };
    Selector.prototype.addChild = function (node) {
        this.children.add(node);
    };
    return Selector;
}(BehaviourTreeNode));
var Parallel = /** @class */ (function (_super) {
    __extends(Parallel, _super);
    function Parallel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = new LinkedList();
        return _this;
    }
    // numRequiredToFail: number;
    Parallel.prototype.tick = function (actor) {
        _super.prototype.tick.call(this, actor);
        var result = BehaviourTreeReturnValues.SUCCESS;
        this.children.items.every(function (child) {
            result = child.tick(actor);
            if (result === BehaviourTreeReturnValues.FAILURE) {
                return result;
            }
        });
        return result;
    };
    Parallel.prototype.addChild = function (node) {
        this.children.add(node);
    };
    return Parallel;
}(BehaviourTreeNode));
