import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/Rightbar";
import { QueryClient, QueryClientProvider } from "react-query";

const Home = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Topbar />
      <div className='homeContainer'>
        <Sidebar />
        <Feed username='shriom1'/>
        <RightBar />
      </div>
    </QueryClientProvider>
  );
};

export default Home;
