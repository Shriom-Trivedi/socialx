import React, { useContext, useRef, useState } from 'react';
import './share.css';
import { Tooltip } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Cancel from '@mui/icons-material/Cancel';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SnackBar from '../../ui-shared/common/SnackBar';

const Share = ({ user, invalidateTimeline }) => {
  const name = user?._doc.name.split(' ');
  const firstName = user && name[0];
  const descRef = useRef();
  const [file, setFile] = useState(null);
  const [snackBar, setSnackBar] = useState({
    message: '',
    variant: '',
  });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._doc?._id,
      desc: descRef.current.value,
    };
    if (file) {
      const formData = new FormData();
      // const fileName = Date.now() + file.name;
      const fileName = file.name;
      formData.append('file', file);
      formData.append('fileName', fileName);
      newPost.img = fileName;
      try {
        axios.post('/upload', formData);

        // invalidateTimeline();
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
    try {
      newPost.desc && (await axios.post('/posts', newPost));
      // invalidateTimeline();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='share' style={{ height: file ? '' : '170px' }}>
      <form className='shareWrapper' onSubmit={handlePostSubmit}>
        <div className='shareTop'>
          <img
            src={user?._doc.profilePicture || `/assets/person/no-profilepic.jpg`}
            alt=''
            className='shareProfilePicture'
            onClick={() => navigate(`/profile/${user?._doc.username}`)}
          />
          <input
            type='text'
            placeholder={`What's in your mind today ${firstName}?`}
            className='shareInput'
            ref={descRef}
          />
        </div>
        {file && (
          <div className='shareImageContainer'>
            <img
              src={URL.createObjectURL(file)}
              className='shareImg'
              alt='shareImg'
            />
            <Cancel className='shareCancelImg' onClick={() => setFile(null)} />
          </div>
        )}
        <div className='shareBottom'>
          <div className='shareOptions'>
            <label htmlFor='file' className='shareOption'>
              <Tooltip title='Media' arrow>
                <AddCircleOutlineOutlinedIcon className='shareIcon' />
              </Tooltip>
              <input
                type='file'
                id='file'
                accept='.png, .jpg, .jpeg, .mp4'
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                style={{ display: 'none' }}
              />
            </label>
            <div className='shareOption'>
              <Tooltip title='Tag' arrow>
                <LabelOutlinedIcon className='shareIcon' />
              </Tooltip>
            </div>
            <div className='shareOption'>
              <Tooltip title='Location' arrow>
                <LocationOnOutlinedIcon className='shareIcon' />
              </Tooltip>
            </div>
            <div className='shareOption'>
              <Tooltip title='GIF' arrow>
                <GifBoxOutlinedIcon className='shareIcon' />
              </Tooltip>
            </div>
            <div className='shareOption'>
              <Tooltip title='Feelings' arrow>
                <EmojiEmotionsOutlinedIcon className='shareIcon' />
              </Tooltip>
            </div>
          </div>
          <button
            type='submit'
            className='shareButton'
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
            }}
          >
            <div className='shareButtonOptions'>
              <div className='shareButtonOption'>
                <Tooltip title='Post' arrow>
                  <SendRoundedIcon className='shareButtonIcon' />
                </Tooltip>
              </div>
            </div>
          </button>
        </div>
      </form>
      {/* {isSnackbarOpen && <SnackBar snackbar={snackBar} />} */}
    </div>
  );
};

export default Share;
