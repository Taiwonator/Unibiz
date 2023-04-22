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
  mutation CreateUser($email: String!, $password: String!, $name: String!, $type: String) {
    createUser
    (
        email: $email,
        password: $password,
        name: $name,
        type: $type,
    ) {
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
