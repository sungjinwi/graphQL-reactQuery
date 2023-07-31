import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

import cors from 'cors';
import express from 'express';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});


const app = express();

const typeDefs = `
  type User {
    name: String
    age: Int
  }

  type Query {
    hello: String,
    getUsers: [User]
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    getUsers: async ()=> {
      try {
        const connection = await pool.getConnection();
        const [result] = await connection.query('select * from test');
        return result
      }
      catch (e) {
        throw e
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