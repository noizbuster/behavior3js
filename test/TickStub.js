const {spy, stub} = require('sinon');

module.exports = function TickStub() {
  return {
    'tree'      : {'id': 'tree1'},
    'blackboard': {
      'set': spy(),
      'get': stub()
    },
    'openNodes' : [],
    'nodeCount' : 0,

    '_enterNode' : spy(),
    '_openNode'  : spy(),
    '_tickNode'  : spy(),
    '_closeNode' : spy(),
    '_exitNode'  : spy(),
  };
}
