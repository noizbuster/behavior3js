const {assert} = require('chai');
const Condition = require('../../src/core/Condition');
const {CONDITION} = require('../../src/constants');

suite('Core: Condition', function() {
    test('Category', function() {
        assert.equal(new Condition().category, CONDITION);
    });

    test('Initialization', function() {
        var node = new Condition();

        assert.isOk(node.id);
        assert.isDefined(node.title);
        assert.isDefined(node.description);
        assert.equal(node.category, 'condition');
    });

});
