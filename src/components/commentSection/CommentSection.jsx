import React, { useContext } from 'react';
import './commentSection.css';
import CommentSectionInput from './commentSectionInput/CommentSectionInput';
import { AuthContext } from '../../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import CommentSectionButton from './commentSectionButton/CommentSectionButton';

const CommentSection = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='commentSectionContainer'>
      <div style={{ flex: 1 }}>
        <img
          src={user?._doc.profilePicture || `/assets/person/no-profilepic.jpg`}
          alt=''
          className='postProfileImg'
          onClick={() => navigate(`/profile/${user?._doc.username}`)}
        />
      </div>
      <div style={{ flex: 10 }}>
        <CommentSectionInput />
      </div>
      <div style={{ flex: 1 }}>
        <CommentSectionButton />
      </div>
    </div>
  );
};

export default CommentSection;
