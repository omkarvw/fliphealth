import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './assets/Home';

import PatientLogin from './assets/signinflow/PatientLogin';
import DoctorLogin from './assets/signinflow/DoctorLogin';
import Profile from './assets/Profile';
import Diagnostics from './assets/signinflow/Diagnostics';
import HospitalLogin from './assets/signinflow/HospitalLogin';
import ClinicLogin from './assets/signinflow/ClinicLogin';
import About from './assets/About';
import Contact from './assets/Contact';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';

function App() {
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        sessionStorage.clear();
        window.location.reload();
      });
      window.ethereum.on('accountsChanged', () => {
        sessionStorage.clear();
        window.location.reload();
      });
    }
  }, [window.ethereum])
  useEffect(() => {
    const credentials = sessionStorage.getItem("credential") ? JSON.parse(sessionStorage.getItem("credential")) : null;
    if (credentials) {
      console.log(credentials)
      dispatch({ type: "LOGIN", payload: credentials })
    }
  }, [])
  useEffect(() => {
    function onlineHandler() {
      enqueueSnackbar("You are online", { variant: "success" });
    }

    function offlineHandler() {
      enqueueSnackbar("You are offline", { variant: "error" });
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);


    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);
  const dispatch = useDispatch();

  // dispatch({
  //   type: "UPDATE", payload: {
  //     accountAddress: "0x81fc1C1f5210a9C5bD3D291fd6279Aa8705eC475", accountType: "HOSPITAL", authenticated: true, profile: {
  //       name: "omkar Wadu", age: "18", abhaId: 867, aadharId: 7858, gender: "male", mobile: "342424", email: "omkar@hotmail.com"
  //     }
  //   }
  // })
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      neutral: {
        main: '#f45c03',

      }
    },

  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Dashboard" element={<Profile />} />
            <Route path="/Patient/SignIn" element={<PatientLogin />} />
            <Route path="/Doctor/SignIn" element={<DoctorLogin />} />
            <Route path="/Diagnostics/SignIn" element={<Diagnostics />} />
            <Route path="/Clinic/SignIn" element={<ClinicLogin />} />
            <Route path="/Hospital/SignIn" element={<HospitalLogin />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />

          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
