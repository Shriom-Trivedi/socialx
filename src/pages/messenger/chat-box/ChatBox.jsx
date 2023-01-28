import { useState } from 'react';
import ChatBoxDetails from '../chat-box-details/ChatBoxDetails';
import ChatBoxMessages from '../chat-box-messages/ChatBoxMessages';
import './chatBox.css';

const ChatBox = () => {
  const [isChatBoxDetails, setChatBoxDetails] = useState(false);
  return (
    <div className='chatBoxContainer'>
      <ChatBoxMessages />
      {isChatBoxDetails && <ChatBoxDetails />}
    </div>
  );
};

export default ChatBox;
