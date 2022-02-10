import React from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import { Posts } from "../../dummyData";
import "./feed.css";

const Feed = () => {
  return (
    <div className='feed'>
      <div className='feedContainer'>
        <Share />
        {Posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
