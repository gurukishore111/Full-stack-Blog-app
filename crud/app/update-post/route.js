import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class UpdatePostRoute extends Route {
  @tracked id;
  async model(params) {
    const { id } = params;
    this.id = id;
    //we can using findRecord, its give get request to backend (post/:id) request,in this case ,I not have  get:id route in backend
    const data = await this.store
      .findRecord('post', id)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        this.transitionTo('notFounded', 404);
      });
  }

  // accessing the controller
  setupController(controller, model) {
    super.setupController(controller, model);
    if (this.id) {
      this.store.findRecord('post', this.id).then(function (postData) {
        controller.set('postTitle', postData.postTitle);
        controller.set('image', postData.image);
        controller.set('description', postData.description);
        controller.set('postId', postData.id);
      });
    }
  }
}
