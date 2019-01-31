const {assert} = require('chai');
const TickStub = require('../TickStub');
const Error = require('../../src/actions/Error');
const {ERROR} = require('../../src/constants');

suite('Action: Error', function() {
    test('Name', function() {
        assert.equal(new Error().name, 'Error');
    });

    test('Tick', function() {
        var failer = new Error();

        var status = failer._execute(TickStub());
        assert.equal(status, ERROR);
    });
});
