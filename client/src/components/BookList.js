import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

class BookList extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <ul id="book-list">
          <li>Hello Ricky</li>
        </ul>
      </div>
    )
  }
}

//bind the query to component, query is stored in props
export default graphql(getBooksQuery)(BookList)