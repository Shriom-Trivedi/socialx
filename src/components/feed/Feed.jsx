import React, { useContext } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";
// import { Posts } from "../../dummyData";
import "./feed.css";
import { TodayOutlined } from "@mui/icons-material";
import { AuthContext } from "../../context/Auth/AuthContext";

const Feed = ({ username }) => {
  const { user } = useContext(AuthContext);
  const queryClient = new QueryClient();
  const postsQuery = useQuery(["timeline-posts", username], async () => {
    const data = username
      ? await axios.get(`/posts/profile/${username}`)
      : await axios.get(`posts/timeline/${user._id}`);
    return data.data;
  });
  const { isLoading, isError, data } = postsQuery;
  // console.log(data);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='feed'>
        <div
          className='feedContainer'
          style={{
            padding: `${
              window.location.pathname === `/profile/${username}` ? "0" : "20px"
            }`,
          }}
        >
          <Share user={user} />
          {data?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Feed;
