const router = require('express').Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Users = require('../models/Users');
const { ObjectId } = require('mongodb');

// NOTE: Important API's should be present at top.

// Create new conversation
router.post('/', async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.recieverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get chatroom data.
router.get('/chatroom', async (req, res) => {
  const { userId, conversationId } = req.query;
  // const { conversationId } = req.body;
  const user = await Users.findOne({ _id: ObjectId(userId) }).lean();
  //   Return if user not exist
  if (!user) res.status(404).json('Not Found');
  const conversation = await Conversation.findOne({
    _id: ObjectId(conversationId),
  }).lean();

  const lastConversation = await Message.findOne({
    conversationId: conversationId,
  })
    .select('text createdAt -_id')
    .sort({ _id: -1 }).lean();

  const result = {
    ...user,
    ...conversation,
    ...lastConversation,
  };
  return res.status(200).json(result);
});

// Get conversations of a user
router.get('/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
