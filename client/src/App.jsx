import { Fragment, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavHead from './components/NavHead';
import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';

function App() {

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <NavHead />
      <Fragment>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Fragment>
    </>
  )
}

export default App