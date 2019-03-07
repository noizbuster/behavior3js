const Action = require('../core/Action');
const {RUNNING} = require('../constants');

/**
 * This action node returns RUNNING always.
 *
 * @class Runner
 * @extends Action
 **/
module.exports = class Runner extends Action {

    /**
     * Creates an instance of Runner.
     * @memberOf Runner
     */
    constructor() {
        super({name: 'Runner'});
    }

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} Always return `RUNNING`.
     **/
    tick(tick) {
        return RUNNING;
    }
};
