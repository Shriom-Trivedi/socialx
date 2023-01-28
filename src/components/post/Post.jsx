import { MoreVert } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import './post.css';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { format } from 'timeago.js';
import { AuthContext } from '../../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import CommentSection from '../commentSection/CommentSection';

const Post = ({ post }) => {
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userId, comment, createdAt, desc, likes, img } = post;
  const userQuery = useQuery(['user-data', userId], async () => {
    const userData = await axios.get(`/users?userId=${userId}`);
    return userData.data;
  });

  const { isLoading, isError, data } = userQuery;

  // public folder for images added here.
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [noOfLikes, setNoOfLikes] = useState(likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [truncateLength, setTruncateLength] = useState(45);

  const handleLike = async () => {
    let tempLikes = noOfLikes;
    let tempIsLiked = isLiked;
    try {
      setNoOfLikes(isLiked ? noOfLikes - 1 : noOfLikes + 1);
      setIsLiked(!isLiked);
      const data = {
        userId: currentUser._doc._id,
      };
      await axios.put(`/posts/${post._id}/like`, data);
    } catch (error) {
      setNoOfLikes(tempLikes);
      setIsLiked(tempIsLiked);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  // Checks if the user has liked the post or not. If the user has liked the post, then the icon will be filled. If the user has not liked the post, then the icon will be empty.
  useEffect(() => {
    setIsLiked(likes.includes(currentUser._doc._id));
  }, [likes, currentUser._doc._id]);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
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
              onClick={() => navigate(`/profile/${data?.username}`)}
            />
            <div onClick={() => navigate(`/profile/${data?.username}`)}>
              <div>
                <span className='postUsername'>{data?.username}</span>
                <span className='postDate'>{format(createdAt)}</span>
              </div>
              <div>
                {data?.desc && (
                  <span className='postUserDesc'>
                    {truncate(data?.desc, truncateLength)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Tooltip title='More' arrow>
            <div className='postTopRight'>
              <MoreVert />
            </div>
          </Tooltip>
        </div>
        <div className='postCenter'>
          <span className='postText'>{desc}</span>
          <img src={PF + img} alt='' className='postImg' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <Tooltip title={`${isLiked === true ? 'Unlike' : 'Like'}`} arrow>
              <div
                className='postBottomLeftIcons postBottomLike'
                onClick={handleLike}
              >
                {isLiked === true ? (
                  <FavoriteIcon
                    className='postBottomLeftIcon '
                    style={{ color: '#db6565' }}
                  />
                ) : (
                  <FavoriteBorderIcon className='postBottomLeftIcon like' />
                )}

                <span
                  className={`postLikeCounter ${
                    isLiked === true && 'likedPostText likeCounterAnimation'
                  } ${isLiked === false && 'unlikeCounterAnimation'}`}
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
            <Tooltip title={`${isSaved === true ? 'Saved' : 'Save'}`} arrow>
              {isSaved === true ? (
                <div
                  className='postBottomRightIcons postBottomSave'
                  onClick={handleSave}
                >
                  <BookmarkOutlinedIcon
                    className='postBottomRightIcon'
                    style={{ color: '#7bb990' }}
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
        {/* Comment section */}
        {/* <CommentSection /> */}
      </div>
    </div>
  );
};

export default Post;
