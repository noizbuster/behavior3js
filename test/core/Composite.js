const {assert} = require('chai');
const Composite = require('../../src/core/Composite');
const {COMPOSITE} = require('../../src/constants');

suite('Core: Composite', function() {
    test('Category', function() {
        assert.equal(new Composite().category, COMPOSITE);
    });

    test('Initialization', function() {
        var node = new Composite({children:['child1', 'child2']});

        assert.isOk(node.id);
        assert.isDefined(node.title);
        assert.isDefined(node.description);
        assert.isOk(node.children);

        assert.equal(node.category, 'composite');
        assert.equal(node.children[0], 'child1');
        assert.equal(node.children[1], 'child2');
    });
});
