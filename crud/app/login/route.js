import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service session;

  beforeModel() {
    //opposite of authenticate
    this.session.prohibitAuthentication('index');
  }
}
