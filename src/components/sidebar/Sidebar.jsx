import React, { useContext } from 'react';
import './sidebar.css';
import {
  Bookmark,
  Chat,
  Event,
  Group,
  HelpOutline,
  PlayCircleFilledOutlined,
  RssFeed,
  School,
  WorkOutline,
} from '@mui/icons-material';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context/Auth/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const sidebarList = [
  {
    id: 1,
    name: 'Feed',
    icon: <RssFeed />,
    link: '/',
  },
  {
    id: 2,
    name: 'Chats',
    icon: <Chat />,
  },
  {
    id: 3,
    name: 'Videos',
    icon: <PlayCircleFilledOutlined />,
  },
  {
    id: 4,
    name: 'Groups',
    icon: <Group />,
  },
  {
    id: 5,
    name: 'Saved',
    icon: <Bookmark />,
    link: '/saved',
  },
  {
    id: 6,
    name: 'Questions',
    icon: <HelpOutline />,
  },
  {
    id: 7,
    name: 'Jobs',
    icon: <WorkOutline />,
  },
  {
    id: 8,
    name: 'Events',
    icon: <Event />,
  },
  {
    id: 9,
    name: 'Courses',
    icon: <School />,
  },
];

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const friendsQuery = useQuery(['user-friends', user._id], async () => {
    const data = await axios.get(`/users/friends/${user._id}`);
    return data.data;
  });
  const { isLoading, isError, data } = friendsQuery;

  return (
    <div className='sidebar'>
      <div className='sidebarContainer'>
        <ul className='sidebarList'>
          {sidebarList.map((item) => (
            <li
              key={item.id}
              className={`sidebarListItem ${
                window.location.pathname === item.link ? 'sidebarActive' : ''
              }`}
              onClick={() => navigate(item.link)}
            >
              <span className='sidebarIcon'>{item.icon}</span>
              <span className='sidebarListItemText'>{item.name}</span>
            </li>
          ))}
        </ul>
        <button className='btn-primary'>Show More</button>
        <hr className='sidebarHr' />
        <ul className='sidebarFriendList'>
          {data &&
            data.map((friend) => {
              return (
                <li
                  key={friend._id}
                  className='sidebarFriend'
                  onClick={() => navigate(`/profile/${friend.username}`)}
                >
                  <img
                    src={
                      (friend.profilePicture && friend.profilePicture) ||
                      '/assets/person/no-profilepic.jpg'
                    }
                    alt=''
                    className='sidebarFriendImg'
                  />
                  <span className='sidebarfriendName'>{friend.name}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
