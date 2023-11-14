import React from 'react';

const CommentSectionInput = () => {
  return (
    <div>
      <input
        type='text'
        placeholder={'Comment or reply...'}
        className='commentInput'
        // ref={descRef}
      />
    </div>
  );
};

export default CommentSectionInput;
