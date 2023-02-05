import './chatBoxMessages.css';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { FileCopyOutlined, CollectionsOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const Message = ({ message, own }) => {
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className='messageTop'>
        <img src='/assets/person/2.jpeg' alt='msgImg' className='messageImg' />
        <p className='messageText'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          debitis neque voluptate saepe, laudantium non quibusdam porro
          molestiae aperiam, unde culpa odit.
        </p>
      </div>
      <div className='messageBottom'>
        <span>2 hours ago</span>
      </div>
    </div>
  );
};

const ChatBoxTopbar = () => {
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
          <img src='/assets/person/2.jpeg' alt='' />
        </div>
        <div className='friendName'>John Doe</div>
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

const MessageInputBox = () => {
  return (
    <div className='messageInputBoxWrapper'>
      <input
        type='text'
        className='messageInputField'
        placeholder='Write your message...'
        name='messageInputBox'
        id='messageInputBox'
      />
      <div className='messageBtnIcons'>
        <Tooltip title='Emoji' arrow>
          <InsertEmoticonIcon fontSize='small' className='messageBtnIconItem' />
        </Tooltip>
        <Tooltip title='Files' arrow>
          <AttachFileIcon fontSize='small' className='messageBtnIconItem' />
        </Tooltip>
        <Tooltip title='Send' arrow>
          <div className='messageSendBtn'>
            <SendIcon className='messageSendIcon' fontSize='medium' />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

const ChatBoxMessages = () => {
  return (
    <div className='chatBoxMessages'>
      <div className='chatBoxMessagesWrapper'>
        <ChatBoxTopbar />
        <div className='messages'>
          <Message />
          <Message own={true} />
          <Message />
          <Message />
          <Message />
        </div>
        <div className='MessageInputBox'>
          <MessageInputBox />
        </div>
      </div>
    </div>
  );
};

export default ChatBoxMessages;
