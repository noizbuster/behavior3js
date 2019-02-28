const Action = require('../core/Action');
const {FAILURE} = require('../constants');

/**
 * This action node returns `FAILURE` always.
 *
 * @module b3
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
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `FAILURE`.
     **/
    tick(tick) {
        return FAILURE;
    }
};
