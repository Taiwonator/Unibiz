import gql from 'graphql-tag';

export const GetAllEventsQuery = gql(`
  query GetAllEvents {
    Event {
      id
      name
    }
  }
`);
