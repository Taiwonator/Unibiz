import gql from 'graphql-tag';

export const CreateEventMutation = gql(`
 mutation CreateEvent($name: String!, $societyId: String!, $date: String!, $description: String, $address: String, $locationLink: String, $registerLink: String, $bannerUrl: String, $thumbnailUrl: String, $tags: [EventType]) {
  createEvent(name: $name, societyId: $societyId, date: $date, description: $description, address: $address, locationLink: $locationLink, registerLink: $registerLink, bannerUrl: $bannerUrl, thumbnailUrl: $thumbnailUrl, tags: $tags) {
    id
    slug
  }
}
`);

export const EditEventMutation = gql(`
  mutation EditEvent($eventId: String!, $name: String, $locationLink: String, $date: String, $locationType: LocationType, $address: String, $description: String, $registerLink: String, $bannerUrl: String, $thumbnailUrl: String, $tags: [EventType]) {
    editEvent(id: $eventId, name: $name, locationLink: $locationLink, date: $date, locationType: $locationType, address: $address, description: $description, registerLink: $registerLink, bannerUrl: $bannerUrl, thumbnailUrl: $thumbnailUrl, tags: $tags) {
      id
      slug
    }
  }
`);

export const LikeEventMutation = gql(`
  mutation LikeEvent($eventId: String!) {
    likeEvent(id: $eventId) {
      id
      likes
      name
    }
  }
`);

export const AddEventImageUrlsMutation = gql(`
  mutation AddEventImageUrls($eventId: String!, $imageUrls: [String!]!) {
    addEventImageUrls(id: $eventId, imageUrls: $imageUrls) {
      id
    }
  }
`);

export const DeleteEventImageUrlMutation = gql(`
  mutation DeleteEventImageUrl($eventId: String!, $imageUrl: String!) {
    deleteEventImageUrl(id: $eventId, imageUrl: $imageUrl)
  }
`);
