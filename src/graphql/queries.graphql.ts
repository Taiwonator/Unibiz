import gql from 'graphql-tag';

export const GetAllExperiencesQuery = gql(`
  query GetAllExperiences {
    Experience {
      id
      name
    }
  }
`);

export const GetAllUsersQuery = gql(`
  query GetAllUsers {
    User {
      id
      email
      firstName
    }
  }
`);
