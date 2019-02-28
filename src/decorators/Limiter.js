const Decorator = require('../core/Decorator');
const {FAILURE, SUCCESS, ERROR} = require('../constants');

/**
 * This decorator limit the number of times its child can be called. After a
 * certain number of times, the Limiter decorator returns `FAILURE` without
 * executing the child.
 *
 * @module b3
 * @class Limiter
 * @extends Decorator
 **/

module.exports = class Limiter extends Decorator {

    /**
     * Creates an instance of Limiter.
     *
     * Settings parameters:
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions.
     * - **child** (*BaseNode*) The child node.
     *
     * @param {Object} params
     * @param {Number} params.maxLoop Maximum number of repetitions.
     * @param {BaseNode} params.child The child node.
     * @memberOf Limiter
     */
    constructor({child = null, maxLoop} = {}) {
        super({
            child,
            name: 'Limiter',
            title: 'Limit <maxLoop> Activations',
            properties: {maxLoop: 1},
        });

        if (!maxLoop) {
            throw 'maxLoop parameter in Limiter decorator is an obligatory parameter';
        }

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

        const i = tick.blackboard.get('i', tick.tree.id, this.id);

        if (i < this.maxLoop) {
            const status = this.child._execute(tick);

            if (status === SUCCESS || status === FAILURE)
                tick.blackboard.set('i', i + 1, tick.tree.id, this.id);

            return status;
        }

        return FAILURE;
    }
};
