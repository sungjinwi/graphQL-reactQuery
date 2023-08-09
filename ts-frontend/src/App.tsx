import React from 'react';
import './App.css';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { graphql } from './gql'

import request from 'graphql-request'
import useInput from './hooks/useInput';

const graphQLEndpoint = 'http://localhost:3500/graphql';

const getMovies :any = graphql(/* GraphQL */ `
  query getMovies {
    getMovies {
      id
      title
      director
    }
  }
`);

const getMovieById:any = graphql(/* GraphQL */ `
  query getMovie($id: Int) {
    getMovie(id:$id) {
      title
      director
    }
  }
`)

const addMovie: any = graphql(/* GraphQL */ `
  mutation createMovie($title: String!, $director: String!) {
    addMovie(title:$title, director:$director) {
      title
      director
    }
  }
`);

const updateMovie: any = graphql( /* GraphQL */`
  mutation updateMovie($title: String, $director: String) {
    updateMovie(title:$title, director:$director) {
      title
      director
    }
  }
`);

const deleteMovie: any = graphql( /* GraphQL */`
  mutation delteMovieById($id: Int!) {
    deleteMovie(id:$id)
  }
`);



function App() {
  const titleInputProps = useInput('');
  const directorInputProps = useInput('');

  const queryClient = useQueryClient();


  const { data } : any = useQuery(
    ['movies'],
    async () => request(
      graphQLEndpoint,
      getMovies,
      )
  )

  const res = data?.getMovies 


  const { data: movie } : any = useQuery(
    ['movie', {id:2}],
    async ()=> request(
      graphQLEndpoint,
      getMovieById,
      {id:3}
    )
  )

  const addMutation = useMutation( async () => request(
    graphQLEndpoint,
    addMovie,
    {title: titleInputProps.value ,director: directorInputProps.value}
  ), {
    onSuccess: (result)=> {
      console.log('mutation success');
      console.log(result)
      const onUpdateResult =  queryClient.setQueryData(['movies'], (oldData:any) => oldData ? {
        ...oldData,
      } 
      : oldData
      )
    }
  },);


  const updateMutation = useMutation( async () => request(
    graphQLEndpoint,
    updateMovie,
    {title: titleInputProps.value, director: directorInputProps.value}
    ),
    {
      onSuccess: (result:any) =>{
        queryClient.setQueryData(['movie', {id : 2}], {getMovie: result.updateMovie})
        
        console.log('edit success')
      }
    }
  );

  const deleteMutation = useMutation( async () => request(
    graphQLEndpoint,
    deleteMovie,
    {id : 2}
  ))



  return (
    <>
      {res && res.map((movie:any )=>(
        <div key={movie?.id}>id: {movie.id} title : {movie.title} <br/> director : {movie.director}</div>
      ))}
    <input placeholder='영화 제목' {...titleInputProps} />
    <input placeholder='영화 감독' {...directorInputProps} />
    <button 
      onClick={()=> addMutation.mutate()}
    >
      영화 추가
    </button>
    <button 
      onClick={()=> updateMutation.mutate()}
    >
      update
    </button>
    <div> { movie && JSON.stringify(movie.getMovie) } </div>
    </>
  );
}

export default App;
