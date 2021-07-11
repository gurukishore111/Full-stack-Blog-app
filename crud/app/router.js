import EmberRouter from '@ember/routing/router';
import config from 'crud/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('postDetails', { path: 'posts/:id' });
  this.route('createPost', { path: 'add/post' });
  this.route('updatePost', { path: 'edit/post/:id' });
  this.route('notFounded', { path: '/*path' });
});
