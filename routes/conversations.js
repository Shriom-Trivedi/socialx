const router = require('express').Router();
const Conversation = require('../models/Conversation');
const Users = require('../models/Users');

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

// Get chatroom data.
router.get('/room', async (req, res) => {
  console.log('HELLO WORLD');
  const { userId } = req.query;
  const { conversationId } = req.body;
  const user = await Users.findOne(userId);
  //   Return if user not exist
  if (!user) res.status(404).json('Not Found');

  const conversation = Conversation.findOne(conversationId);
  console.log(conversation);

  //   TODO: Something is FUCKED here.
  return res.status(200).json(user);
});

module.exports = router;
