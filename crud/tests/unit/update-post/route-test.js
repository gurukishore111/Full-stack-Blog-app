import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | updatePost', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:update-post');
    assert.ok(route);
  });
});
