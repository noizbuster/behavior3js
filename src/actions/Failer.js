const Action = require('../core/Action');
const {FAILURE} = require('../constants');

/**
 * This action node returns `FAILURE` always.
 *
 * @class Failer
 * @extends Action
 **/
module.exports = class Failer extends Action {

    /**
     * Creates an instance of Failer.
     * @memberOf Failer
     */
    constructor() {
        super({name: 'Failer'});
    }

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} Always return `FAILURE`.
     **/
    tick(tick) {
        return FAILURE;
    }
};
