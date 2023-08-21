import { graphql } from "../../gql/gql";


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

export {addMovie, updateMovie, deleteMovie};