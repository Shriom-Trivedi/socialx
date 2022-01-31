import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Badge, Tooltip } from "@mui/material";
import { useRef } from "react";

const Topbar = () => {
  const searchRef = useRef();

  const handleFocusIn = () => {
    searchRef.current.style.backgroundColor = "white";
    searchRef.current.style.border = "0.5px solid #999696";
  };

  const handleFocusOut = () => {
    searchRef.current.style.backgroundColor = "#e7e7e7";
    searchRef.current.style.border = "none";
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
      </div>
      <div className='topbarRight'>
        <div className='topbarLinks'>
          <span className='topbarLink'>Home</span>
          <span className='topbarLink'>Timeline</span>
        </div>
        <div className='topbarIcons'>
          <div className='topbarIconItem'>
            <Tooltip title='Account' arrow>
              <Badge badgeContent={4} color='primary'>
                <Person />
              </Badge>
            </Tooltip>
          </div>
          <div className='topbarIconItem'>
            <Tooltip title='Messages' arrow>
              <Badge badgeContent={4} color='primary'>
                <Chat />
              </Badge>
            </Tooltip>
          </div>
          <div className='topbarIconItem'>
            <Tooltip title='Notifications' arrow>
              <Badge badgeContent={4} color='primary'>
                <Notifications />
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
