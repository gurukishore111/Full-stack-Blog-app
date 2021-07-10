import Model, { attr } from '@ember-data/model';

export default class PostModel extends Model {
  @attr('string') postTitle;
  @attr('string') author;
  @attr('string') description;
  @attr('string') date;
  @attr('string') image;
}
