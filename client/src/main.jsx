import React from 'react'
import ReactDOM from 'react-dom/client'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// import Login from './routes/Login'
// import Register from './routes/Register'
// import Dashboard from './routes/Dashboard'

// import RootLayout from './routes/RootLayout'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout />,
//     children: [
//       { path: '/', element: <App /> },
//       { path: '/login', element: <Login /> },
//       { path: '/register', element: <Register /> },
//       { path: '/dashboard', element: <Dashboard /> }
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
