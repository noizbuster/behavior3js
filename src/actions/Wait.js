const Action = require('../core/Action');
const {SUCCESS, RUNNING} = require('../constants');

/**
 * Wait a few seconds.
 *
 * @class Wait
 * @extends Action
 **/

module.exports = class Wait extends Action {

    /**
     * Creates an instance of Wait.
     * @param {Object} settings Object with parameters
     * @param {Number} settings.milliseconds Maximum time, in milliseconds, a child can execute.
     * @memberOf Wait
     */
    constructor({milliseconds = 0} = {}) {
        super({
            name: 'Wait',
            title: 'Wait <milliseconds>ms',
            properties: {milliseconds: 0},
        });

        this.endTime = milliseconds;
    }

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open(tick) {
        const startTime = (new Date()).getTime();
        tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
    }

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick) {
        const currTime = (new Date()).getTime();
        const startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

        if (currTime - startTime > this.endTime) {
            return SUCCESS;
        }

        return RUNNING;
    }
};
