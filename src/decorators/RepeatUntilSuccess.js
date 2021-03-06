const Decorator = require('../core/Decorator');
const {SUCCESS, ERROR, FAILURE, RUNNING} = require('../constants');

/**
 * RepeatUntilSuccess is a decorator that repeats the tick signal until the
 * node child returns `SUCCESS`, `RUNNING` or `ERROR`. Optionally, a maximum
 * number of repetitions can be defined.
 *
 * @module b3
 * @class RepeatUntilSuccess
 * @extends Decorator
 **/

module.exports = class RepeatUntilSuccess extends Decorator {

    /**
     * Creates an instance of RepeatUntilSuccess.
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1 (infinite).
     * - **child** (*BaseNode*) The child node.
     *
     * @param {Object} params Object with parameters.
     * @param {Number} params.maxLoop Maximum number of repetitions. Default to -1 (infinite).
     * @param {BaseNode} params.child The child node.
     * @memberOf RepeatUntilSuccess
     **/
    constructor({maxLoop = -1, child = null} = {}) {
        super({
            child,
            name: 'RepeatUntilSuccess',
            title: 'Repeat Until Success',
            properties: {maxLoop: -1},
        });

        this.maxLoop = maxLoop;
    }

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open(tick) {
        tick.blackboard.set('i', 0, tick.tree.id, this.id);
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

        let i = tick.blackboard.get('i', tick.tree.id, this.id);
        let childStatus = RUNNING;

        if (this.maxLoop < 0 || i < this.maxLoop) {
            childStatus = this.child._execute(tick);

            if (childStatus === FAILURE) {
                i++;
            } else if (childStatus === RUNNING) {
                return RUNNING;
            } else if (childStatus === SUCCESS) {
                // end condition
                return SUCCESS;
            } else {
                tick.target.logger.e('UNKNOWN child status under repeatUntilSuccess :' + childStatus);
                return ERROR;
            }

        } else if (i >= this.maxLoop) {
            return SUCCESS;
        }

        tick.blackboard.set('i', i, tick.tree.id, this.id);
        return childStatus;
    }
};
