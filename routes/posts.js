const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/Users');
const { verify } = require('../token/verify');

// Create a post
router.post('/', verify, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.put('/:id', verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json('Your post haas been updated');
    } else {
      res.status(403).json('You can only update your posts!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a post
router.delete('/:id', verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log({ id_from_post: post.userId, id_from_body: req.body.userId });
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json('The post haas been deleted');
    } else {
      res.status(403).json('You can only delete your posts');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// like a post
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('The post has been liked');
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('The post has been disliked');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get a post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user's all posts
router.get('/profile/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all posts on timeline
router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
