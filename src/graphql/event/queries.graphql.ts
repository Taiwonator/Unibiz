import gql from 'graphql-tag';

export const GetAllEventsQuery = gql(`
  query GetAllEvents($unionId: String, $societyId: String, $tags: [EventType]) {
    Event(unionId: $unionId, societyId: $societyId, tags: $tags) {
      id
      name
      tags
      bannerUrl
      likes
      thumbnailUrl
      society {
        id
        name
        shortName
        union {
          id
          name 
          shortName
        }
      }
      date
      createdAt
    }
  }
`);

export const GetUnverifiedEventsQuery = gql(`
  query FindUnverifiedEvents {
    FindUnverifiedEvents {
       id
      name
      tags
      bannerUrl
      thumbnailUrl
      society {
        id
        name
        shortName
        union {
          id
          name 
          shortName
        }
      }
      date
      createdAt
    }
  }
`);

export const GetEventById = gql(`
  query GetEventById($id: String) {
    FindEventById(id: $id) {
      id
      name
      tags
      bannerUrl
      description
      date
      likes
      registerLink
      eventImageUrls
      location {
        type
        address
        link
      }
      society {
        id
        name 
        shortName
        union {
          id
          name
          shortName
        }
      }
    }
  }
`);

export const GetEventBySocietyId = gql(`
  query FindEventBySocietyId($societyId: String) {
    FindEventBySocietyId(societyId: $societyId) {
      id
      name
      tags
      bannerUrl
      thumbnailUrl
      society {
        id
        name
        shortName
        union {
          id
          name 
          shortName
        }
      }
      date
      createdAt
    }
  }
`);

export const GetEventByUnionId = gql(`
  query FindEventByUnionId($unionId: String) {
    FindEventByUnionId(unionId: $unionId) {
      id
      name
      tags
      bannerUrl
      thumbnailUrl
      society {
        id
        name
        shortName
        union {
          id
          name 
          shortName
        }
      }
      date
      createdAt
    }
  }
`);

export const GetPastEvents = gql(`
  query GetPastEvents($societyId: String, $unionId: String) {
    FindPastEvents(societyId: $societyId, unionId: $unionId) {
      id
      name
      tags
      bannerUrl
      thumbnailUrl
      society {
        id
        name
        shortName
        union {
          id
          name 
          shortName
        }
      }
      date
      createdAt
    }
  }
`);

export const GetSimilarEvents = gql(`
  query FindSimilarEvents($eventId: String!) {
    FindSimilarEvents(eventId: $eventId) {
      id
      name
      tags
      bannerUrl
      thumbnailUrl
      society {
        id
        name
        shortName
        union {
          id
          name 
          shortName
        }
      }
      date
      createdAt
    }
  }
`);
