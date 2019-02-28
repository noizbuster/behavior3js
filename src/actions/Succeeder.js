const Action = require('../core/Action');
const {SUCCESS} = require('../constants');

/**
 * This action node returns `SUCCESS` always.
 *
 * @module b3
 * @class Succeeder
 * @extends Action
 **/

module.exports = class Succeeder extends Action {

    /**
     * Creates an instance of Succeeder.
     * @memberOf Succeeder
     */
    constructor() {
        super({name: 'Succeeder'});
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `SUCCESS`.
     **/
    tick(tick) {
        return SUCCESS;
    }
};
