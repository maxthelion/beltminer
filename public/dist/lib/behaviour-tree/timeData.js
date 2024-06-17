/**
 * Delta time used by all nodes
 */
var TimeData = /** @class */ (function () {
    /**
     * Creates an instance of time data.
     * @param deltaTime Delta time
     */
    function TimeData(deltaTime) {
        if (deltaTime === void 0) { deltaTime = 1; }
        this.deltaTime = deltaTime;
    }
    return TimeData;
}());
export { TimeData };
