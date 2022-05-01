import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";
// import { Posts } from "../../dummyData";
import "./feed.css";
import { TodayOutlined } from "@mui/icons-material";

const Feed = ({ username }) => {
  const queryClient = new QueryClient();
  const postsQuery = useQuery("timeline-posts", async () => {
    const data = username
      ? await axios.get(`/posts/profile/${username}`)
      : await axios.get(`posts/timeline/61f2a9f27d9ebc61c48ef73f`);
    return data.data;
  });
  const { isLoading, isError, data } = postsQuery;
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
          <Share />
          {data?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Feed;
