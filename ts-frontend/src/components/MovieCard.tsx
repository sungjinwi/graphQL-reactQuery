import { useMutation } from '@tanstack/react-query';
import request from 'graphql-request';
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { graphQLEndpoint } from '../common';
import { deleteMovie } from '../graphql/mutations';
import useQueryMovieList from '../hooks/useQueryMovieList';

const MovieCard = ({id, title, director}:{id:number, title:string, director:string}) => {
  const navigate = useNavigate();

  const {data} = useQueryMovieList();

  const deleteMutation = useMutation(async ()=> request(
    graphQLEndpoint,
    deleteMovie,
    {id}
    ), {
      onSuccess: (result)=>{
        console.log('delete success');
        console.log(id)
        // const updatedMovies = produce(data, (draft:any)=>{
          // draft.pages.at(-1).movies.edges.push({node:{...result?.addMovie, id:0}})
        // });
      }
    })

  return (
    <Container 
      onClick={()=>{navigate(`movie/${id}`)}}
    >
      <div>title : {title} <br/> director : {director}</div>
      <button
      onClick={(e)=>{
        e.stopPropagation(); // parent onClick event 버블링 중지
        console.log(id)
        deleteMutation.mutate()
      }}
      >
        X
      </button>
    </Container>
  )
}

export default MovieCard

const Container = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  flex-basis: 25%;
`