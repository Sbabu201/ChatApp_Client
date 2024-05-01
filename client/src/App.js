import './App.css';
import { Route, Routes } from "react-router-dom"
import LoginPage from './Pages/LoginPage';
import OtpCheckPage from './Pages/OtpCheckPage';
import Home from './components/Home';
import notificationsound from "./assets/usetune.mp3"

import NotificationCard from './cards/NotificationCard';
import ProfilePage from './Pages/ProfilePage';
import toast, { Toaster } from "react-hot-toast"
import CreatePost from './Pages/CreatePost';
import PostView from './components/PostView';
import Chatting from './components/Chatting';
import UserProfile from './components/userProfile';

import PageNotFound from './components/PageNotFound';
import ProtectedRoute, { CheckLogin } from './components/ProtectedRoute';
import { SocketProvider, useSocket } from './Pages/SocketProvider';
import { useEffect } from 'react';
import { addArrivalMessage, setSingleMessage } from './store/reducers/socketReducer';
import { useDispatch } from 'react-redux';
import SearchPostView from './cards/SearchPostView';
import { getAllPosts } from './store/reducers/postReducer';
import SignUp from './Pages/SignUp';
import EditProfile from './Pages/EditProfile';
import { getAllUsers } from './store/reducers/userReducer';
import DemoCard from './cards/demoCard';
import AudioPlayer from './cards/AudioPlayer';
import { getAllLikes } from './store/reducers/likeReducer';
import { getAllComments } from './store/reducers/commentReducer';
import StoryCard from './cards/StoryCard';
function App() {
  const notification = new Audio(notificationsound);
  const dispatch = useDispatch()
  const socket = useSocket();
  useEffect(() => {
    console.log('socket', socket.current)
    if (socket.current) {
      console.log('socket', socket.current)

      socket.current.on("catch", (data) => {
        try {
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
    dispatch(getAllUsers())
    dispatch(getAllLikes())
    dispatch(getAllComments())
  }, [])
  return (
    <>

      <Toaster />
      <Routes>
        {/* <Route exact path="/demo" element={<ProtectedRoute />} />
        <Route exact path="/socket" element={<FollowerReducer />} /> */}
        <Route path='*' element={<PageNotFound />} />
        <Route exact path="/loader" element={<OtpCheckPage />} />


        <Route exact path="/socket" element={<SocketProvider />} />
        <Route element={<ProtectedRoute />} >
          <Route exact path="/" element={<Home />} />
          <Route exact path="/userprofile/:id?" element={<UserProfile />} />
          <Route exact path="/edit" element={<EditProfile />} />
          <Route exact path="/chat/:id?" element={<Chatting />} />
          <Route exact path="/postview" element={<PostView />} />
          <Route exact path="/newPost" element={<CreatePost />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/postSearch/:id?" element={<SearchPostView />} />
        </Route>
        <Route exact path="/not" element={<NotificationCard />} />
        <Route element={<CheckLogin />}>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Route>

        <Route exact path="/otp/:email?" element={<OtpCheckPage />} />
        <Route exact path="/demo" element={<StoryCard />} />
      </Routes>
    </>
  );
}

export default App;
