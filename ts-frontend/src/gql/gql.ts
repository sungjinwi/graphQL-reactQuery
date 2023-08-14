/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getMovies {\n    getMovies {\n      id\n      title\n      director\n    }\n  }\n": types.GetMoviesDocument,
    "\n  mutation createMovie($title: String!, $director: String!) {\n    addMovie(title:$title, director:$director) {\n      title\n      director\n    }\n  }\n": types.CreateMovieDocument,
    "\n  mutation updateMovie($title: String, $director: String) {\n    updateMovie(title:$title, director:$director) {\n      title\n      director\n    }\n  }\n": types.UpdateMovieDocument,
    "\n  mutation delteMovieById($id: Int!) {\n    deleteMovie(id:$id)\n  }\n": types.DelteMovieByIdDocument,
    "\n  query getMovie($id: Int) {\n    getMovie(id:$id) {\n      title\n      director\n    }\n  }\n": types.GetMovieDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMovies {\n    getMovies {\n      id\n      title\n      director\n    }\n  }\n"): (typeof documents)["\n  query getMovies {\n    getMovies {\n      id\n      title\n      director\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createMovie($title: String!, $director: String!) {\n    addMovie(title:$title, director:$director) {\n      title\n      director\n    }\n  }\n"): (typeof documents)["\n  mutation createMovie($title: String!, $director: String!) {\n    addMovie(title:$title, director:$director) {\n      title\n      director\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateMovie($title: String, $director: String) {\n    updateMovie(title:$title, director:$director) {\n      title\n      director\n    }\n  }\n"): (typeof documents)["\n  mutation updateMovie($title: String, $director: String) {\n    updateMovie(title:$title, director:$director) {\n      title\n      director\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation delteMovieById($id: Int!) {\n    deleteMovie(id:$id)\n  }\n"): (typeof documents)["\n  mutation delteMovieById($id: Int!) {\n    deleteMovie(id:$id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMovie($id: Int) {\n    getMovie(id:$id) {\n      title\n      director\n    }\n  }\n"): (typeof documents)["\n  query getMovie($id: Int) {\n    getMovie(id:$id) {\n      title\n      director\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;