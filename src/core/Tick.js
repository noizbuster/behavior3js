/**
 * A new Tick object is instantiated every tick by BehaviorTree. It is passed
 * as parameter to the nodes through the tree during the traversal.
 *
 * The role of the Tick class is to store the instances of tree, debug,
 * target and blackboard. So, all nodes can access these information.
 *
 * For internal uses, the Tick also is useful to store the open node after
 * the tick signal, in order to let `BehaviorTree` to keep track and close
 * them when necessary.
 *
 * This class also makes a bridge between nodes and the debug, passing the
 * node state to the debug if the last is provided.
 *
 * @class Tick
 **/

module.exports = class Tick {

    /**
     * Initialization method.
     * @method initialize
     * @constructor
     **/
    constructor() {
        // set by BehaviorTree

        /**
         * The tree reference.
         * @property {BehaviorTree} tree
         * @readOnly
         **/
        this.tree = null;

        /**
         * The debug reference.
         * @property {Object} debug
         * @readOnly
         */
        this.debug = null;

        /**
         * The target object reference.
         * @property {Object} target
         * @readOnly
         **/
        this.target = null;

        /**
         * The blackboard reference.
         * @property {Blackboard} blackboard
         * @readOnly
         **/
        this.blackboard = null;

        // updated during the tick signal

        /**
         * The list of open nodes. Update during the tree traversal.
         * @property {Array} _openNodes
         * @protected
         * @readOnly
         **/
        this._openNodes = [];

        /**
         * The number of nodes entered during the tick. Update during the tree
         * traversal.
         *
         * @property {number} _nodeCount
         * @protected
         * @readOnly
         **/
        this._nodeCount = 0;
        this.debugLog = function (node) {
            return `\t${node.title} - ${node.name} - ${node.id}`;
        };
    }

    /**
     * Called when entering a node (called by BaseNode).
     * @method _enterNode
     * @param {Object} node The node that called this method.
     * @protected
     **/
    _enterNode(node) {
        this._nodeCount++;
        this._openNodes.push(node);
        if (this.debug) {
            console.log('enter node', this.debugLog(node));
        }

        // TODO: call debug here
    }

    /**
     * Callback when opening a node (called by BaseNode).
     * @method _openNode
     * @param {Object} node The node that called this method.
     * @protected
     **/
    _openNode(node) {
        if (this.debug) {
            console.log('open node', this.debugLog(node));
        }
        // TODO: call debug here
    }

    /**
     * Callback when ticking a node (called by BaseNode).
     * @method _tickNode
     * @param {Object} node The node that called this method.
     * @protected
     **/
    _tickNode(node) {
        if (this.debug) {
            console.log('tick node', this.debugLog(node));
        }
        // TODO: call debug here
    }

    /**
     * Callback when closing a node (called by BaseNode).
     * @method _closeNode
     * @param {Object} node The node that called this method.
     * @protected
     **/
    _closeNode(node) {
        if (this.debug) {
            console.log('close node', this.debugLog(node));
        }
        // TODO: call debug here
        this._openNodes.pop();
    }

    /**
     * Callback when exiting a node (called by BaseNode).
     * @method _exitNode
     * @param {Object} node The node that called this method.
     * @protected
     **/
    _exitNode(node) {
        if (this.debug) {
            console.log('exit node', this.debugLog(node));
        }
        // TODO: call debug here
    }
};
