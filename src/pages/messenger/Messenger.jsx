import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/Auth/AuthContext';
import ChatBox from './chat-box/ChatBox';
import ChatMenu from './chat-menu/ChatMenu';
import './messenger.css';
const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentchat] = useState(null);
  const { user } = useContext(AuthContext);
  const queryClient = new QueryClient();
  const scrollRef = useRef();

  // Fetch conversations
  const conversationsQuery = useQuery(
    ['conversations-data', user?._doc._id],
    async () => {
      try {
        const data = await axios.get(`/conversation/${user?._doc?._id}`);
        return data.data;
      } catch (err) {
        console.error(err);
      }
    },
    {
      onSuccess: (data) => {
        setConversations(data);
      },
    }
  );

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/message/${currentChat?._id}`);
        setMessages(res?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const { isLoading } = conversationsQuery;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Topbar />
      <div className='messengerContainer'>
        <ChatMenu
          conversations={conversations}
          currentUser={user}
          setCurrentchat={setCurrentchat}
        />
        <ChatBox
          messages={messages}
          currentChat={currentChat}
          updateMessages={(newMessage) =>
            setMessages([...messages, newMessage])
          }
          scrollRef={scrollRef}
        />
      </div>
    </QueryClientProvider>
  );
};

export default Messenger;
