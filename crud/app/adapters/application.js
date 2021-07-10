import RESTAPIAdapter from '@ember-data/adapter/rest';

export default class ApplicationAdapter extends RESTAPIAdapter {
  host = ' http://localhost:9000';

  buildURL(...args) {
    return `${super.buildURL(...args)}`;
  }
}
