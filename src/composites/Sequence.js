const Composite = require('../core/Composite');
const {SUCCESS} = require('../constants');

/**
 * The Sequence node ticks its children sequentially until one of them
 * returns `FAILURE`, `RUNNING` or `ERROR`. If all children return the
 * success state, the sequence also returns `SUCCESS`.
 *
 * @class Sequence
 * @extends Composite
 **/

module.exports = class Sequence extends Composite {

    /**
     * Creates an instance of Sequence.
     * @param {Object} params
     * @param {Array} params.children
     * @memberOf Sequence
     */
    constructor({children = [], title} = {}) {
        super({
            name: 'Sequence',
            title,
            children
        });
    }

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick) {
        for (let i = 0; i < this.children.length; i++) {
            const status = this.children[i]._execute(tick);

            if (status !== SUCCESS) {
                return status;
            }
        }

        return SUCCESS;
    }
};
