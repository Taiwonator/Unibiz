import gql from 'graphql-tag';

export const GetAllSocietiesQuery = gql(`
  query GetAllSocieties {
    Society {
      id
      name
      shortName
      union {
        id
        name
        shortName
      }
      createdAt
    }
  }
`);

export const GetSocietyById = gql(`
  query GetSocietyById($id: String) {
    FindSocietyById(id: $id) {
      id
      name
      shortName
      union {
        id
        name
        shortName
      }
      createdAt
    }
  }
`);
