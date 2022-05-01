import React from "react";
import Topbar from "../../components/topbar/Topbar";
import TabPanel from "../../components/TabPanel/TabPanel";
import { MoreVert } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import DateRangeIcon from "@mui/icons-material/DateRange";
import "./profile.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router";

const Profile = () => {
  const { username } = useParams();
  const queryClient = new QueryClient();
  const userQuery = useQuery("user-data", async () => {
    const userData = await axios.get(`/users?username=${username}`);
    return userData.data;
  });
  const { isLoading, isError, data } = userQuery;
  return (
    <QueryClientProvider client={queryClient}>
      <Topbar />
      <div className='profileContainer'>
        <div className='profileTop'>
          <div className='profileCover'>
            <img
              src={data?.profilePicture || `/assets/person/no-coverpic.jpg`}
              alt=''
              className='profileCoverImg'
            />
          </div>
        </div>

        <div className='profileCenter'>
          <div className='profileCenterWrapper'>
            <div className='profileCenterTop'>
              <div className='profileUser'>
                <img
                  src={
                    data?.profilePicture || `/assets/person/no-profilepic.jpg`
                  }
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
                <p className='profileUserName'>{data?.name}</p>
                <Tooltip title='Verified' placement='top'>
                  <img src='/assets/verify.png' alt='' className='verify' />
                </Tooltip>
              </div>
              <div className='profileUserInfo'>
                <p className='username'>{`@${data?.username}`}</p>
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
                <p className='bio'>{data?.desc}</p>
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
            <TabPanel username={username} />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Profile;
