import './App.css';
import { Route, Routes } from "react-router-dom"
import LoginPage from './Pages/LoginPage';
import OtpCheckPage from './Pages/OtpCheckPage';
import ButtomBar from './components/ButtomBar';
import Home from './components/Home';
import NotificationPage from './Pages/NotificationPage';
import NotificationCard from './cards/NotificationCard';
import ProfilePage from './Pages/ProfilePage';
import { Toaster } from "react-hot-toast"
import DemoCard from './cards/demoCard';
import CreatePost from './Pages/CreatePost';
import PostView from './components/PostView';
import Chatting from './components/Chatting';
import UserProfile from './components/userProfile';
import Loader from './utils/Loader';
import HomePageLoader from './utils/HomePageLoader';
import ProfilePageLoader from './utils/ProfilePageLoader';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route exact path="/demo" element={<DemoCard />} />
        <Route exact path="/loader" element={<ProfilePageLoader />} />
        <Route exact path="/userprofile" element={<UserProfile />} />
        <Route exact path="/chat" element={<Chatting />} />
        <Route exact path="/postview" element={<PostView />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/newPost" element={<CreatePost />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/not" element={<NotificationCard />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/otp" element={<OtpCheckPage />} />
        <Route exact path="/buttom" element={<ButtomBar />} />
      </Routes>
    </>
  );
}

export default App;
