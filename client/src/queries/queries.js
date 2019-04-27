import { gql } from 'apollo-boost' //help construct and pass the query

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

export {getAuthorsQuery, getBooksQuery}