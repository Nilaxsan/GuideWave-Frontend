import './App.css';
import LandingPage from './pages/LandingPage';
import { Bounce, ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import TouristHome from './pages/TouristHome';
import GuideHome from './pages/GuideHome';
import SuccessfulRegistration from './pages/SuccessfulRegistration';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <>
    <Routes>
    <Route path ="/" element={<LandingPage />} />
    <Route path ="/register-success" element={<SuccessfulRegistration />} />
    <Route path ="/forgot-password" element={<ForgotPassword />} />
    <Route path ="/verify-otp" element={<VerifyOtp />} />
    <Route path ="/reset-password" element={<ResetPassword />} />
    <Route path ="/tourist-home" element={<TouristHome />} />
    <Route path ="/guide-home" element={<GuideHome />} />


    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce} /></>
  );
}

export default App;
