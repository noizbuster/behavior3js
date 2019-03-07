const Composite = require('../core/Composite');
const {FAILURE} = require('../constants');

/**
 * Priority ticks its children sequentially until one of them returns
 * `SUCCESS`, `RUNNING` or `ERROR`. If all children return the failure state,
 * the priority also returns `FAILURE`.
 *
 * @class Priority
 * @extends Composite
 **/

module.exports = class Priority extends Composite {

    /**
     * Creates an instance of Priority.
     * @param {Object} params
     * @param {Array} params.children
     * @memberOf Priority
     */
    constructor({children = [], title} = {}) {
        super({
            name: 'Priority',
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

            if (status !== FAILURE) {
                return status;
            }
        }

        return FAILURE;
    }
};
