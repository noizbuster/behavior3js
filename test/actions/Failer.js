const {assert} = require('chai');
const TickStub = require('../TickStub');
const Failer = require('../../src/actions/Failer');
const {FAILURE} = require('../../src/constants');

suite('Action: Failer', function() {
    test('Name', function() {
        assert.equal(new Failer().name, 'Failer');
    });

    test('Tick', function() {
        var failer = new Failer();

        var status = failer._execute(TickStub());
        assert.equal(status, FAILURE);
    });
});
