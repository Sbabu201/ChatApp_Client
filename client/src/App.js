import './App.css';
import { Route, Routes } from "react-router-dom"
import LoginPage from './Pages/LoginPage';
import OtpCheckPage from './Pages/OtpCheckPage';
import ButtomBar from './components/ButtomBar';
import Home from './components/Home';
import NotificationPage from './Pages/NotificationPage';
import notificationsound from "./assets/usetune.mp3"

import NotificationCard from './cards/NotificationCard';
import ProfilePage from './Pages/ProfilePage';
import toast, { Toaster } from "react-hot-toast"
import DemoCard from './cards/demoCard';
import CreatePost from './Pages/CreatePost';
import PostView from './components/PostView';
import Chatting from './components/Chatting';
import UserProfile from './components/userProfile';
import Loader from './utils/Loader';
import HomePageLoader from './utils/HomePageLoader';
import ProfilePageLoader from './utils/ProfilePageLoader';
import FollowerReducer from './store/reducers/followerReducer';
import PageNotFound from './components/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { SocketProvider, useSocket } from './Pages/SocketProvider';
import { useEffect } from 'react';
import { addArrivalMessage, setSingleMessage } from './store/reducers/socketReducer';
import { useDispatch } from 'react-redux';
import SearchPostView from './cards/SearchPostView';
import { getAllPosts } from './store/reducers/postReducer';
function App() {
  const notification = new Audio(notificationsound);
  const dispatch = useDispatch()
  const socket = useSocket();
  useEffect(() => {
    if (socket.current) {
      console.log('socket', socket.current)
      socket.current.on("catch", (data) => {
        try {
          alert("hello")
          dispatch(addArrivalMessage({ from: data.from, to: data.to, message: data.message }));
          dispatch(setSingleMessage({ fromSelf: false, message: data.message }))
          console.log('data', data)
          notification?.play()
        } catch (error) {
          console.log('error', error)
        }
      })
    }
  }, [socket.current])
  useEffect(() => {
    if (socket.current) {
      socket.current.on("notify", (data) => {
        toast.success(data.user + "  " + data.message)
      })
    }
  }, [socket.current])
  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])
  return (
    <>

      <Toaster />
      <Routes>
        {/* <Route exact path="/demo" element={<ProtectedRoute />} />
        <Route exact path="/socket" element={<FollowerReducer />} /> */}
        <Route path='*' element={<PageNotFound />} />
        <Route exact path="/loader" element={<ProfilePageLoader />} />
        <Route exact path="/socket" element={<SocketProvider />} />
        <Route element={<ProtectedRoute />} >
          <Route exact path="/" element={<Home />} />
          <Route exact path="/userprofile" element={<UserProfile />} />
          <Route exact path="/chat" element={<Chatting />} />
          <Route exact path="/postview" element={<PostView />} />
          <Route exact path="/newPost" element={<CreatePost />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/postSearch" element={<SearchPostView />} />
        </Route>
        <Route exact path="/not" element={<NotificationCard />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/otp" element={<OtpCheckPage />} />
        {/* <Route exact path="/buttom" element={<ButtomBar />} /> */}
      </Routes>
    </>
  );
}

export default App;
