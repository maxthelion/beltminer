import { BehaviorTreeStatus } from '../behaviorTreeStatus';
import LinkedList from 'typescript-collections/dist/lib/LinkedList';
var SelectorNode = /** @class */ (function () {
    function SelectorNode(name) {
        this.name = name;
        /**
         * List of child nodes.
         */
        this.children = new LinkedList();
    }
    SelectorNode.prototype.Tick = function (time) {
        var childStatus = BehaviorTreeStatus.Failure;
        this.children.forEach(function (child) {
            childStatus = child.Tick(time);
            if (childStatus !== BehaviorTreeStatus.Failure) {
                return false;
            }
        });
        return childStatus;
    };
    /**
     * Add a child to the parent node.
     * @param child Child needs to be added.
     */
    SelectorNode.prototype.AddChild = function (child) {
        this.children.add(child);
    };
    return SelectorNode;
}());
export { SelectorNode };
