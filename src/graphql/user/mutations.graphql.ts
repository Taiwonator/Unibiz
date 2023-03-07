import gql from 'graphql-tag';

export const LoginUser = gql(`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser
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
