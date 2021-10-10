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

//?  Mutations, when using arguments within mutations, USE GraphQL's input
//? Input: allows you to define inputs for arguments 
//? input CreateUserInput {...}  (little diff from type's and interfaces)
//? more like a bigger argument field that looks nicer

//* input's(gql) can do MORE than types,
//* ex. can do "age: Int" not required (no !), but can have it DEFAULTed to "age: Int = 18" if an AGE is NOT given. 

//? make "createUser(input: CreateUserInput!): User" required: should pass in Input to CREATE a USer.

// "nationality: Nationality = BRAZIL" making this NOT required when creating user inside Input.
//? the reason being, if they DONT give EXACTLY spelling, it will fail. ( can do a converter tho, but nvm that)
//? will just make it not required and add a DEFAULT value to it. 



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