import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class UpdatePostController extends Controller {
  @service store;
  @tracked postTitle;
  @tracked description;
  @tracked author = 'Guru Kishore';
  @tracked image;
  @tracked postId;

  @action
  update(attr, event) {
    console.log(attr, event);
    this[attr] = event.target.value;
    console.log(this.postId);
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
      console.log(err);
    }
    console.log(this.postId, this.postTitle, this.description, this.image);
    let res = await fetch(`http://localhost:9000/posts/${this.postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postTitle: this.postTitle,
        image: this.image,
        description: this.description,
        author: this.author,
      }),
    });

    if (res.ok) {
      transitionToHome();
      return res.json();
    } else {
      let err = await res.text();
      failure(err);
      throw new Error(err);
    }
  }

  // this.store.findRecord('post', this.postId).then(function (post) {
  //   post.postTitle = this.postTitle;
  //   post.description = this.description;
  //   post.image = this.image;
  //   post.author = this.author;
  //   post.save().then(transitionToHome).catch(failure);
  // });
}
