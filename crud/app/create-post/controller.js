import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class CreatePostController extends Controller {
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
  }

  @action
  async onsubmit(event) {
    let self = this;

    function transitionToHome() {
      self.transitionToRoute('index');
    }

    function failure(err) {
      // handle the error
      //console.log(err);
    }
    event.preventDefault();
    let post = this.store.createRecord('post', {
      postTitle: this.postTitle,
      description: this.description,
      image: this.image,
      author: this.author,
    });

    post.save().then(transitionToHome).catch(failure); // => POST to '/posts'
  }
}
