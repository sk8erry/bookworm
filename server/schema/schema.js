const graphql = require('graphql')
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql

//dummy data
var books = [
  {name: 'Harry Potter and the Secret Chamber', genre: 'Fantasy', id: '1'},
  {name: 'My War!', genre: 'Fantasy', id: '2'},
  {name: 'The Long March', genre: 'History', id: '3'}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parent, args) {
        //code to get data from db / other source
        return books.find(book => book.id === args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})