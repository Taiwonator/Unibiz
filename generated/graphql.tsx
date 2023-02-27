import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Experience = Node & {
  __typename?: 'Experience';
  astroid?: Maybe<Scalars['String']>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<Token>;
};


export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

export type Node = {
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  Experience?: Maybe<Array<Maybe<Experience>>>;
  Society?: Maybe<Array<Maybe<Society>>>;
  Union?: Maybe<Array<Maybe<Union>>>;
  User?: Maybe<Array<Maybe<User>>>;
  hello?: Maybe<Scalars['String']>;
};

export type Society = Node & {
  __typename?: 'Society';
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Token = {
  __typename?: 'Token';
  jwt?: Maybe<Scalars['String']>;
};

export type Union = Node & {
  __typename?: 'Union';
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type User = Node & {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'Token', jwt?: string | null } | null };

export type GetAllExperiencesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllExperiencesQuery = { __typename?: 'Query', Experience?: Array<{ __typename?: 'Experience', id?: string | null, name?: string | null } | null> | null };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', User?: Array<{ __typename?: 'User', id?: string | null, email?: string | null, firstName?: string | null } | null> | null };


export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  createUser(
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
  ) {
    jwt
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const GetAllExperiencesDocument = gql`
    query GetAllExperiences {
  Experience {
    id
    name
  }
}
    `;

export function useGetAllExperiencesQuery(options?: Omit<Urql.UseQueryArgs<GetAllExperiencesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllExperiencesQuery, GetAllExperiencesQueryVariables>({ query: GetAllExperiencesDocument, ...options });
};
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  User {
    id
    email
    firstName
  }
}
    `;

export function useGetAllUsersQuery(options?: Omit<Urql.UseQueryArgs<GetAllUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>({ query: GetAllUsersDocument, ...options });
};