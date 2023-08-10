import './chatBoxMessages.css';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { FileCopyOutlined, CollectionsOutlined } from '@mui/icons-material';
import { useContext, useEffect, useRef, useState } from 'react';
import { Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { AuthContext } from '../../../context/Auth/AuthContext';
import axios from 'axios';
import { format } from 'timeago.js';

const Message = ({ msg, own, friend, user }) => {
  const userImg = own
    ? user?._doc?.profilePicture
    : friend?.profilePicture || '/assets/person/no-profilepic.jpg';
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className='messageTop'>
        <img src={userImg} alt='msgImg' className='messageImg' />
        <p className='messageText'>{msg?.text}</p>
      </div>
      <div className='messageBottom'>
        <span>{format(msg?.createdAt)}</span>
      </div>
    </div>
  );
};

const ChatBoxTopbar = ({ user }) => {
  const [activeTab, setActiveTab] = useState('messages');

  const navItems = [
    {
      name: 'messages',
      icon: (
        <Tooltip title='Messages' arrow>
          <ChatOutlinedIcon />
        </Tooltip>
      ),
      onClick: () => {
        setActiveTab('messages');
      },
    },
    {
      name: 'media',
      icon: (
        <Tooltip title='media' arrow>
          <CollectionsOutlined />
        </Tooltip>
      ),
      onClick: () => {
        setActiveTab('media');
      },
    },
    {
      name: 'files',
      icon: (
        <Tooltip title='Files' arrow>
          <FileCopyOutlined />
        </Tooltip>
      ),
      onClick: () => {
        setActiveTab('files');
      },
    },
  ];

  return (
    <div className='chatBoxTopbar'>
      <div className='friendInfo'>
        <div className='friendImg'>
          <img
            src={user?.profilePicture || '/assets/person/no-profilepic.jpg'}
            alt='friendImg'
          />
        </div>
        <div className='friendName'>{user?.name}</div>
      </div>
      <ul className='messages_topbarIcons'>
        {navItems.map((item) => {
          const { name, icon, onClick } = item;
          return (
            <li
              className={`messages_topbarIconItem ${
                name === activeTab ? 'messages_activeIcon' : ''
              }`}
              onClick={onClick}
            >
              {icon}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const MessageInputBox = ({ currentChat, updateMessages, socket }) => {
  const textRef = useRef();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._doc._id,
      text: textRef.current.value,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((m) => m !== user._doc._id);

    socket?.current.emit('sendMessage', {
      senderId: user._doc._id,
      receiverId: receiverId,
      text: textRef?.current?.value,
    });

    try {
      const res = await axios.post('/message', message);
      updateMessages(res.data);
      textRef.current.value = '';
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className='messageInputBoxWrapper'>
      <input
        type='text'
        className='messageInputField'
        placeholder='Write your message...'
        name='messageInputBox'
        id='messageInputBox'
        ref={textRef}
      />
      <div className='messageBtnIcons'>
        <Tooltip title='Emoji' arrow>
          <InsertEmoticonIcon fontSize='small' className='messageBtnIconItem' />
        </Tooltip>
        <Tooltip title='Files' arrow>
          <AttachFileIcon fontSize='small' className='messageBtnIconItem' />
        </Tooltip>
        <Tooltip title='Send' arrow>
          <div className='messageSendBtn' onClick={handleSubmit}>
            <SendIcon className='messageSendIcon' fontSize='medium' />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

const ChatBoxMessages = ({
  messages,
  currentChat,
  updateMessages,
  scrollRef,
  socket,
}) => {
  const { user } = useContext(AuthContext);
  const [chatuser, setChatUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/users?userId=${currentChat.members[1]}`);
      setChatUser(res.data);
    };
    getUser();
  }, [currentChat?.members]);

  return (
    <div className='chatBoxMessages'>
      <div className='chatBoxMessagesWrapper'>
        <ChatBoxTopbar user={chatuser} />
        <div className='messages'>
          {messages.map((msg) => (
            <div ref={scrollRef}>
              <Message
                msg={msg}
                own={msg.sender === user._doc._id}
                friend={chatuser}
                user={user}
              />
            </div>
          ))}
        </div>
        <div className='MessageInputBox'>
          <MessageInputBox
            currentChat={currentChat}
            updateMessages={updateMessages}
            socket={socket}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBoxMessages;
