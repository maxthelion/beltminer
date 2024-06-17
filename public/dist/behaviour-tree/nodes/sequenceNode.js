import { BehaviorTreeStatus } from '../behaviorTreeStatus';
import LinkedList from 'typescript-collections/dist/lib/LinkedList';
/**
 * Sequence node
 *
 * Runs child nodes in sequence, until one fails.
 */
var SequenceNode = /** @class */ (function () {
    function SequenceNode(name) {
        /**
         * List of child nodes.
         */
        this.children = new LinkedList();
        this.name = name;
    }
    /**
     * Add a child to the sequence.
     *
     * @param child Child added to sequence.
     */
    SequenceNode.prototype.AddChild = function (child) {
        this.children.add(child);
    };
    /**
     * Tick update
     * @param time Delta time since last tick
     * @returns
     */
    SequenceNode.prototype.Tick = function (time) {
        var childStatus = BehaviorTreeStatus.Success;
        this.children.forEach(function (child) {
            childStatus = child.Tick(time);
            if (childStatus !== BehaviorTreeStatus.Success) {
                return false;
            }
        });
        return childStatus;
    };
    return SequenceNode;
}());
export { SequenceNode };
