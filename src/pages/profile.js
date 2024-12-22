import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client'; 
import { GET_ME } from '../gql/query'; // Query to fetch the current user's details
import User from '../components/User'; // Import the User component

const Profile = () => {
    useEffect(() => {
        document.title = 'Profile';
      });
    
  // Query hook to fetch current logged-in user
  const { loading, error, data } = useQuery(GET_ME);

  // If the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // If there is an error fetching the data, display an error message
  if (error) return <p>Error fetching user data</p>;

  // If the data is successful, pass the user data as a prop to the User component
  return <User user={data.me} />;
};

export default Profile;
