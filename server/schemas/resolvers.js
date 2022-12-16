const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models/index');

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return User.find();
        },
        getSingleUser: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
        },

    },

    Mutation: {
        createUser: async (parent, { User }) => {
            if (context.user) {
                return User.create({ User })
            }
            throw new AuthenticationError('Must be logged in')
        },
        saveBook: async (parent, { bookId, book }, context) => {
            if (context.user) {
                return Book.findOneAndUpdate(
                    { _id: bookId },
                    {
                        $addToSet: { books: book }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                )
            }
            throw new AuthenticationError('Must be logged in')
        },
        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return Book.findOneAndUpdate(
                    { _id: bookId },
                    { $pull: { books: book } },
                    { new: true }
                )
            }
            throw new AuthenticationError('Must be logged in')

        },

    }
};

module.exports = resolvers;