import Stack from 'typescript-collections/dist/lib/Stack';
import { BehaviorTreeStatus } from './behaviorTreeStatus';
import { ActionNode } from './nodes/actionNode';
import { ParallelNode } from './nodes/parallelNode';
import { InverterNode } from './nodes/inverterNode';
import { SelectorNode } from './nodes/selectorNode';
import isUndefined from 'lodash.isundefined';
import { SequenceNode } from './nodes/sequenceNode';
import { ErrUnnestedTree, ErrZeroNodes, ErrorSpliceUnnested } from './errors';
/**
 * The builder of behavior tree
 *
 * Use [[End]] to complete build.
 *
 * Use [[Build]]  to get an instance of root node.
 *
 * Basic usage example:
 *
 * ```ts
 * import {behaviorTreeBuilder} from 'ts-behavior-tree';
 * let root = new behaviorTreeBuilder()
 *      .Do('something', t => {
 *          console.log(`Time updated: ${t}`);
 *      }
 * ).end().build();
 * ```
 */
var BehaviorTreeBuilder = /** @class */ (function () {
    function BehaviorTreeBuilder() {
        this.curNode = undefined;
        this.parentNodeStack = new Stack();
    }
    /**
     * Create an action node.
     * @param name name of action node.
     * @param fn Things need to be executed.
     * @returns Builder itself.
     */
    BehaviorTreeBuilder.prototype.Do = function (name, fn) {
        if (this.parentNodeStack.isEmpty()) {
            throw ErrUnnestedTree;
        }
        var actionNode = new ActionNode(name, fn);
        this.parentNodeStack.peek().AddChild(actionNode);
        return this;
    };
    /**
     * Like an action node, but the function can return true/false and is mapped to success/failure.
     * @param name name of this node.
     * @param fn Things need to be executed.
     * @returns Builder itself.
     */
    BehaviorTreeBuilder.prototype.Condition = function (name, fn) {
        return this.Do(name, function (t) { return (fn(t) ? BehaviorTreeStatus.Success : BehaviorTreeStatus.Failure); });
    };
    /**
     * Create an inverter node that inverts the success/failure of its children.
     * @param name name of this node.
     * @returns Builder itself.
     */
    BehaviorTreeBuilder.prototype.Inverter = function (name) {
        var inverterNode = new InverterNode(name);
        if (!this.parentNodeStack.isEmpty()) {
            this.parentNodeStack.peek().AddChild(inverterNode);
        }
        this.parentNodeStack.push(inverterNode);
        return this;
    };
    /**
     * Create a sequence node.
     * @param name
     * @returns Builder itself.
     */
    BehaviorTreeBuilder.prototype.Sequence = function (name) {
        var sequenceNode = new SequenceNode(name);
        if (!this.parentNodeStack.isEmpty()) {
            this.parentNodeStack.peek().AddChild(sequenceNode);
        }
        this.parentNodeStack.push(sequenceNode);
        return this;
    };
    /**
     * Create a parallel node.
     * @param name name of this node.
     * @param numRequiredToFail If number of failures reaches this, then this node will return [[behaviorTreeStatus.Failure]]
     * @param numRequiredToSucceed If number of success reaches this, then this node will return [[behaviorTreeStatus.Success]]
     * @returns Builder itself.
     */
    BehaviorTreeBuilder.prototype.Parallel = function (name, numRequiredToFail, numRequiredToSucceed) {
        var parallelNode = new ParallelNode(name, numRequiredToFail, numRequiredToSucceed);
        if (!this.parentNodeStack.isEmpty()) {
            this.parentNodeStack.peek().AddChild(parallelNode);
        }
        this.parentNodeStack.push(parallelNode);
        return this;
    };
    /**
     * Create a selector node.
     * @param name name of this node.
     * @returns Builder itself.
     */
    BehaviorTreeBuilder.prototype.Selector = function (name) {
        var selectorNode = new SelectorNode(name);
        if (!this.parentNodeStack.isEmpty()) {
            this.parentNodeStack.peek().AddChild(selectorNode);
        }
        this.parentNodeStack.push(selectorNode);
        return this;
    };
    /**
     * Splice a sub tree into the parent tree.
     * @param subTree sub tree that need to be added.
     * @returns Builder itself.
     */
    BehaviorTreeBuilder.prototype.Splice = function (subTree) {
        if (this.parentNodeStack.isEmpty()) {
            throw ErrorSpliceUnnested;
        }
        this.parentNodeStack.peek().AddChild(subTree);
        return this;
    };
    /**
     * Build the actual tree.
     * @returns Root node of this tree.
     */
    BehaviorTreeBuilder.prototype.Build = function () {
        if (isUndefined(this.curNode)) {
            throw ErrZeroNodes;
        }
        return this.curNode;
    };
    /**
     * Ends a sequence of children.
     * @returns Builder itself.
     */
    BehaviorTreeBuilder.prototype.End = function () {
        this.curNode = this.parentNodeStack.pop();
        return this;
    };
    return BehaviorTreeBuilder;
}());
export { BehaviorTreeBuilder };
