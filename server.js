const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP

const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')
const app = express();

const authors = [
    {id: 1, name: 'J. K.Rowlings'},
    {id: 2, name: 'C. Y. Okeleke'},
    {id: 3, name: 'Robert Green'}
]

const books = [
    { id: 1, name: 'Harry potter and the Prisoner of azkaban', authorId: 1 },
    { id: 2, name: 'Harry potter and the Chambers of secrets', authorId: 1 },
    { id: 3, name: 'Harry potter and the Goblit of fire', authorId: 1 },
    { id: 4, name: 'The fellowship of the ring', authorId: 2 },
    { id: 5, name: 'Thw two towers', authorId: 2 },
    { id: 6, name: 'The return of the king', authorId: 2 },
    { id: 7, name: 'The way of Shadows', authorId: 3 },
    { id: 8, name: 'Beyond the Shadows', authorId: 3 },

]

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        name: { type: GraphQLNonNull(GraphQLString)},
        authorId: { type: GraphQLNonNull(GraphQLInt)}
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve: () => books
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("Server running")
})