import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PostDetailsRoute extends Route {
  async model(params) {
    const { id } = params;
    //we can using findRecord, its give get request to backend (post/:id) request,in this case ,I not have  get:id route in backend
    const post = await this.store.findRecord('post', id);
    return post;
  }
}
