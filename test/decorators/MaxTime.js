const {stub} = require('sinon');
const {assert} = require('chai');
const TickStub = require('../TickStub');
const MaxTime = require('../../src/decorators/MaxTime');
const {RUNNING, FAILURE, SUCCESS} = require('../../src/constants');

suite('Decorator: MaxTime', function() {
    test('Name', function() {
        assert.equal(new MaxTime({maxTime: 15}).name, 'MaxTime');
    });

    test('Failure test', function() {
        var tick = TickStub();
        var child = {'_execute': stub()};
        child._execute.returns(RUNNING);

        var node = new MaxTime({maxTime: 15, child});
        var startTime = (new Date()).getTime();

        tick.blackboard.get.returns(startTime - 14);
        assert.equal(node.tick(tick), RUNNING);

        tick.blackboard.get.returns(startTime - 16);
        assert.equal(node.tick(tick), FAILURE);
    });

    test('Success test', function() {
        var tick = TickStub();
        var child = {'_execute': stub()};
        child._execute.returns(SUCCESS);

        var node = new MaxTime({maxTime: 15, child});
        var startTime = (new Date()).getTime();

        tick.blackboard.get.returns(startTime - 14);
        assert.equal(node.tick(tick), SUCCESS);
    });
});
