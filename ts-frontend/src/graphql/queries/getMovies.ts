import { graphql } from "../../gql/gql";

const getMovies :any = graphql(/* GraphQL */ `
  query Movies ($first: Int, $after: String) {
    movies (first: $first, after: $after) {
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


export default getMovies;