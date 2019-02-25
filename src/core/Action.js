const BaseNode = require('../core/BaseNode');
const {ACTION} = require('../constants');

/**
 * Action is the base class for all action nodes. Thus, if you want to create
 * new custom action nodes, you need to inherit from this class. For example,
 * take a look at the Runner action:
 *
 *     class Runner extends b3.Action {
 *       constructor(){
 *         super({name: 'Runner'});
 *       }
 *       tick(tick) {
 *         return b3.RUNNING;
 *       }
 *     };
 *
 * @module b3
 * @class Action
 * @extends BaseNode
 **/

module.exports = class Action extends BaseNode {

    /**
     * Creates an instance of Action.
     * @param {Object} [options]
     * @param {String} [options.name='Action'] Node name.
     * @param {String} [options.title]
     * @param {Object} [options.properties]
     * @memberof Action
     */
    constructor({name, title, tick, properties} = {}) {
        super({
            category: ACTION,
            name: name || 'action',
            title,
            tick,
            properties
        });
    }

};
