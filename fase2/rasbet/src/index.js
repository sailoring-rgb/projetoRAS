import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.scss';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import GamesListView from './components/views/GamesListView';
import { NavBar } from './components/blocks/NavBar';
import { StateProvider } from './state';
import { initialState, globalStateReducer } from './globalState';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/todos' />,
  },
  {
    path: "/todos",
    element: <GamesListView game={'football'} />,
  },
  {
    path: "/football",
    element: <GamesListView game={'football'} />,
  },
  {
    path: "/basketball",
    element: <GamesListView game={'basketball'} />,
  },
  {
    path: "/tenis",
    element: <GamesListView game={'tenis'} />,
  },
  {
    path: "/motogp",
    element: <GamesListView game={'motoGP'} />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={globalStateReducer}>
      <main className='main-container'>
        <NavBar />
        <div className='main-content'>
          <RouterProvider router={router} />
        </div>
      </main>
    </StateProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
