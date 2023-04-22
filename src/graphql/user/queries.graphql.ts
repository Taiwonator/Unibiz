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
