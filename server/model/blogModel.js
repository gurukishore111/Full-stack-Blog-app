const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  postTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

blogSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

blogSchema.set('toJSON', {
  virtuals: true,
});

exports.Blog = mongoose.model('blog', blogSchema);
