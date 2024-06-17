export var BehaviorTreeStatus;
(function (BehaviorTreeStatus) {
    BehaviorTreeStatus[BehaviorTreeStatus["Success"] = 0] = "Success";
    BehaviorTreeStatus[BehaviorTreeStatus["Failure"] = 1] = "Failure";
    BehaviorTreeStatus[BehaviorTreeStatus["Running"] = 2] = "Running";
})(BehaviorTreeStatus || (BehaviorTreeStatus = {}));
