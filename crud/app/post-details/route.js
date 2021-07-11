import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PostDetailsRoute extends Route {
  @service store;
  async model(params) {
    const { id } = params;
    //we can using findRecord, its give get request to backend (post/:id) request,in this case ,I not have  get:id route in backend
    const post = await this.store.findRecord('post', id);
    post['id'] = id;
    console.log(post, 'new');
    return post;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    if (this.userId) {
      this.store.findRecord('user', this.userId).then(function (posts) {
        controller.set('posts', posts);
        console.log(posts);
      });
    }
  }
}
