import Component from '@glimmer/component';

export default class PostBoxFilterComponent extends Component {
  get results() {
    let { posts, query } = this.args;
    if (query) {
      //console.log(posts.postTitle, 'Ihhhhhhhhh');
      posts = posts.filter((post) =>
        post.postTitle.toLowerCase().includes(query.toLowerCase())
      );
    }
    return posts;
  }
}
