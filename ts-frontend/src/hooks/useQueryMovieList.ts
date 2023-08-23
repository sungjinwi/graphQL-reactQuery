import { useInfiniteQuery } from "@tanstack/react-query"
import request from "graphql-request"
import { graphQLEndpoint } from "../common"
import { getMovieList } from "../graphql/queries"

const useQueryMovieList = () => {
  const result: any = useInfiniteQuery({
    queryKey : ['infiniteMovies'],
    queryFn : async ({pageParam = "1"}) => request(
      graphQLEndpoint,
      getMovieList,
      {first:3, after: pageParam}
    ),
    getNextPageParam: (lastPage:any, pages) => {
      return lastPage.movies.pageInfo.endCursor
    }
  });

  const pages = result.data?.pages

  const hasNextPage = pages?.at(-1).movies.pageInfo.hasNextPage

  return {
    ...result,
    pages,
    hasNextPage // 기존 result의 hasNextPage 덮어씌움
  }
}




export default useQueryMovieList