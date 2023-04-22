import gql from 'graphql-tag';

export const GetAllUnionsQuery = gql(`
  query GetAllUnions {
    Union {
      id
      name
      shortName
      createdAt
      uni {
        name
      }
      societies {
        id
        name
        shortName
        createdAt
      }
    }
  }
`);
