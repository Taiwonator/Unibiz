import gql from 'graphql-tag';

export const GetGroupById = gql(`
    query Group($id: String) {
        FindGroupById(id: $id) {
            ... on Society {
                id
                name
                shortName
                description
                imageUrl
                users {
                    name
                }
                userRequests {
                    name
                }
                union {
                    id
                    name
                    shortName
                }
                createdAt
            }
            ... on Union {
                id
                name
                shortName
                createdAt
                imageUrl
                users {
                    name
                }
                userRequests {
                    name
                }
                uni {
                    name
                }
                societies {
                    id
                    name
                    shortName
                    createdAt
                }
            }
        }
    }
`);
