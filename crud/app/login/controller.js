import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service store;
  @service session;

  @tracked email;
  @tracked password;
  @tracked error;

  @action
  async onsubmit(event) {
    //console.log(this.email, this.password);
    event.preventDefault();
    try {
      await this.session.authenticate(
        'authenticator:token',
        this.email,
        this.password
      );
    } catch (error) {
      //console.log(error.message);
      this.error = error.message;
    }
  }

  @action
  update(attr, event) {
    //console.log(attr, event);
    this[attr] = event.target.value;
    //console.log(this.postId);
  }
}
