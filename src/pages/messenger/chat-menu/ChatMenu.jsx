import { Search } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth/AuthContext';
import './chatMenu.css';
import { format } from 'timeago.js';

const chatMenuData = [
  {
    id: 1,
    name: 'John Wick',
    timeStamp: '11:13',
    profilePicture: '/assets/person/1.jpeg',
    msg: 'Thanks for the Christmas Gift ✏️🎁',
  },
  {
    id: 2,
    name: 'John Doe',
    timeStamp: '10:32',
    profilePicture: '/assets/person/2.jpeg',
    msg: 'Great game man, it was fun!',
  },
  {
    id: 3,
    name: 'Sally Watson',
    timeStamp: 'Yesterday',
    profilePicture: '/assets/person/3.jpeg',
    msg: "OMG! you are so funny! xd. Let's meet this Saturday!",
  },
  {
    id: 4,
    name: 'Lily Singh',
    timeStamp: '01/01/2023',
    profilePicture: '/assets/person/4.jpeg',
    msg: 'Are you ignoring me?',
  },
  {
    id: 5,
    name: 'Rishabh Sen',
    timeStamp: '28/12/2022',
    profilePicture: '/assets/person/5.jpeg',
    msg: 'Ay we going party tomorrow, You coming?',
  },
  {
    id: 6,
    name: 'Office Buddies 🍹',
    timeStamp: '28/12/2022',
    profilePicture: '/assets/person/6.jpeg',
    msg: 'Letsssssssss partaaaaaaaaaaay?',
  },
  {
    id: 7,
    name: 'Priya Raj',
    timeStamp: '20/12/2022',
    profilePicture: '/assets/person/7.jpeg',
    msg: 'Yeah I kinda liked the movie ngl.',
  },
  {
    id: 8,
    name: 'Whaddup Fam',
    timeStamp: '01/12/2022',
    profilePicture: '/assets/person/2.jpeg',
    msg: "Are you guys seeing this too, or I'm hallucinating?",
  },
  {
    id: 9,
    name: 'Jane Doe',
    timeStamp: '01/12/2022',
    profilePicture: '/assets/person/3.jpeg',
    msg: 'Haha',
  },
  {
    id: 10,
    name: 'Vincent Fabron',
    timeStamp: '30/11/2022',
    profilePicture: '/assets/person/6.jpeg',
    msg: 'what???? You are making your own social media?',
  },
];

const truncate = (string, n) => {
  return string?.length > n ? string.substr(0, n - 1) + '...' : string;
};

const ChatMenu = ({ conversations, currentUser, setCurrentchat }) => {
  const { user } = useContext(AuthContext);
  const { name, profilePicture, username, desc } = user._doc;
  const chatSearchRef = useRef();
  const handleFocusIn = () => {
    chatSearchRef.current.style.backgroundColor = 'white';
    chatSearchRef.current.style.border = '0.5px solid #81c6ff';
  };

  const handleFocusOut = () => {
    chatSearchRef.current.style.backgroundColor = '#f5f5f5';
    chatSearchRef.current.style.border = '0.5px solid #fff';
  };

  return (
    <div className='chatMenuContainer'>
      <div className='chatMenuWrapper'>
        {/* This includes users profile details, status and a searchbar */}
        <div
          className='chatUserProfile'
          onClick={() => Navigate(`/profile/${username}`)}
        >
          <div className='chatMenuImg'>
            <img
              src={profilePicture || `/assets/person/no-profilepic.jpg`}
              alt='userprofilepic'
            />
          </div>
          <div className='chatSearchBar'>
            <div className='chatSearchBarWrapper' ref={chatSearchRef}>
              <input
                type='text'
                name='chatSearch'
                id='chatSearch'
                placeholder='Search'
                onBlur={() => handleFocusOut()}
                onFocus={() => handleFocusIn()}
              />
              <Search className='chatSearchIcon' />
            </div>
          </div>
        </div>
        {/* users friends */}
        <div className='chatFriends'>
          {conversations?.map((chatItem) => (
            <div onClick={() => setCurrentchat(chatItem)}>
              <ChatMenuItem currentUser={currentUser} conversation={chatItem} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChatMenuItem = ({ conversation, currentUser }) => {
  // currentUser is user from AuthContext.
  const [friend, setFriend] = useState();

  // UseEffect to fetch friend
  useEffect(() => {
    const friendId = conversation?.members?.find(
      (m) => m !== currentUser?._doc?._id
    );

    const getUser = async () => {
      try {
        const res = await axios.get(
          `/conversation/chatroom?userId=${friendId}&conversationId=${conversation._id}`
        );
        setFriend(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className='chatFriendsWrapper'>
      <img
        src={friend?.profilePicture || `/assets/person/no-profilepic.jpg`}
        alt='propic'
        className='chatFriendImg'
      />
      <div className='chatDetailsWrapper'>
        <div className='chatDetails'>
          <p>{friend?.name}</p>
          <span>{format(friend?.createdAt)}</span>
        </div>
        <div className='chatMenuMsg'>
          <p>{truncate(friend?.text, 40)}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMenu;
