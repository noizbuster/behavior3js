const Composite = require('../core/Composite');
const {SUCCESS, RUNNING} = require('../constants');

/**
 * MemSequence is similar to Sequence node, but when a child returns a
 * `RUNNING` state, its index is recorded and in the next tick the
 * MemPriority call the child recorded directly, without calling previous
 * children again.
 *
 * @class MemSequence
 * @extends Composite
 **/

module.exports = class MemSequence extends Composite {

    /**
     * Creates an instance of MemSequence.
     * @param {Object} params
     * @param {Array} params.children
     * @memberOf MemSequence
     */
    constructor({children = [], title} = {}) {
        super({
            name: 'MemSequence',
            title,
            children
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

            if (status !== SUCCESS) {
                if (status === RUNNING) {
                    tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                }
                return status;
            }
        }
        return SUCCESS;
    }
};
