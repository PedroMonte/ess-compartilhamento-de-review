import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import App from './App';
import Restaurants from './routes/restaurants/Restaurants'
import RestaurantProfile from './routes/restaurants/RestaurantProfile'
import RestaurantCreate from './routes/restaurants/RestaurantCreate'
import RestaurantUpdate from './routes/restaurants/RestaurantUpdate'
import ErrorPage from './routes/ErrorPage'
import UserProfile from './routes/UserProfile';

import UserPage from './routes/UserPage'
import Followers from './routes/Followers'
import Following from './routes/Following' 

import RatingAdd from './routes/reviews/RatingAdd'
import ReviewCreate from './routes/reviews/ReviewCreate'
import ReviewEdit from './routes/reviews/ReviewEdit'
import ReviewPage from './routes/reviews/ReviewPage'
import ReviewsRestaurant from './routes/reviews/ReviewsRestaurant'
import ReviewsUser from './routes/reviews/ReviewsUser'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/restaurants",
        element: <Restaurants />,
      },
      {
        path: "/restaurants/create",
        element: <RestaurantCreate />
      },
      {
        path: "/restaurants/update/:id",
        element: <RestaurantUpdate />
      },
      {
        path: "/restaurants/:id",
        element: <RestaurantProfile />
      },
      {
        path: "/ratings/:idrest",
        element: <RatingAdd />
      },
      {
        path: "/reviews/:idrest/:iduser/create",
        element: <ReviewCreate />
      },
      {
        path: "/reviews/:idrest/:iduser/edit",
        element: <ReviewEdit /> 
      },
      {
        path: "/reviews/:idrest/:iduser",
        element: <ReviewPage /> 
      },
      {
        path: "/reviews/:idrest/",
        element: <ReviewsRestaurant /> 
      },
      {
        path: "/reviews/:iduser",
        element: <ReviewsUser /> 
      },
      {
        path: "/users/:id",
        element: <UserPage />
      },
      {
        path: "/users/followers/:id",
        element: <Followers />
      },
      {
        path: "/users/following/:id",
        element: <Following />
      }
    ]
  },
  {
    path:"/",
    children: [
      {
        path: "/users/:id",
        element: <UserProfile />,
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
