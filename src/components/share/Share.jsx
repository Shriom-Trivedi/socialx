import React from "react";
import "./share.css";
import { Tooltip } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const Share = () => {
  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            src='/assets/person/1.jpeg'
            alt=''
            className='shareProfilePicture'
          />
          <input
            type='text'
            placeholder={`What's in your mind today Shri?`}
            className='shareInput'
          />
        </div>
        <div className='shareBottom'>
          <div className='shareOptions'>
            <div className='shareOption'>
              <Tooltip title='Media' arrow>
                <AddCircleOutlineOutlinedIcon className='shareIcon' />
              </Tooltip>
            </div>
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
          <div className='shareButton'>
            <div className='shareButtonOptions'>
              <div className='shareButtonOption'>
                <Tooltip title='Post' arrow>
                  <SendRoundedIcon className='shareButtonIcon' />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;