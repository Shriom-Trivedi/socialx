import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Badge } from "@mui/material";

const Topbar = () => {
  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <span className='logo'>SOCIALX</span>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <Search className="searchIcon"/>
          <input
            placeholder='Search for friend, post or any video'
            className='searchInput'
          />
        </div>
      </div>
      <div className='topbarRight'>
        <div className='topbarLinks'>
          <span className='topbarLink'>Homepage</span>
          <span className='topbarLink'>Timeline</span>
        </div>
        <div className='topbarIcons'>
          <div className='tobpbarIconItem'>
            <Badge badgeContent={4} color='primary'>
              <Person />
            </Badge>
          </div>
          <div className='tobpbarIconItem'>
            <Badge badgeContent={4} color='primary'>
              <Chat />
            </Badge>
          </div>
          <div className='tobpbarIconItem'>
            <Badge badgeContent={4} color='primary'>
              <Notifications />
            </Badge>
          </div>
          <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
