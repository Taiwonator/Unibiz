import gql from 'graphql-tag';

export const GetAllExperiencesQuery = gql(`
  query GetAllExperiences {
    Experience {
      id
      name
    }
  }
`);
