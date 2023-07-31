import React from 'react';
import { useQuery, gql } from '@apollo/client';

import './App.css';

const GET_HELLO = gql`
  query ExampleQuery {
    hello
  }
`;
function App() {

  function DisplayLocations() {
    const { loading, error, data } = useQuery(GET_HELLO);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  
    return <div>'data :' {data.hello}</div>
    ;
  }

  return (
    <>
      <DisplayLocations />
    </>
  );
}

export default App;
