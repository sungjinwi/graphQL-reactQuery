import React from 'react';
import './App.css';

import { useMutation, useQuery } from '@tanstack/react-query'
import { graphql } from './gql'

import request from 'graphql-request'

const graphQLEndpoint = 'http://localhost:3500/graphql';

const hello : any = graphql(/* GraphQL */ `
  query hello {
    hello
  }
`);

const getUsers :any = graphql(/* GraphQL */ `
  query getUsers($name: String!) {
    getUsers(name: $name) {
      name
      age
    }
  }
`);

const createUser:any = graphql(/* GraphQL */ `
  mutation createUser($name: String!, $age: Int!) {
    addUser(name:$name, age:$age) {
      name
      age
    }
  }
`)

function App() {

  const { data, isLoading } : {data:any, isLoading : boolean} = useQuery(['hello'], async () => 
  request(graphQLEndpoint, hello,)
  )

  const { data : name } : {data:any} = useQuery(['users'], async () => 
    request(
      graphQLEndpoint,
      getUsers,
      { name : 'jerry'}
    ),
  )

  const mutation = useMutation( async () => request(
    graphQLEndpoint,
    createUser,
    {name:'jerry' ,age:20}
  ), {
    onSuccess: ()=> {
      console.log('mutation success')
    }
  },);



  return (
    <>
    <div>
      {data && JSON.stringify(data)}
      {name && JSON.stringify(name)}
    </div>
    <button 
      onClick={()=> mutation.mutate()}
    >
      name:jerry, age: 20인 data db 추가
    </button>
    </>
  );
}

export default App;
