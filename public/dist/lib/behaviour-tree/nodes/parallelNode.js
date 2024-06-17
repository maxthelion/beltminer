import LinkedList from 'typescript-collections/dist/lib/LinkedList';
import { BehaviorTreeStatus } from '../behaviorTreeStatus';
/**
 * Sequence node
 *
 * Runs child nodes in sequence, until one fails.
 */
var ParallelNode = /** @class */ (function () {
    function ParallelNode(name, numRequiredToFail, numRequiredToSucceed) {
        this.children = new LinkedList();
        this.name = name;
        this.numRequiredToFail = numRequiredToFail;
        this.numRequiredToSucceed = numRequiredToSucceed;
    }
    ParallelNode.prototype.Tick = function (time) {
        var numChildrenSuceeded = 0;
        var numChildrenFailed = 0;
        this.children.forEach(function (child) {
            var childStatus = child.Tick(time);
            switch (childStatus) {
                case BehaviorTreeStatus.Success:
                    ++numChildrenSuceeded;
                    break;
                case BehaviorTreeStatus.Failure:
                    ++numChildrenFailed;
                    break;
            }
        });
        if (numChildrenSuceeded > 0 && numChildrenSuceeded >= this.numRequiredToSucceed) {
            return BehaviorTreeStatus.Success;
        }
        if (numChildrenFailed > 0 && numChildrenFailed >= this.numRequiredToFail) {
            return BehaviorTreeStatus.Failure;
        }
        return BehaviorTreeStatus.Running;
    };
    ParallelNode.prototype.AddChild = function (child) {
        this.children.add(child);
    };
    return ParallelNode;
}());
export { ParallelNode };
