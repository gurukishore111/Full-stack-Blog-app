import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  async restore(data) {
    let { token } = data;
    if (token) {
      return data;
    } else {
      throw 'no valid session data';
    }
  },

  async authenticate(email, password) {
    //console.log(email, password);
    let res = await fetch(
      'https://blog-app-api123.herokuapp.com/users/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (res.ok) {
      return res.json();
    } else {
      let err = await res.json();
      throw err;
    }
  },
  async invalidate(data) {},
});
