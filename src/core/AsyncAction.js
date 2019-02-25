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
    constructor({name = 'AsyncAction', title, properties, tick, onResolve, onReject} = {}) {
        /**
         * @member {string} name
         */
        super({
            category: ACTION,
            name: name || 'AsyncAction',
            title: title,
            tick: tick,
            properties: _.assign(properties, {timeout: -1}),
        });

        this.onResolve = onResolve;
        this.onReject = onReject;
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
        const result = this.asyncTick(tick);
        if (tick.debug) {
            console.log(`tick result:\t${this.title}: ` + result);
        }
        return result;
    }

    asyncTick(tick) {
        const bb = tick.blackboard;
        const l = tick.target.logger;

        if (this.isCalled) {
            return bb.get('status', tick.tree.id, this.id);
        } else {
            this.isCalled = true;
        }

        this.updateTimeout();
        this.tick(tick).then(
            (result) => {
                let status = bb.get('status', tick.tree.id, this.id);
                if (status !== RUNNING) {
                    // l.w('run() resolved after timeout, the result gonna ignored');
                    status = FAILURE;
                    return;
                }
                if (typeof (this.onResolve) === 'function') {
                    this.onResolve(tick, result)
                }
                if (result === SUCCESS || result === FAILURE) {
                    status = result;
                } else {
                    // l.w('run() pf AsyncAction should return SUCCESS or FAILURE only');
                    status = ERROR;
                }
                l.i(`AsyncAction ${this.name} ${this.title} has resolved with result` + result);
                bb.set('status', status, tick.tree.id, this.id);
            }).catch(
            (err) => {
                let status = bb.get('status', tick.tree.id, this.id);
                if (status !== RUNNING) {
                    // l.w('run() resolved after timeout, the result gonna ignored');
                    return;
                }
                if (typeof (this.onReject) === 'function') {
                    this.onReject(tick, err)
                }
                status = FAILURE;
                // l.w(`Error on run() of ${this.name} ${this.title}`, {err: err, message: _.get(err, 'message')});
                bb.set('status', status, tick.tree.id, this.id);
            });
        return bb.get('status', tick.tree.id, this.id);
    }

    close(tick) {
        this.isCalled = false;
    }
}

module.exports = AsyncAction;
