import ChatBoxDetails from '../chat-box-details/ChatBoxDetails';
import ChatBoxMessages from '../chat-box-messages/ChatBoxMessages';
import './chatBox.css'

const ChatBox = () => {
  return (
    <div className='chatBoxContainer'>
      <ChatBoxMessages />
      <ChatBoxDetails />
    </div>
  );
};

export default ChatBox;
