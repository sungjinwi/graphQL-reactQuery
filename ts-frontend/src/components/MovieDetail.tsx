import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components';
import { graphql } from '../gql';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';

const graphQLEndpoint = 'http://15.164.221.248:3500/graphql';


const getMovieById:any = graphql(/* GraphQL */ `
  query getMovie($id: Int) {
    getMovie(id:$id) {
      title
      director
    }
  }
`)

const MovieDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id)

  const { data } : any = useQuery(
    ['movie', {id}],
    async ()=> request(
      graphQLEndpoint,
      getMovieById,
      {id}
    )
  )

  const movie = data?.getMovie;

  
  return (
  <Page>
    <Container>
      <div>title : {movie?.title}</div>
      <div>director : {movie?.director}</div>
      <button onClick={()=>{navigate(-1)}}>go back</button>
    </Container>
    <ReviewContainer>
    </ReviewContainer>
  </Page>
  )
}

export default MovieDetail

const Page = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Container = styled.div`
  width: 50vw;
  height: 50vh;
  margin: 15vh auto;
  border: solid black;
`

const ReviewContainer = styled.div`
  width: 50vw;
  margin: auto;
  border: solid black;
  
`