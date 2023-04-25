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
                userIds
                users {
                    id
                    name
                    email
                }
                userRequests {
                    id
                    name
                    email
                }
                userRequestIds
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
                userIds
                users {
                    id
                    name
                    email
                }
                userRequestIds
                societyRequestIds
                userRequests {
                    id
                    name
                    email
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
                 societyRequests {
                    id
                    name
                    shortName
                }
                faqs {
                    id
                    question
                    answer
                }
            }
        }
    }
`);
