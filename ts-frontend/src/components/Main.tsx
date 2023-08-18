import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { graphql } from '../gql'; 
import request from 'graphql-request'
import useInput from '../hooks/useInput'
import { styled } from 'styled-components';
import MovieCard from './MovieCard';
import {produce} from 'immer';

const graphQLEndpoint = 'http://15.164.221.248:3500/graphql';

const getMovies :any = graphql(/* GraphQL */ `
  query getMovies ($first: Int, $after: String) {
    getMovies (first: $first, after: $after) {
      edges {
        node {
          id
          title
          director
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
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


const Main = () => {

  const titleInputProps = useInput('');
  const directorInputProps = useInput('');

  const queryClient = useQueryClient();


  const { data, fetchNextPage} :any = useInfiniteQuery({
    queryKey : ['infiniteMovies'],
    queryFn : async ({pageParam = "1"}) => request(
      graphQLEndpoint,
      getMovies,
      {first:3, after: pageParam}
    ),
    getNextPageParam: (lastPage:any, pages) => {
      return lastPage.getMovies.pageInfo.endCursor
    }
  })

  const pages = data?.pages;

  const hasNextPage = pages?.at(-1).getMovies.pageInfo.hasNextPage

  console.log(hasNextPage)


  const addMutation = useMutation( async () => request(
    graphQLEndpoint,
    addMovie,
    {title: titleInputProps.value ,director: directorInputProps.value}
  ), {
    onSuccess: (result:any)=> {
      console.log('addition success');
      console.log(result);
      const updatedMovies = produce(data, (draft:any)=>{
        draft.pages.at(-1).getMovies.edges.push({node:{...result?.addMovie, id:0}})
      });
      console.log(data?.pages.at(-1).length)
      if (data?.pages.at(-1).getMovies.edges.length != 3) {
        queryClient.setQueryData(['infiniteMovies'], (oldData:any) => oldData ? 
        updatedMovies
        : oldData
        )
      }
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

  return (
    <>
    <MovieCardsContainer>
      {pages?.map((page:any)=> 
        page.getMovies.edges.map(({node}:{node:any})=> 
          <MovieCard key={node?.id} id={node?.id} title={node?.title} director={node?.director}/>
        ))
      }
    </MovieCardsContainer>
    <div style={{margin:'20px'}}>
      { 
        hasNextPage &&
        <button onClick={()=> fetchNextPage()}>
        fetchNext
        </button>
      }
    </div>
    <input placeholder='영화 제목' {...titleInputProps} />
    <input placeholder='영화 감독' {...directorInputProps} />
    <button 
      onClick={()=> addMutation.mutate()}
    >
      영화 추가
    </button>
    
    </>
  )
}

export default Main

const MovieCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`