import "./topbar.css";
import { Search } from "@mui/icons-material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Badge, Tooltip } from "@mui/material";
import { useRef, useState } from "react";
import SearchResult from "../searchResult/SearchResult";

const Topbar = () => {
  const searchRef = useRef();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleFocusIn = () => {
    searchRef.current.style.backgroundColor = "white";
    searchRef.current.style.border = "0.5px solid #81c6ff";
    setIsSearchActive(true);
  };

  const handleFocusOut = () => {
    searchRef.current.style.backgroundColor = "#e7e7e7";
    searchRef.current.style.border = "0.5px solid #fff";
    setIsSearchActive(false);
  };

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <span className='logo'>SOCIALX</span>
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
          <span className='topbarLink'>Home</span>
          <span className='topbarLink'>Timeline</span>
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
        <img src='/assets/person/1.jpeg' alt='' className='topbarImg' />
      </div>
    </div>
  );
};

export default Topbar;
