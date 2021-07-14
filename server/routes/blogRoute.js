const express = require('express');
const mongoose = require('mongoose');
const { Blog } = require('../model/blogModel');
const router = express.Router();

//Get Product
router.get('/', async (req, res) => {
  const blogData = await Blog.find({})
    .sort([['date', -1]])
    .populate('author');
  if (!blogData) {
    return res
      .status(500)
      .json({ message: 'No Blog in system', success: false });
  }
  res.json({ posts: blogData });
});
//Get Product by Id
router.get('/:id', async (req, res) => {
  const blogData = await Blog.findById(req.params.id).populate('author');

  if (!blogData) {
    return res
      .status(500)
      .json({ message: 'No blogData founded', success: false });
  }
  res.status(200).json({ posts: blogData });
});
//Add Product
router.post('/', async (req, res) => {
  //console.log(req.body);
  let blog = new Blog({
    postTitle: req.body.post.postTitle,
    description: req.body.post.description,
    image: req.body.post.image,
    author: req.body.post.author,
  });

  blog = await blog.save((err, result) => {
    if (err) {
      //console.log(err);
      return res.status(400).json({ message: 'No Blog Added', success: false });
    }
    return res.status(200).json({ post: result });
  });
});

//Update Products
router.put('/:id', async (req, res) => {
  let blog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      postTitle: req.body.post.postTitle,
      description: req.body.post.description,
      image: req.body.post.image,
      author: req.body.post.author,
    },
    {
      new: true,
    }
  );
  await blog.save((err, result) => {
    if (err) {
      return res
        .status(404)
        .json({ message: 'The Blog not saved', success: false });
    }
    return res.send(result);
  });
});
//Delete blogs
router.delete('/:id', (req, res) => {
  let id = req.params.id;
  Blog.findByIdAndRemove(id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: 'the blog deleted' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'the blog not found' });
      }
    })
    .catch((err) => {
      return res.json(400).json({ success: false, error: err });
    });
});

module.exports = router;
