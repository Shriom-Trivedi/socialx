import axios from 'axios';
import { useContext, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/Auth/AuthContext';
import ChatBox from './chat-box/ChatBox';
import ChatMenu from './chat-menu/ChatMenu';
import './messenger.css';
const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const queryClient = new QueryClient();

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

  const { isLoading } = conversationsQuery;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Topbar />
      <div className='messengerContainer'>
        <ChatMenu conversations={conversations} currentUser={user} />
        <ChatBox messages={messages} />
      </div>
    </QueryClientProvider>
  );
};

export default Messenger;
