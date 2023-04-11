import { Fragment, useState, useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import NavHead from './components/NavHead';
import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
      <ToastContainer />
      <NavHead />
      <Fragment>
        <Routes>
          <Route path="/" element={
            !isAuthenticated ? (<Login setAuth={setAuth} />
            ) : (
              <Navigate replace to="/dashboard" />
            )
          } />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (<Login setAuth={setAuth} />
              ) : (
                <Navigate replace to="/dashboard" />
              )}
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (<Register setAuth={setAuth} />
              ) : (
                <Navigate replace to="/login" />
              )}
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (<Dashboard setAuth={setAuth} />
              ) : (
                <Navigate replace to="/login" />
              )}
          />
        </Routes>
      </Fragment>
    </>
  )
}
