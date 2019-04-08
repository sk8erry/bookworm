const express = require("express")
const graphqlHTTP = require("express-graphql")
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb+srv://ricky:test1234@booksworm-ez0bx.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
mongoose.connection.once('open',() => {
  console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
  schema, //graphql schema
  graphiql: true
}))

app.listen(4000,()=>{
  console.log('now listening for requests on port 4000')
})