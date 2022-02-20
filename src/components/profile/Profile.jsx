import React from "react";
import Feed from "../feed/Feed";
import Rightbar from "../rightbar/Rightbar";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import "./profile.css";

const Profile = () => {
  return (
    <>
      <Topbar />
      <div className='profileContainer'>
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};

export default Profile;
