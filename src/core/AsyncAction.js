const _ = require('lodash');
const BaseNode = require('../core/BaseNode');
const {ACTION, RUNNING, SUCCESS, FAILURE, ERROR} = require('../constants');

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

/**
 * @typedef {object} workerConfig
 * @property {string} taskDir
 * @property {string} logDir
 * @property {string} uuid
 */
class AsyncAction extends BaseNode {

    /**
     * @constructor
     */
    constructor({name = 'AsyncAction', title, properties, tick} = {}) {
        /**
         * @member {string} name
         */
        super({
            category: ACTION,
            name: name || 'AsyncAction',
            title: title,
            properties: _.assign(properties, {timeout: -1}),
        });

        this.tick = tick;
    }

    /**
     * reset timeout in milliseconds
     * if neither parameter and timeout property are not valid, unset the timeout
     * @param {number} [t] in milliseconds
     */
    updateTimeout(t) {
        if (this.deadline) {
            clearTimeout(this.deadline);
        }
        if (t || this.timeout !== -1) {
            this.deadline = setTimeout(() => {
                // console.info('Timeout on AsyncAction: ' + this.name);
                this.status = FAILURE;
            }, t || this.timeout);
        }
    }

    get timeout() {
        return this.properties.timeout;
    }

    set timeout(t) {
        this.properties.timeout = t;
        this.updateTimeout(this.properties.timeout);
        return t;
    }

    /**
     * Wrapper for tick method.
     * @method _tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     * @protected
     **/
    _tick(tick) {
        tick._tickNode(this);
        try {
            const result = this.asyncTick(tick);
            if (tick.debug) {
                console.log(`tick result:\t${this.title}: ` + result);
            }
            return result;
        } catch (e) {
            console.error(`failed to running AsyncAction: ${this.title}`, e);
            return FAILURE;
        }
    }

    asyncTick(tick) {
        const bb = tick.blackboard;
        const l = tick.target.logger;

        if (bb.get('isCalled', tick.tree.id, this.id)) {
            return bb.get('status', tick.tree.id, this.id);
        } else {
            bb.set('isCalled', true, tick.tree.id, this.id);
        }

        this.updateTimeout();
        this.tick(tick)
            .then((result) => {
                let status = bb.get('status', tick.tree.id, this.id);

                if (status !== RUNNING) {
                    console.log('run() resolved after timeout, the result gonna ignored');
                    status = FAILURE;
                    return;
                }
                if (result === SUCCESS || result === FAILURE) {
                    status = result;
                } else {
                    l.w('tick() of AsyncAction should return SUCCESS or FAILURE only');
                    status = ERROR;
                }

                if (result !== SUCCESS) {
                    l.w(`AsyncAction ${this.name} ${this.title} has resolved with result ` + result);
                } else {
                    l.i(`AsyncAction ${this.name} ${this.title} has resolved with result ` + result);
                }
                bb.set('status', status, tick.tree.id, this.id);
            })
            .catch((err) => {
                let status = bb.get('status', tick.tree.id, this.id);

                if (status !== RUNNING) {
                    l.w('run() resolved after timeout, the result gonna ignored');
                    return;
                }
                status = FAILURE;
                l.e(`Error on run() of ${this.name} ${this.title}`, {
                    err: err,
                    message: _.get(err, 'message')
                });

                bb.set('status', status, tick.tree.id, this.id);
            });
        return bb.get('status', tick.tree.id, this.id);
    }

    close(tick) {
        tick.blackboard.set('isCalled', false, tick.tree.id, this.id);
    }
}

module.exports = AsyncAction;
