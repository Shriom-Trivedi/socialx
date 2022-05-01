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
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { format } from "timeago.js";

const Post = ({ post }) => {
  const { comment, createdAt, desc, likes, photo } = post;
  const userQuery = useQuery("user-data", async () => {
    const userData = await axios.get(`/users?userId=${post.userId}`);
    return userData.data;
  });
  const { isLoading, isError, data } = userQuery;

  // public folder for images added here.
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [noOfLikes, setLikes] = useState(post?.likes[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setLikes(isLiked ? noOfLikes - 1 : noOfLikes + 1);
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };
  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <img
              src={data?.profilePicture || `/assets/person/no-profilepic.jpg`}
              alt=''
              className='postProfileImg'
            />
            <span className='postUsername'>{data?.username}</span>
            <span className='postDate'>{format(createdAt)}</span>
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
            <Tooltip title={`${isLiked === true ? "Unlike" : "Like"}`} arrow>
              <div
                className='postBottomLeftIcons postBottomLike'
                onClick={handleLike}
              >
                {isLiked === true ? (
                  <FavoriteIcon
                    className='postBottomLeftIcon '
                    style={{ color: "#db6565" }}
                  />
                ) : (
                  <FavoriteBorderIcon className='postBottomLeftIcon like' />
                )}

                <span
                  className={`postLikeCounter ${
                    isLiked === true && "likedPostText likeCounterAnimation"
                  } ${isLiked === false && "unlikeCounterAnimation"}`}
                >
                  {noOfLikes}
                </span>
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
            <Tooltip title={`${isSaved === true ? "Saved" : "Save"}`} arrow>
              {isSaved === true ? (
                <div
                  className='postBottomRightIcons postBottomSave'
                  onClick={handleSave}
                >
                  <BookmarkOutlinedIcon
                    className='postBottomRightIcon'
                    style={{ color: "#7bb990" }}
                  />
                </div>
              ) : (
                <div
                  className='postBottomRightIcons postBottomSave'
                  onClick={handleSave}
                >
                  <BookmarkBorderOutlinedIcon className='postBottomRightIcon' />
                </div>
              )}
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
