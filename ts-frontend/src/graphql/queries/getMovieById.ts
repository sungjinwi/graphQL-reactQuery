import { graphql } from "../../gql";

const getMovieById:any = graphql(/* GraphQL */ `
  query movie($id: Int) {
    movie(id:$id) {
      title
      director
    }
  }
`)

export default getMovieById;