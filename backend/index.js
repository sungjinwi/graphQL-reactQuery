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
    getMovies: [Movie]
  }

  type Mutation {
    addMovie(title: String, director: String) : Movie
  }
`;

async function getAllMovies() {
  
  const allMovies = await prisma.movie.findMany()
  console.dir(allMovies, { depth: null })
  return allMovies;
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