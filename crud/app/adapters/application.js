import RESTAPIAdapter from '@ember-data/adapter/rest';

export default class ApplicationAdapter extends RESTAPIAdapter {
  host = ' https://blog-app-api123.herokuapp.com';

  buildURL(...args) {
    return `${super.buildURL(...args)}`;
  }
}
