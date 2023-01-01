import Topbar from '../../components/topbar/Topbar';
import ChatBox from './chat-box/ChatBox';
import ChatMenu from './chat-menu/ChatMenu';
import './messenger.css';
const Messenger = () => {
  return (
    <>
      <Topbar />
      <div className='messengerContainer'>
        <ChatMenu />
        <ChatBox />
      </div>
    </>
  );
};

export default Messenger;
