import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProgressBar from "@badrap/bar-of-progress";
import { QueryClientProvider, QueryClient } from "react-query";
import { useEffect } from "react";

function App() {
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
          <Route exact path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile/:username' element={<Profile />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
