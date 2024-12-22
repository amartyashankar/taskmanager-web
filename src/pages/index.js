import React from 'react';
import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import our shared layout component
import Layout from '../components/Layout';

// Import our routes
import Home from './home';
import MyTasks from './mytasks';
import Favorites from './favorites';
import Task from './task';
import SignUp from './signup';
import SignIn from './signin';
import NewTask from './new';
import EditTask from './edit';
import Users from './users';
import UserTasks from './usertasks';
import Profile from './profile';
import { IS_LOGGED_IN } from '../gql/query';

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mytasks" element={<PrivateRoute><MyTasks /></PrivateRoute>} />
          <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
          <Route path="/task/:id" element={<Task />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserTasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new" element={<PrivateRoute><NewTask /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><EditTask /></PrivateRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
};

const PrivateRoute = ({ children }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  // If the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // If there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  // Check if the user is logged in
  return data.isLoggedIn ? children : <Navigate to="/signin" />;
};

export default Pages;
