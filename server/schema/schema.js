const graphql = require('graphql')
const _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const booksArr = [
    { name: 'book 1', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'book 2', genre: 'Fantasy', id: '2', authorId: '3' },
    { name: 'book 3', genre: 'Horror', id: '3', authorId: '2' },
    { name: 'book 4', genre: 'Fantasy', id: '4', authorId: '1' },
    { name: 'book 5', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'book 6', genre: 'Horror', id: '6', authorId: '2' }
]

const authorsArr = [
    { name: 'Bob Bobov', age: 44, id: '1' },
    { name: 'Stan Stanov', age: 42, id: '2' },
    { name: 'Bill Billov', age: 54, id: '3' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author:{
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authorsArr, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(booksArr, {authorId: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from db / other source
                return _.find(booksArr, { id: args.id });
            }
        },
        author:{
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from db / other source
                return _.find(authorsArr, { id: args.id });
            } 
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return booksArr
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authorsArr
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});