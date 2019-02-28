const Composite = require('../core/Composite');
const {FAILURE, RUNNING, SUCCESS} = require('../constants');

/**
 * MemPriority is similar to Priority node, but when a child returns a
 * `RUNNING` state, its index is recorded and in the next tick the,
 * MemPriority calls the child recorded directly, without calling previous
 * children again.
 *
 * @module b3
 * @class MemPriority
 * @extends Composite
 **/

module.exports = class MemPriority extends Composite {

    /**
     * Creates an instance of MemPriority.
     * @param {Object} params
     * @param {Array} params.children
     * @memberOf MemPriority
     */
    constructor({children = [], title} = {}) {
        super({
            children,
            title,
            name: 'MemPriority',
        });
    }

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open(tick) {
        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
    }

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick) {
        const child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
        for (let i = child; i < this.children.length; i++) {
            const status = this.children[i]._execute(tick);

            if (status !== FAILURE) {
                // if (status === RUNNING) {
                    tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                // }
                return status;
            }
        }

        return FAILURE;
    }
};
