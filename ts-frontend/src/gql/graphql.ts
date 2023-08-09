/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Movie = {
  __typename?: 'Movie';
  director?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMovie?: Maybe<Movie>;
  deleteMovie?: Maybe<Scalars['Int']['output']>;
  updateMovie?: Maybe<Movie>;
};


export type MutationAddMovieArgs = {
  director?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteMovieArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateMovieArgs = {
  director?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getMovie?: Maybe<Movie>;
  getMovies?: Maybe<Array<Maybe<Movie>>>;
  hello?: Maybe<Scalars['String']['output']>;
};


export type QueryGetMovieArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type GetMoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMoviesQuery = { __typename?: 'Query', getMovies?: Array<{ __typename?: 'Movie', id?: number | null, title?: string | null, director?: string | null } | null> | null };

export type GetMovieQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMovieQuery = { __typename?: 'Query', getMovie?: { __typename?: 'Movie', title?: string | null, director?: string | null } | null };

export type CreateMovieMutationVariables = Exact<{
  title: Scalars['String']['input'];
  director: Scalars['String']['input'];
}>;


export type CreateMovieMutation = { __typename?: 'Mutation', addMovie?: { __typename?: 'Movie', title?: string | null, director?: string | null } | null };

export type UpdateMovieMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
  director?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateMovieMutation = { __typename?: 'Mutation', updateMovie?: { __typename?: 'Movie', title?: string | null, director?: string | null } | null };

export type DelteMovieByIdMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DelteMovieByIdMutation = { __typename?: 'Mutation', deleteMovie?: number | null };


export const GetMoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMovies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMovies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"director"}}]}}]}}]} as unknown as DocumentNode<GetMoviesQuery, GetMoviesQueryVariables>;
export const GetMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMovie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"director"}}]}}]}}]} as unknown as DocumentNode<GetMovieQuery, GetMovieQueryVariables>;
export const CreateMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"director"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMovie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"director"},"value":{"kind":"Variable","name":{"kind":"Name","value":"director"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"director"}}]}}]}}]} as unknown as DocumentNode<CreateMovieMutation, CreateMovieMutationVariables>;
export const UpdateMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"director"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMovie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"director"},"value":{"kind":"Variable","name":{"kind":"Name","value":"director"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"director"}}]}}]}}]} as unknown as DocumentNode<UpdateMovieMutation, UpdateMovieMutationVariables>;
export const DelteMovieByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"delteMovieById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMovie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DelteMovieByIdMutation, DelteMovieByIdMutationVariables>;