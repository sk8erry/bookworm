const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
  imgUrl: String
  //No id needed because mongoDB automatically creates id
})

module.exports = mongoose.model('Book', bookSchema)