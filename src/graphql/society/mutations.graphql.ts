import gql from 'graphql-tag';

export const EditSocietyMutation = gql(`
  mutation EditSociety($societyId: String!, $name: String, $shortName: String, $description: String, $imageUrl: String) {
  editSociety(id: $societyId, name: $name, shortName: $shortName, description: $description, imageUrl: $imageUrl) {
    id
    name
    shortName
    description
    imageUrl
  }
}
`);

export const CreateSocietyMutation = gql(`
  mutation CreateSociety($name: String!, $shortName: String!, $description: String!, $imageUrl: String!, $userId: String!) {
    createSociety(name: $name, shortName: $shortName, description: $description, imageUrl: $imageUrl, userId: $userId) {
      id
    }
  }
`);

export const DeleteSocietyMutation = gql(`
  mutation DeleteSociety($societyId: String!) {
    deleteSociety(id: $societyId) {
      id
      name
    }
  }
`);

export const LeaveSocietyMutation = gql(`
  mutation LeaveSociety($userId: String!, $societyId: String!) {
    leaveSociety(userId: $userId, societyId: $societyId) {
      name 
      users {
        id
        name
        email
      }
    }
  }
`);
//
export const RequestSocietyFromUserMutation = gql(`
  mutation RequestSocietyFromUser($userId: String!, $societyId: String!) {
    requestSocietyFromUser(userId: $userId, societyId: $societyId) {
      id
    }
  }
`);
