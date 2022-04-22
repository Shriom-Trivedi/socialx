import React from "react";
import Topbar from "../../components/topbar/Topbar";
import TabPanel from "../../components/TabPanel/TabPanel";
import { MoreVert } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import DateRangeIcon from "@mui/icons-material/DateRange";
import "./profile.css";

const Profile = () => {
  return (
    <>
      <Topbar />
      <div className='profileContainer'>
        <div className='profileTop'>
          <div className='profileCover'>
            <img src='/assets/post/3.jpeg' alt='' className='profileCoverImg' />
          </div>
        </div>

        <div className='profileCenter'>
          <div className='profileCenterWrapper'>
            <div className='profileCenterTop'>
              <div className='profileUser'>
                <img
                  src='/assets/person/1.jpeg'
                  alt=''
                  className='profileUserImg'
                />
              </div>
              <div className='profileUserFollow'>
                <div className='followLists'>
                  <p className='followers'>290 followers</p>
                  <p className='followings'>263 followings</p>
                </div>
                <button className='messageBtn'>Message</button>
                <button className='followBtn'>Follow</button>
                <Tooltip title='More' arrow>
                  <div className='postTopRight'>
                    <MoreVert />
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className='profileCenterBottom'>
              <div className='profileName'>
                <p className='profileUserName'>Shri Om Trivedi</p>
                <Tooltip title='Verified' placement='top'>
                  <img src='/assets/verify.png' alt='' className='verify' />
                </Tooltip>
              </div>
              <div className='profileUserInfo'>
                <p className='username'>@shriomatic</p>
                <div className='location'>
                  <FmdGoodIcon
                    style={{
                      fontSize: "13px",
                      marginRight: "5px",
                      color: "gray",
                    }}
                  />
                  <p>Pune</p>
                </div>
                <div className='joinDate'>
                  <DateRangeIcon
                    style={{
                      fontSize: "13px",
                      marginRight: "5px",
                      color: "gray",
                    }}
                  />
                  <p>Joined Feb 2022</p>
                </div>
              </div>
              <div className='profileBio'>
                <p className='bio'>
                  Trained Developer. Untrained Investor. Upcoming Enterpreneur.
                </p>
              </div>
              <div className='mobile--followLists'>
                <p className='mobile--followers'>290 followers</p>
                <p className='mobile--followings'>263 followings</p>
              </div>
            </div>
          </div>
        </div>

        <div className='profileBottom'>
          <div className='profileBottomWrapper'>
            <TabPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
