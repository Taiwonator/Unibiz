import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthenticatedUserResponse = Token & {
  __typename?: 'AuthenticatedUserResponse';
  jwt?: Maybe<Scalars['String']>;
};

export type Event = Node & {
  __typename?: 'Event';
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  society?: Maybe<Society>;
  type?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<AuthenticatedUserResponse>;
  loginUser?: Maybe<AuthenticatedUserResponse>;
};

export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type MutationLoginUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Node = {
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  Event?: Maybe<Array<Maybe<Event>>>;
  Society?: Maybe<Array<Maybe<Society>>>;
  Uni?: Maybe<Array<Maybe<Uni>>>;
  Union?: Maybe<Array<Maybe<Union>>>;
  User?: Maybe<Array<Maybe<User>>>;
  hello?: Maybe<Scalars['String']>;
};

export type Society = Node & {
  __typename?: 'Society';
  events?: Maybe<Array<Maybe<Event>>>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  union?: Maybe<Array<Maybe<Union>>>;
  unionRequests?: Maybe<Array<Maybe<Union>>>;
  userRequests?: Maybe<Array<Maybe<User>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Token = {
  jwt?: Maybe<Scalars['String']>;
};

export type Uni = Node & {
  __typename?: 'Uni';
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Union = Node & {
  __typename?: 'Union';
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  societies?: Maybe<Array<Maybe<Society>>>;
  societyRequests?: Maybe<Array<Maybe<Society>>>;
  uni?: Maybe<Uni>;
  userRequests?: Maybe<Array<Maybe<User>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type User = Node & {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  societies?: Maybe<Array<Maybe<Society>>>;
  societyRequests?: Maybe<Array<Maybe<Society>>>;
  type?: Maybe<Array<Maybe<Scalars['String']>>>;
  unionRequests?: Maybe<Array<Maybe<Union>>>;
  unions?: Maybe<Array<Maybe<Union>>>;
};

export type GetAllEventsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllEventsQuery = {
  __typename?: 'Query';
  Event?: Array<{
    __typename?: 'Event';
    id?: string | null;
    name?: string | null;
  } | null> | null;
};

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginUserMutation = {
  __typename?: 'Mutation';
  loginUser?: {
    __typename?: 'AuthenticatedUserResponse';
    jwt?: string | null;
  } | null;
};

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser?: {
    __typename?: 'AuthenticatedUserResponse';
    jwt?: string | null;
  } | null;
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllUsersQuery = {
  __typename?: 'Query';
  User?: Array<{
    __typename?: 'User';
    id?: string | null;
    email?: string | null;
    name?: string | null;
  } | null> | null;
};

export const GetAllEventsDocument = gql`
  query GetAllEvents {
    Event {
      id
      name
    }
  }
`;

export function useGetAllEventsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllEventsQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetAllEventsQuery, GetAllEventsQueryVariables>({
    query: GetAllEventsDocument,
    ...options,
  });
}
export const LoginUserDocument = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      jwt
    }
  }
`;

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument
  );
}
export const CreateUserDocument = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $name: String!
    $type: String
  ) {
    createUser(email: $email, password: $password, name: $name, type: $type) {
      jwt
    }
  }
`;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument
  );
}
export const GetAllUsersDocument = gql`
  query GetAllUsers {
    User {
      id
      email
      name
    }
  }
`;

export function useGetAllUsersQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllUsersQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>({
    query: GetAllUsersDocument,
    ...options,
  });
}
