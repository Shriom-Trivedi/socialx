import { Tooltip } from '@mui/material';
import React from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const CommentSectionButton = () => {
  return (
    <div>
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
            <Tooltip title='Add comment' arrow>
              <SendRoundedIcon
                className='shareButtonIcon'
                style={{ color: '#7bb990' }}
              />
            </Tooltip>
          </div>
        </div>
      </button>
    </div>
  );
};

export default CommentSectionButton;
