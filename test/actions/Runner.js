const {assert} = require('chai');
const TickStub = require('../TickStub');
const Runner = require('../../src/actions/Runner');
const {RUNNING} = require('../../src/constants');

suite('Action: Runner', function() {
    test('Name', function() {
        assert.equal(new Runner().name, 'Runner');
    });

    test('Tick', function() {
        var failer = new Runner();

        var status = failer._execute(TickStub());
        assert.equal(status, RUNNING);
    });
});
