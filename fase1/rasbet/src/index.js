import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.scss';
import App from './components/views/App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import GamesList from './components/views/GamesList';
import { NavBar } from './components/blocks/NavBar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/todos' />,
  },
  {
    path: "/todos",
    element: <GamesList game={'football'} />,
  },
  {
    path: "/football",
    element: <GamesList game={'football'} />,
  },
  {
    path: "/basketball",
    element: <GamesList game={'basketball'} />,
  },
  {
    path: "/tenis",
    element: <GamesList game={'tenis'} />,
  },
  {
    path: "/motogp",
    element: <GamesList game={'motoGP'} />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <main className='main-container'>
      <NavBar />
      <div className='main-content'>
        <RouterProvider router={router} />
      </div>
    </main>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
