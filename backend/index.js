import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { PrismaClient } from '@prisma/client'

import dotenv from 'dotenv'

import cors from 'cors';
import express from 'express';

dotenv.config();

const app = express();

const prisma = new PrismaClient()

const typeDefs = `
  type Movie {
    id: Int
    title: String
    director: String
  }

  type MovieEdge {
    cursor: String
    node: Movie
  }

  type MovieConnection {
    edges: [MovieEdge]
    pageInfo: PageInfo
  }

  type PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    startCursor: String
    endCursor: String
  }

  type Query {
    hello: String,
    getMovies(first: Int, after: String): MovieConnection,
    getMovie(id: Int): Movie
  }

  type Mutation {
    addMovie(title: String, director: String) : Movie,
    updateMovie(title: String, director: String) : Movie
    deleteMovie(id: Int) : Int
  }
`;

async function getAllMovies(first, after) {

  const pageSize = first || 2;
  
  const allMovies = await prisma.movie.findMany({
    take: pageSize,
    skip: after != "1" ? 1 : 0,
    cursor: after ? {id: parseInt(after)} : undefined,
    cursor: {id: parseInt(after)},
    orderBy: {
      id: 'asc'
    }
  })
  // console.dir(allMovies, { depth: null })
  return allMovies;
}

const getMovieById = async (id) => {
  console.log("movieById start")
  const movieById = await prisma.movie.findUnique({
    where: {
      id : id
    }
  })
  console.log("movieById : " + JSON.stringify(movieById))
  return movieById;
}

async function addMovie(title, director) {
  const newMovie = await prisma.movie.create({
    data:{
      title,
      director
    }
  });
  console.dir(newMovie, { depth: null });
  return newMovie;
}

const updateMovie = async (id, title, director) => {
  const newMovie = await prisma.movie.update({
    where : {
      id: id,
    },
    data: {
      title,
      director
    }
  });
  console.log(newMovie + "added")
  return newMovie;
}

const deleteMovie = async (id) => {
  const deleteId = await prisma.movie.delete({
    where : {
      id : id
    }
  })
  console.log("delete success")
  return deleteId;
}



const resolvers = {
  Query: {
    getMovies: async (parent, {first, after})=> {
      try {
        const movies = await getAllMovies(first, after);
        const lastMovie = await prisma.movie.findFirst({
          orderBy: {
            id: 'desc'
          }
        })
        const isLastPage = movies.at(-1).id==lastMovie.id;
        await prisma.$disconnect()
        
        return {
          edges: movies.map(movie=> ({
            cursor: movie.id.toString(),
            node: movie
          })),
          pageInfo: {
            hasNextPage: !isLastPage,
            hasPreviousPage: false,
            startCursor: movies.length > 0 ? movies[0].id : null,
            endCursor: movies.length > 0 ? movies[movies.length - 1].id.toString() : null,
          }
        }
      }
      catch (e) {
        await prisma.$disconnect()
        throw e
      }
    },
    getMovie: async (parent, args)=> {
      try {
        const movie = await getMovieById(args.id);
        return movie;
      }
      catch (e) {
        throw e;
      }
    }
  },
  
  Mutation: {
    addMovie: async (parent, args) => {
      try {
        const newMovie = await addMovie(args.title, args.director);
        await prisma.$disconnect();
        return newMovie;
      }
      catch (e) {
        await prisma.$disconnect();
        throw e;
      }
    },
    updateMovie: async (parent, args) => {
      try {
        const newMovie = await updateMovie(args.title, args.director);
        await prisma.$disconnect();
        return newMovie;
      }
      catch (e) {
        await prisma.$disconnect();
        throw e;
      }
    },
    deleteMovie: async (parent, args) => {
      try {
        const resultId = await deleteMovie(args.id);
        await prisma.$disconnect();
        return resultId;
      }
      catch (e) {
        await prisma.$disconnect();
        throw e;
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use('/graphql', cors(), express.json(), expressMiddleware(server));

app.listen(3500,()=>console.log("server listening to localhost:3500"));