const {assert} = require('chai');
const Action = require('../../src/core/Action');
const {ACTION} = require('../../src/constants');

suite('Core: Action', function() {
    test('Category', function() {
        assert.equal(new Action().category, ACTION);
    });

    test('Initialization', function() {
        var node = new Action();

        assert.isOk(node.id);
        assert.isDefined(node.title);
        assert.isDefined(node.description);
        assert.equal(node.category, 'action');
    });
});
