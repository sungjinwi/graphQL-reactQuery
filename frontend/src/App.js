import React from 'react';
import { useQuery, gql } from '@apollo/client';

import './App.css';


const GET_USERS = gql`
  query UsersQuery {
    getUsers {
      name
      age
    }
  }
`

function App() {

  function DisplayUsers() {
    const { loading, error, data } = useQuery(GET_USERS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    
    return (data.getUsers.map(user=> 
      <>
        <div>{user.name}</div>
        <div>{user.age}</div>
      </>
    ))
    ;
  }

  return (
    <>
      <DisplayUsers />
    </>
  );
}

export default App;
