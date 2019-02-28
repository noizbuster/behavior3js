const Action = require('../core/Action');
const {RUNNING} = require('../constants');

/**
 * This action node returns RUNNING always.
 *
 * @module b3
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
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `RUNNING`.
     **/
    tick(tick) {
        return RUNNING;
    }
};
