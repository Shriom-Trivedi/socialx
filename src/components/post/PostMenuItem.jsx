import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Delete, Edit, MoreVert } from '@mui/icons-material';
import { ListItemIcon, ListItemText } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../../context/Auth/AuthContext';

export default function PostMenuItem({ postId, updateTimeLinePosts }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = React.useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleDeletePost(id) {
    try {
      const res = await axios.delete(`/posts/${id}`, {
        headers: { authorization: `Bearer ${user.accessToken}` },
      });
      updateTimeLinePosts();
      handleClose();
    } catch (err) {
      console.error(`Error while deleting post: ${err}`);
    }
  }
  return (
    <>
      <MoreVert onClick={handleClick} />
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
          <ListItemIcon>
            <Edit fontSize='small' />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          className='onHoverDelete'
          style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
          onClick={() => handleDeletePost(postId)}
        >
          <ListItemIcon>
            <Delete style={{ color: 'red' }} fontSize='small' />
          </ListItemIcon>
          <ListItemText style={{ color: 'red' }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
