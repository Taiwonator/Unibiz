import gql from 'graphql-tag';

export const EditUnionMutation = gql(`
  mutation EditUnion($unionId: String!, $name: String, $shortName: String, $imageUrl: String) {
  editUnion(id: $unionId, name: $name, shortName: $shortName, imageUrl: $imageUrl) {
    id
    name
    shortName
    imageUrl
  }
}
`);

export const CreateFaqMutation = gql(`
  mutation CreateFaq($unionId: String!, $question: String!, $answer: String!) {
    createFAQ(unionId: $unionId, question: $question, answer: $answer) {
      question
      answer
    }
  }
`);

export const EditFAQMutation = gql(`
  mutation EditFAQ($faqId: String!, $question: String, $answer: String) {
    editFAQ(id: $faqId, question: $question, answer: $answer) {
      id
      answer
      question
    }
  }
`);

export const DeleteFAQMutation = gql(`
  mutation DeleteFAQ($faqId: String!) {
    deleteFAQ(id: $faqId) {
      question
      answer
      id
    }
  }
`);

export const RequestUnionFromUserMutation = gql(`
  mutation RequestUnionFromUser($userId: String!, $unionId: String!) {
    requestUnionFromUser(userId: $userId, unionId: $unionId) {
      id
    }
  }
`);

export const RequestUnionFromSocietyMutation = gql(`
  mutation RequestUnionFromSociety($societyId: String!, $unionId: String!) {
    requestUnionFromSociety(societyId: $societyId, unionId: $unionId) {
      id
    }
  }
`);

export const RemoveSocietyFromUnionMutation = gql(`
  mutation RemoveSocietyFromUnion($societyId: String!, $unionId: String!) {
    removeSocietyFromUnion(societyId: $societyId, unionId: $unionId) {
      id
    }
  }
`);

export const ProcessSocietyRequestMutation = gql(`
  mutation ProcessSocietyRequest($societyId: String!, $unionId: String!, $accept: Boolean!) {
    processSocietyRequest(societyId: $societyId, unionId: $unionId, accept: $accept) {
      id
    }
  }
`);
