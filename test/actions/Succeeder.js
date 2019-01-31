const {assert} = require('chai');
const TickStub = require('../TickStub');
const Succeeder = require('../../src/actions/Succeeder');
const {SUCCESS} = require('../../src/constants');

suite('Action: Succeeder', function() {
    test('Name', function() {
        assert.equal(new Succeeder().name, 'Succeeder');
    });

    test('Tick', function() {
        var failer = new Succeeder();

        var status = failer._execute(TickStub());
        assert.equal(status, SUCCESS);
    });
});
