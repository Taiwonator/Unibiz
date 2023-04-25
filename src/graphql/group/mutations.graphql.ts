import gql from 'graphql-tag';

export const LeaveGroupMutation = gql(`
  mutation LeaveGroup($userId: String!, $groupId: String!) {
    leaveGroup(userId: $userId, groupId: $groupId) {
      ... on Society {
        name 
        users {
          id
          name
          email
        }
      }

       ... on Union {
        name 
        users {
          id
          name
          email
        }
      }
    }
  }
`);

export const ProcessUserRequestMutation = gql(`
  mutation ProcessUserRequest($userId: String!, $groupId: String!, $accept: Boolean!) {
    processUserRequest(userId: $userId, groupId: $groupId, accept: $accept) {
      ... on Society {
        id
      }
      ... on Union {
        id
      }
    }
  }
`);

export const RemoveUserFromGroupMutation = gql(`
  mutation RemoveUserFromGroup($userId: String!, $groupId: String!) {
    removeUserFromGroup(userId: $userId, groupId: $groupId) {
      ... on Society {
        id
      }
      ... on Union {
        id
      }
    }
  }
`);
