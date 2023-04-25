import gql from 'graphql-tag';

export const GetAllUnionsQuery = gql(`
  query GetAllUnions {
    Union {
      id
      name
      shortName
      createdAt
      imageUrl
      uni {
        name
      }
      faqs {
        id
        question
        answer
      }
      societies {
        id
        name
        shortName
        imageUrl
        createdAt
      }
      userIds
      societyIds
      societyRequestIds
    }
  }
`);
