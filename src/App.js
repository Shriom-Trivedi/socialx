import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import ProgressBar from "@badrap/bar-of-progress";
import { QueryClientProvider, QueryClient } from "react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/Auth/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  const queryClient = new QueryClient();
  const progress = new ProgressBar({
    size: 4,
    color: "#00bcd4",
    style: { zIndex: "9999" },
    delay: 100,
  });

  const location = useLocation();

  useEffect(() => {
    progress.start();
  }, [location]);

  setTimeout(() => {
    progress.finish();
  }, 1500);
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={user ? <Home /> : <Register />} />
          <Route
            path='/login'
            // To keep the history clean, you should set replace prop. This will avoid extra redirects after the user click back.
            element={user ? <Navigate to='/' replace /> : <Login />}
          />
          <Route
            path='/register'
            element={user ? <Navigate to='/' replace /> : <Register />}
          />
          <Route path='/profile/:username' element={<Profile />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
