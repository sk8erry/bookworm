const graphql = require('graphql')
const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql
const Book = require('../models/book')
const Author = require('../models/author')

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        //return authors.find(author => author.id === parent.authorId)
        return Author.findById(parent.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return books.filter(book => book.authorId === parent.id)
        return Book.find({
          authorId: parent.id
        })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, args) {
        //code to get data from db / other source
        //return books.find(book => book.id === args.id)
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, args) {
        //return authors.find(author => author.id === args.id)
        return Author.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return books
        return Book.find({})
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //return authors
        return Author.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        imgUrl: {type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          imgUrl: args.imgUrl,
          authorId: args.authorId
        })
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

/*
mutation {
  addBook(
    name: "In Search of Lost Time"
    imgUrl: "https://images-na.ssl-images-amazon.com/images/I/51A685AMYoL.jpg"
    genre: "classic"
    authorId: "5caa96023fa1abd3a5b7933a"
  ) {
    name
  }
}

mutation {
  addAuthor(
    name: "David Grann"
    age: 52
  ) {
    name
    age
  }
}
*/