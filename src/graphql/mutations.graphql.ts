import gql from 'graphql-tag';

export const CreateUsersQuery = gql(`
  mutation CreateUser($email: String!, $password: String!, $firstName: String! $lastName: String!) {
    createUser
    (
        email: $email,
        password: $password,
        firstName: $firstName,
        lastName: $lastName,
    ) {
        id
        email
        firstName
        lastName
        password
        token
    }
  }
`);
