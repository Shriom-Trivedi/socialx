import './home.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/Rightbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContext } from '../../context/Auth/AuthContext';
import { useContext } from 'react';

const Home = () => {
  const queryClient = new QueryClient();
  const { user } = useContext(AuthContext);
  return (
    <QueryClientProvider client={queryClient}>
      <Topbar />
      <div className='homeContainer'>
        <Sidebar />
        <Feed />
        <RightBar />
      </div>
    </QueryClientProvider>
  );
};

export default Home;
