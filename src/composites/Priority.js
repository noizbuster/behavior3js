import Composite from '../core/Composite';
import {FAILURE} from '../constants';

/**
 * Priority ticks its children sequentially until one of them returns
 * `SUCCESS`, `RUNNING` or `ERROR`. If all children return the failure state,
 * the priority also returns `FAILURE`.
 *
 * @module b3
 * @class Priority
 * @extends Composite
 **/

export default class Priority extends Composite {

  /**
   * Tick method.
   * @method tick
   * @param {Tick} tick A tick instance.
   * @return {Constant} A state constant.
   **/
  tick(tick) {
    for (var i=0; i<this.children.length; i++) {
      var status = this.children[i]._execute(tick);

      if (status !== FAILURE) {
        return status;
      }
    }

    return FAILURE;
  }
};

/**
 * Node name. Default to `Priority`.
 * @property {String} name
 * @readonly
 **/
Priority.prototype.name = 'Priority';
