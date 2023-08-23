import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { graphQLEndpoint } from '../common'
import { getMovieById } from '../graphql/queries'

const useQueryMovie = (id:any) => {

  const { data } : any = useQuery(
    ['movie', {id}],
    async ()=> request(
      graphQLEndpoint,
      getMovieById,
      {id}
    )
  )

  const movie = data?.movie

  return (
    movie
  )
}

export default useQueryMovie