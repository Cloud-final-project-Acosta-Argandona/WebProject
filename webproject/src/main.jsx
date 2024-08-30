import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Songs from './pages/Songs.jsx';
import Artists from './pages/Artists.jsx';
import AppBar from './components/AppBar.jsx';
import Favorites from './pages/Favorites.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/song",
    element: <Songs />
  },
  {
    path: "/artist",
    element: <Artists />
  },
  {
    path: "/favorites",
    element: <Favorites />
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
