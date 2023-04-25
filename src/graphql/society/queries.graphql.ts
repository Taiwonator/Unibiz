import gql from 'graphql-tag';

export const GetAllSocietiesQuery = gql(`
  query GetAllSocieties($verified: Boolean) {
    Society(verified: $verified) {
      id
      name
      shortName
      imageUrl
      union {
        id
        name
        shortName
      }
      userIds
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
      imageUrl
      description
      union {
        id
        name
        shortName
        imageUrl
      }
      userIds
      createdAt
      totalEventLikes
      eventIds
      eventImageUrls {
        id
        eventId
        eventImageUrl
      }
    }
  }
`);
