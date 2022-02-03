import React from "react";
import "./sidebar.css";
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
} from "@mui/icons-material";

const sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebarContainer'>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <RssFeed className='sidebarIcon' />
            <span className='sidebarListItemText'>Feed</span>
          </li>
          <li className='sidebarListItem'>
            <Chat className='sidebarIcon' />
            <span className='sidebarListItemText'>Chats</span>
          </li>
          <li className='sidebarListItem'>
            <PlayCircleFilledOutlined className='sidebarIcon' />
            <span className='sidebarListItemText'>Videos</span>
          </li>
          <li className='sidebarListItem'>
            <Group className='sidebarIcon' />
            <span className='sidebarListItemText'>Groups</span>
          </li>
          <li className='sidebarListItem'>
            <Bookmark className='sidebarIcon' />
            <span className='sidebarListItemText'>Bookmarks</span>
          </li>
          <li className='sidebarListItem'>
            <HelpOutline className='sidebarIcon' />
            <span className='sidebarListItemText'>Questions</span>
          </li>
          <li className='sidebarListItem'>
            <WorkOutline className='sidebarIcon' />
            <span className='sidebarListItemText'>Jobs</span>
          </li>
          <li className='sidebarListItem'>
            <Event className='sidebarIcon' />
            <span className='sidebarListItemText'>Events</span>
          </li>
          <li className='sidebarListItem'>
            <School className='sidebarIcon' />
            <span className='sidebarListItemText'>Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <li className="sidebarFriend">
            <img src="/assets/person/2.jpeg" alt="" className="sidebarFriendImg" />
            <span className="sidebarfriendName">John Jacobs</span>
          </li>
          <li className="sidebarFriend">
            <img src="/assets/person/4.jpeg" alt="" className="sidebarFriendImg" />
            <span className="sidebarfriendName">Shane Helms</span>
          </li>
          <li className="sidebarFriend">
            <img src="/assets/person/5.jpeg" alt="" className="sidebarFriendImg" />
            <span className="sidebarfriendName">Maria Maria</span>
          </li>
          <li className="sidebarFriend">
            <img src="/assets/person/3.jpeg" alt="" className="sidebarFriendImg" />
            <span className="sidebarfriendName">Dave Bautista</span>
          </li>
          <li className="sidebarFriend">
            <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg" />
            <span className="sidebarfriendName">Julia Beckman</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default sidebar;
