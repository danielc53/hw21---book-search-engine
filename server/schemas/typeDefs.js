const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID!
        authors: String!
        description: String
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID!
        user: String!
        email: String
        password: String!
        books: [Book]
    }

    type Query {
        getAllUsers: [User]!
        getSingleUser(userId: ID!): User
    }

    type Mutation {
        createUser(user: String!): User
        saveBook(userId: ID!, book: String): Book
        deleteBook(bookId: ID!): Book
    }
`;

module.exports = typeDefs;