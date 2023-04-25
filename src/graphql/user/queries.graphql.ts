import gql from 'graphql-tag';

export const GetAllUsersQuery = gql(`
  query GetAllUsers {
    User {
      id
      email
      name
    }
  }
`);

export const GetUserByIdQuery = gql(`
  query GetUserById($id: String) {
    FindUserById(id: $id) {
      name
      state {
        currentGroup
      }
      societies {
        id
        name
        shortName
        union {
          id
          name
          shortName
        }
        users {
          name
        }
        userRequests {
          name
        }
      }
      unions {
        id
        name
        shortName
        users {
          name
        }
        userRequests {
          name
        }
      }
    }
  }
`);

export const GetUserByEmail = gql(`
  query GetUserByEmail($email: String) {
    FindUserByEmail(email: $email) {
      id
    }
  }
`);
