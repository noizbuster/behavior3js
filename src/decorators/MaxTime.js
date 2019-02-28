const Decorator = require('../core/Decorator');
const {FAILURE, ERROR} = require('../constants');

/**
 * The MaxTime decorator limits the maximum time the node child can execute.
 * Notice that it does not interrupt the execution itself (i.e., the child
 * must be non-preemptive), it only interrupts the node after a `RUNNING`
 * status.
 *
 * @module b3
 * @class MaxTime
 * @extends Decorator
 **/

module.exports = class MaxTime extends Decorator {

    /**
     * Creates an instance of MaxTime.
     *
     * - **maxTime** (*Integer*) Maximum time a child can execute.
     * - **child** (*BaseNode*) The child node.

     * @param {Object} params Object with parameters.
     * @param {Number} params.maxTime Maximum time a child can execute.
     * @param {BaseNode} params.child The child node.
     * @memberOf MaxTime
     */
    constructor({maxTime, child = null} = {}) {
        super({
            child,
            name: 'MaxTime',
            title: 'Max <maxTime>ms',
            properties: {maxTime: 0},
        });

        if (!maxTime) {
            throw 'maxTime parameter in MaxTime decorator is an obligatory parameter';
        }

        this.maxTime = maxTime;
    }

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open(tick) {
        const startTime = (new Date()).getTime();
        tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
    }

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        const currTime = (new Date()).getTime();
        const startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

        const status = this.child._execute(tick);
        if (currTime - startTime > this.maxTime) {
            return FAILURE;
        }

        return status;
    }
};
