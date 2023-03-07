import gql from 'graphql-tag';

export const GetAllUsersQuery = gql(`
  query GetAllUsers {
    User {
      id
      email
      name
    }
  }
`);
