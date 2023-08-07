import { useState } from 'react';
import ChatBoxDetails from '../chat-box-details/ChatBoxDetails';
import ChatBoxMessages from '../chat-box-messages/ChatBoxMessages';
import './chatBox.css';

const ChatBox = ({ messages, currentChat, updateMessages, scrollRef }) => {
  const [isChatBoxDetails, setChatBoxDetails] = useState(false);

  return (
    <div className='chatBoxContainer'>
      {currentChat ? (
        <>
          <ChatBoxMessages
            messages={messages}
            currentChat={currentChat}
            updateMessages={updateMessages}
            scrollRef={scrollRef}
          />
          {isChatBoxDetails && <ChatBoxDetails />}
        </>
      ) : (
        <span className='selectConversation'>Select a chatroom to chat!</span>
      )}
    </div>
  );
};

export default ChatBox;
