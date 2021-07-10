import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PostDetailsController extends Controller {
  @service store;
  @action
  deleteItem(id) {
    let self = this;

    function transitionToHome() {
      self.transitionToRoute('index');
    }

    function failure(err) {
      // handle the error
      console.log(err);
    }
    if (confirm('Are you sure to remove this content ?')) {
      let post = this.store.peekRecord('post', id);
      post.destroyRecord().then(transitionToHome).catch(failure); // => DELETE to /posts/2
    }
  }
}
