import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class UpdatePostController extends Controller {
  @service store;
  @service session;

  @tracked postTitle;
  @tracked description;
  @tracked author = this.session.data.authenticated.id;
  @tracked image;
  @action
  update(attr, event) {
    //console.log(attr, event);
    this[attr] = event.target.value;
    //console.log(this.postId);
  }

  @action
  async onsubmit(event) {
    event.preventDefault();
    let self = this;

    function transitionToHome() {
      self.transitionToRoute('index');
    }

    function failure(err) {
      // handle the error
      //console.log(err);
    }
    const { postTitle, description, image, author } = this;
    this.store.findRecord('post', this.postId).then(function (post) {
      post.postTitle = postTitle;
      post.description = description;
      post.image = image;
      post.author = author;
      post.save().then(transitionToHome).catch(failure);
    });
  }
}
