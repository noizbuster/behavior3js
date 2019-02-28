const {ERROR} = require('../constants');
const Action = require('../core/Action');

/**
 * This action node returns `ERROR` always.
 *
 * @module b3
 * @class Error
 * @extends Action
 **/
module.exports = class Error extends Action {

    /**
     * Creates an instance of Error.
     * @memberOf Error
     */
    constructor() {
        super({name: 'Error'});
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `ERROR`.
     **/
    tick(tick) {
        return ERROR;
    }
};
