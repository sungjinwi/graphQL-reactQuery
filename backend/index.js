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
    getUsers(name:String): [User]
  }

  type Mutation {
    addUser(name:String, age: Int): User
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
    getUsers: async (parent, args, contextValue, info)=> {
      try {
        const connection = await pool.getConnection();
        console.log(args)
        const [result] = await connection.query('select * from test WHERE name = ?', [args.name]);
        connection.release()
        return result
      }
      catch (e) {
        throw e
      }

    }
  },
  Mutation: {
    addUser: async (parent, args, contextValue, info) => {
      try {
        console.log(args)
        console.log("ssssss")
        const connection = await pool.getConnection();
        const [result] = await connection.query(`insert into test(name,age) values (?,?)`, [args.name, args.age]);
        connection.release()
        return result;
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