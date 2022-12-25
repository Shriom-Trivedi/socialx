import './topbar.css';
import { Search } from '@mui/icons-material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Badge, Tooltip } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import SearchResult from '../searchResult/SearchResult';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const searchRef = useRef();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();

  const handleFocusIn = () => {
    searchRef.current.style.backgroundColor = 'white';
    searchRef.current.style.border = '0.5px solid #81c6ff';
    setIsSearchActive(true);
  };

  const handleFocusOut = () => {
    searchRef.current.style.backgroundColor = '#f5f5f5';
    searchRef.current.style.border = '0.5px solid #fff';
    setIsSearchActive(false);
  };

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <span className='logo' onClick={() => navigate('/')}>
          SOCIALX
        </span>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar' ref={searchRef}>
          <Search className='searchIcon' />
          <input
            placeholder='Search for friend, post or any video'
            className='searchInput'
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
          />
        </div>
        {isSearchActive && (
          <div className='searchResult'>
            <SearchResult />
          </div>
        )}
      </div>
      <div className='topbarRight'>
        <div className='topbarLinks'>
          {/* TODO: Light and Dark mode button to be added */}
        </div>
        <div className='topbarIcons'>
          <div className='topbarIconItem'>
            <Tooltip title='Account' arrow>
              <Badge badgeContent={2} color='primary'>
                <PersonOutlineOutlinedIcon className='topbarIcon' />
              </Badge>
            </Tooltip>
          </div>
          <div className='topbarIconItem'>
            <Tooltip title='Messages' arrow>
              <Badge badgeContent={4} color='primary'>
                <ChatOutlinedIcon className='topbarIcon' />
              </Badge>
            </Tooltip>
          </div>
          <div className='topbarIconItem'>
            <Tooltip title='Notifications' arrow>
              <Badge badgeContent={4} color='primary'>
                <NotificationsNoneOutlinedIcon className='topbarIcon' />
              </Badge>
            </Tooltip>
          </div>
        </div>
        <img
          src={user?._doc?.profilePicture || `/assets/person/no-profilepic.jpg`}
          alt=''
          className='topbarImg'
          onClick={() => navigate(`/profile/${user?._doc.username}`)}
        />
      </div>
    </div>
  );
};

export default Topbar;
