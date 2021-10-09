const { UserList, MovieList } = require("../FakeData");
//? since we arent using a REAL database, or JSON server, we can use LODASH temporarly
const _ = require("lodash");

const resolvers = {
  Query: {
    // USER RESOLVERS
    users: () => {
      return UserList;
    },
    //or if dont want to use "parent" yet, can place as (_, args)
    user: (parent, args) => {
      const id = args.id;
      //with lodash we can specify a list. followed by WHAT you WANT from the list
      // our UserList is an Array of objects btw, so we open with brackets 
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    //* MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },
  //* target favoriteMovies array INSIDE of User. Tell it to filter MovieList by yearOfPublication
  User: {
    favoriteMovies: () => {
        // will use lodash for now
      return _.filter(
        MovieList,
        (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

//   Mutation: {
//     createUser: (parent, args) => {
//       const user = args.input;
//       const lastId = UserList[UserList.length - 1].id;
//       user.id = lastId + 1;
//       UserList.push(user);
//       return user;
//     },

//     updateUsername: (parent, args) => {
//       const { id, newUsername } = args.input;
//       let userUpdated;
//       UserList.forEach((user) => {
//         if (user.id === Number(id)) {
//           user.username = newUsername;
//           userUpdated = user;
//         }
//       });

//       return userUpdated;
//     },

//     deleteUser: (parent, args) => {
//       const id = args.id;
//       _.remove(UserList, (user) => user.id === Number(id));
//       return null;
//     },
//   },
};

module.exports = { resolvers };