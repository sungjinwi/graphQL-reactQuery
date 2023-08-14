import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

const MovieCard = ({id, title, director}:{id:number, title:string, director:string}) => {
  const navigate = useNavigate();

  return (
    <Container 
      onClick={()=>{navigate(`movie/${id}`)}}
    >
      title : {title} <br/> director : {director}
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