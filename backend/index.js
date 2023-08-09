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

  type Query {
    hello: String,
    getMovies: [Movie],
    getMovie(id: Int): Movie
  }

  type Mutation {
    addMovie(title: String, director: String) : Movie,
    updateMovie(title: String, director: String) : Movie
    deleteMovie(id: Int) : Int
  }
`;

async function getAllMovies() {
  const allMovies = await prisma.movie.findMany()
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

const updateMovie = async (title, director) => {
  const newMovie = await prisma.movie.update({
    where : {
      id: 2,
    },
    data: {
      title,
      director
    }
  });
  console.log(newMovie)
  return newMovie;
}

const deleteMovie = async (id) => {
  const deleteId = await prisma.movie.delete({
    where : {
      id : id
    }
  })
  return deleteId;
}

const resolvers = {
  Query: {
    getMovies: async ()=> {
      try {
        const movies = await getAllMovies()
        await prisma.$disconnect()
        return movies;
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