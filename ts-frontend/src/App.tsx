import React from 'react';
import './App.css';

import { useMutation, useQuery } from '@tanstack/react-query'
import { graphql } from './gql'

import request from 'graphql-request'
import useInput from './hooks/useInput';

const graphQLEndpoint = 'http://localhost:3500/graphql';


const getMovies :any = graphql(/* GraphQL */ `
  query getMovies {
    getMovies {
      title
      director
    }
  }
`);

const addMovie: any = graphql(/* GraphQL */ `
  mutation createMovie($title: String!, $director: String!) {
    addMovie(title:$title, director:$director) {
      title
      director
    }
  }
`)

function App() {
  const titleInputProps = useInput('');
  const directorInputProps = useInput('');


  const { data } : any = useQuery(
    ['movies'],
    async () => request(
      graphQLEndpoint,
      getMovies,
      )
  )

  const mutation = useMutation( async () => request(
    graphQLEndpoint,
    addMovie,
    {title: titleInputProps.value ,director: directorInputProps.value}
  ), {
    onSuccess: ()=> {
      console.log('mutation success')
    }
  },);



  return (
    <>
      {data && data.getMovies.map((movie:any,index:number)=>(
        <div key={index}>title : {movie.title} <br/> director : {movie.director}</div>
      ))}
    <input placeholder='영화 제목' {...titleInputProps} />
    <input placeholder='영화 감독' {...directorInputProps} />
    <button 
      onClick={()=> mutation.mutate()}
    >
      영화 추가
    </button>
    </>
  );
}

export default App;
