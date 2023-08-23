import { styled } from "styled-components"
import useQueryMovieList from "../hooks/useQueryMovieList";
import MovieCard from "./MovieCard";

const MovieCardList = () => {
  
  const { fetchNextPage, pages, hasNextPage } :any = useQueryMovieList();


  return (
    <>
    <MovieCardsContainer>
      {pages?.map((page:any)=> 
        page.movies.edges.map(({node}:{node:any})=> 
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
    </>
  )
}

export default MovieCardList

const MovieCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`