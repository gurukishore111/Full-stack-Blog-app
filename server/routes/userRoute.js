const express = require('express');
const { User } = require('../model/userModel');
const { Blog } = require('../model/blogModel');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
  const userList = await User.find({}).select('-passwordHash');
  if (!userList) {
    return res
      .status(500)
      .json({ message: 'No User in system', success: false });
  }
  res.json(userList);
});
//Get user by Id
router.get('/:id', async (req, res) => {
  const { id } = req.param;
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) {
    return res.status(500).json({ message: 'No user founded', success: false });
  }
  const blog = await Blog.find({}).populate('author');
  // const blogData = blog.filter((item) => item.author._id === id);
  let blogdata = blog.filter((data) => data.author._id == req.params.id);
  return res.status(200).json({ user: blogdata });
});

router.post('/auth', async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    role: req.body.role,
  });
  user = await user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        message: err,
      });
    }
    if (result) {
      return res.status(200).json(result);
    }
  });
});

router.post('/auth/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: 'The user not founded!' });
  }
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.secret
    );

    res.status(200).send({
      name: user.name,
      id: user.id,
      email: user.email,
      role: user.role,
      token: token,
      isAdmin: user.isAdmin,
    });
  } else {
    return res.status(400).json({ message: 'Please check email & password' });
  }
});

module.exports = router;
