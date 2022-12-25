import React, { useContext, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Post from '../post/Post';
import Share from '../share/Share';
import axios from 'axios';
// import { Posts } from "../../dummyData";
import './feed.css';
import { TodayOutlined } from '@mui/icons-material';
import { AuthContext } from '../../context/Auth/AuthContext';
import SkeletonLoader from '../../ui-shared/common/loader/Skeleton';

const Feed = ({ username }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const queryClient = new QueryClient();
  const postsQuery = useQuery(
    ['timeline-posts', username],
    async () => {
      const data = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`posts/timeline/${user._doc._id}`);
      return data.data;
    },
    {
      onSuccess: (data) => {
        setPosts(
          data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt))
        );
      },
    }
  );
  const { isLoading, isError, data } = postsQuery;

  const isShareOpen =
    window.location.pathname === `/profile/${user._doc.username}` ||
    window.location.pathname === '/';

  return (
    <QueryClientProvider client={queryClient}>
      <div className='feed'>
        <div
          className='feedContainer'
          style={{
            padding: `${
              window.location.pathname === `/profile/${username}` ? '0' : '20px'
            }`,
          }}
        >
          {isShareOpen && (
            <Share
              user={user}
              invalidateTimeline={() => {
                queryClient.invalidateQueries('timeline-posts');
              }}
            />
          )}

          {isLoading ? (
            <SkeletonLoader />
          ) : (
            posts?.map((post) => <Post key={post._id} post={post} />)
          )}

          {/* {posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))} */}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Feed;
