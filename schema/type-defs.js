const { gql } = require("apollo-server");



//.. ! means required, type | null w/o it
//.. can be placed in [User!] (stuff inside array is required),  
//.. and outside []! (array is required)
//.. to get a SPECIFIC object by ID, ex.  user(id: ID!): User!
//.. ^^ means that it fetching the user MUST be done with ID, and it MUST HAVE a User. 
//* faroviteMovies is important details:::
//* establishing a filter via User rather than inside of Movie list
//* NEED a RESOLVER for this type explaining HOW we will be getting that data
//* so HOW do we know which movies are the favored one's for EACH user??


const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }
  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }
  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }
  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = BRAZIL
  }
  input UpdateUsernameInput {
    id: ID!
    newUsername: String!
  }
  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(id: ID!): User
  }
  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
    UKRAINE
  }
`;

module.exports = { typeDefs };