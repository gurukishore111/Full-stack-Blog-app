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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
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

//60ea671c8978a00899af324a
