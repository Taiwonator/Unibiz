import gql from 'graphql-tag';

export const GetAllEventsDocument = gql(`
  query GetAllEvents {
    event {
      id
      name
      astroid
    }
  }
`);
