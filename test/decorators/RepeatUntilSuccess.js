const {stub} = require('sinon');
const {assert} = require('chai');
const TickStub = require('../TickStub');
const RepeatUntilSuccess = require('../../src/decorators/RepeatUntilSuccess');
const {SUCCESS, FAILURE, RUNNING, ERROR} = require('../../src/constants');

suite('Decorator: RepeatUntilSuccess', function() {
    test('Name', function() {
        assert.equal(new RepeatUntilSuccess().name, 'RepeatUntilSuccess');
    });

    test('Initialization', function() {
        var node = new RepeatUntilSuccess();
        assert.equal(node.maxLoop, -1);
        assert.equal(node.name, 'RepeatUntilSuccess');

        var node = new RepeatUntilSuccess({maxLoop:5});
        assert.equal(node.maxLoop, 5);
    });

    test('Test Maximum Repetition', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': stub()};
        child._execute.returns(FAILURE);

        var node = new RepeatUntilSuccess({maxLoop:7, child:child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 7);
        assert.equal(status, FAILURE);
    });

    test('Test Repeat interruption (by SUCCESS)', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': stub()};
        child._execute.returns(FAILURE);
        child._execute.onCall(3).returns(SUCCESS);

        var node = new RepeatUntilSuccess({maxLoop:50, child:child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 4);
        assert.equal(status, SUCCESS);
    });

    test('Test Repeat interruption (by RUNNING)', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': stub()};
        child._execute.returns(FAILURE);
        child._execute.onCall(5).returns(RUNNING);

        var node = new RepeatUntilSuccess({maxLoop:50, child:child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 6);
        assert.equal(status, RUNNING);
    });

    test('Test Repeat interruption (by ERROR)', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': stub()};
        child._execute.returns(FAILURE);
        child._execute.onCall(3).returns(ERROR);

        var node = new RepeatUntilSuccess({maxLoop:50, child:child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 4);
        assert.equal(status, ERROR);
    });

});
