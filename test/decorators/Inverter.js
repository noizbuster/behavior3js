const {stub} = require('sinon');
const {assert} = require('chai');
const TickStub = require('../TickStub');
const Inverter = require('../../src/decorators/Inverter');
const {SUCCESS, FAILURE, ERROR, RUNNING} = require('../../src/constants');

suite('Decorator: Inverter', function() {
    test('Name', function() {
        assert.equal(new Inverter().name, 'Inverter');
    });

    test('Initialization', function() {
        var node = new Inverter();
        assert.equal(node.name, 'Inverter');
    });

    test('Inverting Values', function() {
        var tick = TickStub();
        var child = {'_execute': stub()};
        var node = new Inverter({child: child});
        var status = 0;

        child._execute.returns(SUCCESS);
        status = node._execute(tick);
        assert.equal(status, FAILURE);

        child._execute.returns(FAILURE);
        status = node._execute(tick);
        assert.equal(status, SUCCESS);
    });

    test('Running and Error', function() {
        var tick = TickStub();
        var child = {'_execute': stub()};
        var node = new Inverter({child: child});
        var status = 0;

        child._execute.returns(RUNNING);
        status = node._execute(tick);
        assert.equal(status, RUNNING);

        child._execute.returns(ERROR);
        status = node._execute(tick);
        assert.equal(status, ERROR);
    });

});
