import React from 'react'
import { gql } from 'apollo-boost' //help construct and pass the query
import { graphql } from 'react-apollo' //bind apollo to react
import { getAuthorsQuery } from '../queries/queries'

class AddBook extends React.Component {
  displayAuthors() {
    var data = this.props.data
    if (data.loading) {
      return(<option disabled>Loading Authors...</option>)
    } else {
      return(
        data.authors.map(author => {
          return(<option key={author.id} value={author.id}>{author.name}</option>)
        })
      )
    }
  }

  render() {
    console.log(this.props.data)
    return (
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text"></input>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text"></input>
        </div>
        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

//bind the query to component, query is stored in props
export default graphql(getAuthorsQuery)(AddBook)
