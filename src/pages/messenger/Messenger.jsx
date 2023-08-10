import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/Auth/AuthContext';
import ChatBox from './chat-box/ChatBox';
import ChatMenu from './chat-menu/ChatMenu';
import './messenger.css';
import { io } from 'socket.io-client';

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentchat] = useState(null);
  const [msgsFromSocket, setMsgsFromSocket] = useState(null);
  const { user } = useContext(AuthContext);
  const queryClient = new QueryClient();
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', (data) => {
      setMsgsFromSocket({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // socket operations
  useEffect(() => {
    socket?.current.emit('addUser', user._doc._id);
    socket?.current.on('getUsers', (users) => {});
  }, [user._doc]);

  useEffect(() => {
    msgsFromSocket &&
      currentChat?.members.includes(msgsFromSocket.sender) &&
      setMessages((prevMsgs) => [...prevMsgs, msgsFromSocket]);
  }, [msgsFromSocket, currentChat]);

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
          socket={socket}
          scrollRef={scrollRef}
        />
      </div>
    </QueryClientProvider>
  );
};

export default Messenger;
