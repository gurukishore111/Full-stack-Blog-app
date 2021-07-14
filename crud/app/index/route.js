import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    const posts = await this.store.findAll('post');
    //console.log(posts);
    this.content = posts;
    return posts;
  }
}
