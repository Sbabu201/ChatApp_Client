import './App.css';
import { Route, Routes } from "react-router-dom"
import LoginPage from './Pages/LoginPage';
import OtpCheckPage from './Pages/OtpCheckPage';
import ButtomBar from './components/ButtomBar';
import Home from './components/Home';
import NotificationPage from './Pages/NotificationPage';
import NotificationCard from './cards/NotificationCard';
import ProfilePage from './Pages/ProfilePage';
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
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
