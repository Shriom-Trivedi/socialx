import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";
// import { Posts } from "../../dummyData";
import "./feed.css";

const Feed = () => {
  const queryClient = new QueryClient();
  const postsQuery = useQuery("timeline-posts", async () => {
    const data = await axios.get(`posts/timeline/61f2a9f27d9ebc61c48ef73f`);
    return data.data;
  });
  const { isLoading, isError, data } = postsQuery;
  // console.log(data);
  return (
    <QueryClientProvider client={queryClient}>
      <div className='feed'>
        <div className='feedContainer'>
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
