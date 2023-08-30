import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import Home from './pages/HomePage.jsx'
import Login from './pages/LoginPage.jsx'
import Signup from './pages/SignupPage.jsx'
import Contact from './pages/ContactPage.jsx'
import Issue from './pages/IssuePage.jsx'
import Admin from './pages/AdminPage.jsx'
import History from './pages/HistoryPage.jsx' 
import Client from './pages/ClientHome.jsx'
// import Profile from './pages/ProfilePage.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },

{
  path: "/login",
  element: <Login/>,
},

{
  path: "/signup",
  element: <Signup/>,
},

{
  path: "/contact",
  element: <Contact/>,
},

{
  path: "/issue",
  element: <Issue/>,
},

{
  path: "/admin",
  element: <Admin/>,
},

{
  path: "/history",
  element: <History/>,
},

{
  path: "/client",
  element: <Client/>,
},

// {
//   path: "/profile",
//   element: <Profile/>,
// },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

