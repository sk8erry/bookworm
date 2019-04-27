import React from 'react'
import { graphql } from 'react-apollo' //bind apollo to react
import { getBooksQuery } from '../queries/queries'

class BookList extends React.Component {
  displayBooks() {
    var data = this.props.data
    if(data.loading) {
      return(<div>Loading books...</div>)
    } else {
      return data.books.map(book => {
        return(
          <li key={book.id}>{book.name}</li>
        )
      })
    }
  }

  render() {
    console.log(this.props.data)
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
      </div>
    )
  }
}

//bind the query to component, query is stored in props
export default graphql(getBooksQuery)(BookList)