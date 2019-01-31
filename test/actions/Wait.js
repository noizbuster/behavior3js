const {assert} = require('chai');
const TickStub = require('../TickStub');
const Wait = require('../../src/actions/Wait');
const {RUNNING, SUCCESS} = require('../../src/constants');

suite('Action: Wait', function() {
    test('Name', function() {
        assert.equal(new Wait().name, 'Wait');
    });

    test('Constructor', function() {
        assert.equal(new Wait().endTime, 0);
        assert.equal(new Wait({}).endTime, 0);
        assert.equal(new Wait({milliseconds: 1300}).endTime, 1300);
    });

    test('Wait.open', function() {
        var now = Date.now();
        var wait = new Wait({milliseconds: 100});
        wait.id = 'node1';
        var tick = TickStub();

        wait.open(tick);
        assert.equal(tick.blackboard.set.callCount, 1);
        assert.equal(tick.blackboard.set.firstCall.args[0], 'startTime');
        assert.equal(tick.blackboard.set.firstCall.args[2], 'tree1');
        assert.equal(tick.blackboard.set.firstCall.args[3], 'node1');
    });

    test('Wait.tick', function () {
        var wait = new Wait({milliseconds: 100});
        var now = Date.now();
        wait.id = 'node1';
        var tick = TickStub();

        tick.blackboard.get.returns(now - 99);
        assert.equal(wait.tick(tick), RUNNING);

        tick.blackboard.get.returns(now - 101);
        assert.equal(wait.tick(tick), SUCCESS);
    });
});
