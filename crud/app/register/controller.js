import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RegisterController extends Controller {
  @service store;
  @tracked email;
  @tracked name;
  @tracked role;
  @tracked password;
  @tracked error;

  @action
  update(attr, event) {
    console.log(attr, event);
    this[attr] = event.target.value;
    console.log(this.postId);
  }

  @action
  async onsubmit(event) {
    event.preventDefault();
    console.log(this.password, this.name, this.role, this.email);
    let self = this;

    function transitionToLogin() {
      self.transitionToRoute('login');
    }

    function failure(err) {
      // handle the error
      console.log(err);
      JSON.stringify(err);
    }
    let res = await fetch('http://localhost:9000/users/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
        name: this.name,
        role: this.role,
      }),
    });
    if (res.ok) {
      transitionToLogin();
      return res.json();
    } else {
      let err = await res.json();
      this.error = 'Email is already taken!';
      throw err;
    }
  }
}
