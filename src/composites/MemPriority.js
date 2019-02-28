const Composite = require('../core/Composite');
const {ERROR, FAILURE, RUNNING} = require('../constants');

/**
 * MemPriority is similar to Priority node, but when a child returns a
 * `RUNNING` state, its index is recorded and in the next tick the,
 * MemPriority calls the child recorded directly, without calling previous
 * children again.
 *
 * @module b3
 * @class MemPriority
 * @extends Composite
 **/

module.exports = class MemPriority extends Composite {

    /**
     * Creates an instance of MemPriority.
     * @param {Object} params
     * @param {Array} params.children
     * @memberOf MemPriority
     */
    constructor({children = [], title} = {}) {
        super({
            children,
            title,
            name: 'MemPriority',
        });
    }

    /**
     * Open method.
     * @method open
     * @param {b3.Tick} tick A tick instance.
     **/
    open(tick) {
        console.log(`init cursor of tick child of ${this.title}`);
        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick) {
        const child = tick.blackboard.get('runningChild', tick.tree.id, this.id) || 0;
        console.log(`start to give tick to ${this.children.length} children of ${this.title}`);
        console.log(`loaded child cursor : ${child}`);
        for (let i = child; i < this.children.length; i++) {
            console.log(`${i+1}/${this.children.length} give tick ${this.title} > ` + this.children[i].title);
            try {
                const status = this.children[i]._execute(tick);

                console.log(`${i+1}/${this.children.length} get ${status} from ${this.title} > ` + this.children[i].title);
                if (status !== FAILURE) {
                    if (status === RUNNING) {
                        tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                    }
                    return status;
                }
            } catch (e){
                console.error(e);
                return ERROR;
            }
        }
        console.log(`finished to give tick to ${this.children.length} children of ${this.title}`);
        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
        return FAILURE;
    }
};
