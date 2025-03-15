import React from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import { Bounce, ToastContainer } from 'react-toastify';

function App() {
  return (
    <><LandingPage />
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
