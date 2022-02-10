import { MoreVert } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Users } from "../../dummyData";
import "./post.css";

const Post = ({ post }) => {
  const { comment, date, desc, like, photo } = post;
  const user = Users.find((user) => user.id === post.userId);
  const { profilePicture, username } = user;
  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <img src={profilePicture} alt='' className='postProfileImg' />
            <span className='postUsername'>{username}</span>
            <span className='postDate'>{date}</span>
          </div>
          <Tooltip title='More' arrow>
            <div className='postTopRight'>
              <MoreVert />
            </div>
          </Tooltip>
        </div>
        <div className='postCenter'>
          <span className='postText'>{desc}</span>
          <img src={photo} alt='' className='postImg' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <Tooltip title='Like' arrow>
              <div className='postBottomLeftIcons postBottomLike'>
                <FavoriteBorderIcon className='postBottomLeftIcon like' />
                <span className='postLikeCounter'>{like}</span>
              </div>
            </Tooltip>
            <Tooltip title='Comment' arrow>
              <div className='postBottomLeftIcons postBottomComment'>
                <ChatOutlinedIcon className='postBottomLeftIcon comment' />
                <span className='postCommentCounter'>{comment}</span>
              </div>
            </Tooltip>
            <Tooltip title='Share' arrow>
              <div className='postBottomLeftIcons postBottomShare'>
                <ShareOutlinedIcon className='postBottomLeftIcon' />
              </div>
            </Tooltip>
          </div>
          <div className='postBottomRight'>
            <Tooltip title='Save' arrow>
              <div className='postBottomRightIcons postBottomSave'>
                <BookmarkBorderOutlinedIcon className='postBottomRightIcon' />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
