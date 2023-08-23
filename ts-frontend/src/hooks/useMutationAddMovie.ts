import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import { graphQLEndpoint } from "../common";
import { addMovie } from "../graphql/mutations";
import { produce } from "immer";
import useQueryMovieList from "./useQueryMovieList";


const useMutationAddMovie = ( titleValue:any, directorValue:any) => {

  const {data} = useQueryMovieList();

  const queryClient = useQueryClient();

  
  const addMutation = useMutation( async () => request(
      graphQLEndpoint,
      addMovie,
      {title: titleValue ,director: directorValue}
    ), {
      onSuccess: (result:any)=> {
        if (data) {
          console.log('addition success');
          console.log(result);
          const updatedMovies = produce(data, (draft:any)=>{
            draft.pages.at(-1).movies.edges.push({node:{...result?.addMovie, id:0}})
          });
          console.log(data?.pages.at(-1).length)
          if (data?.pages.at(-1).movies.edges.length != 3) {
            queryClient.setQueryData(['infiniteMovies'], (oldData:any) => oldData ? 
            updatedMovies
            : oldData
            )
          }
        }
        
      }
    },);
  
  return {
    addMutation
  }
}

export default useMutationAddMovie;