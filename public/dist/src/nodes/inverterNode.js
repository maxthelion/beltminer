import { BehaviorTreeStatus } from '../behaviorTreeStatus';
import isUndefined from 'lodash.isundefined';
import { ErrInvNodeMustHaveChild, ErrInvNodeMoreThanOneChild } from '../errors';
var InverterNode = /** @class */ (function () {
    function InverterNode(name) {
        this.name = name;
    }
    InverterNode.prototype.Tick = function (time) {
        if (isUndefined(this.childNode)) {
            throw ErrInvNodeMustHaveChild;
        }
        var result = this.childNode.Tick(time);
        if (result === BehaviorTreeStatus.Failure) {
            return BehaviorTreeStatus.Success;
        }
        else if (result === BehaviorTreeStatus.Success) {
            return BehaviorTreeStatus.Failure;
        }
        else {
            return BehaviorTreeStatus.Running;
        }
    };
    /**
     * Add a child to the parent node.
     * @param child Child needs to be added.
     */
    InverterNode.prototype.AddChild = function (child) {
        if (!isUndefined(this.childNode)) {
            throw ErrInvNodeMoreThanOneChild;
        }
        this.childNode = child;
    };
    return InverterNode;
}());
export { InverterNode };
