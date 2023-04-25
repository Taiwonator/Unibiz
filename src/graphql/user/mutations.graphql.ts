import gql from 'graphql-tag';

export const LoginCredentialsUser = gql(`
  mutation LoginCredentialsUser($email: String!, $password: String!) {
    loginCredentialsUser
    (
        email: $email,
        password: $password,
    ) {
        jwt
    }
  }
`);

export const CreateUsersQuery = gql(`
  mutation CreateUser($email: String!, $password: String!, $name: String!) {
    createUser
    (
        email: $email,
        password: $password,
        name: $name,
    ) {
        jwt
    }
  }
`);

export const CreatePasswordlessUserMutation = gql(`
  mutation CreatePasswordlessUser($email: String, $name: String) {
    createPasswordlessUser(email: $email, name: $name) {
      jwt
    }
  }
`);

export const UpdateUserCurrentGroupQuery = gql(`
  mutation SetUserCurrentGroup($userId: String, $groupId: String) {
    setUserCurrentGroup(userId: $userId, groupId: $groupId) {
      id
      currentGroup
    }
  }
`);

export const UpdateUserNameMutation = gql(`
  mutation UpdateUserName($userId: String!, $name: String!) {
    updateUserName(id: $userId, name: $name) {
      id
    }
  }
`);

export const DeleteEventMutation = gql(`
  mutation DeleteEvent($eventId: String!) {
    deleteEvent(id: $eventId) {
      id
      name
    }
  }
`);
