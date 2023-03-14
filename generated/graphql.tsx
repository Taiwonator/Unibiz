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

export type AuthenticatedUserResponse = Token & {
  __typename?: 'AuthenticatedUserResponse';
  jwt?: Maybe<Scalars['String']>;
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
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type GetAllExperiencesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllExperiencesQuery = { __typename?: 'Query', Experience?: Array<{ __typename?: 'Experience', id?: string | null, name?: string | null } | null> | null };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser?: { __typename?: 'AuthenticatedUserResponse', jwt?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'AuthenticatedUserResponse', jwt?: string | null } | null };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', User?: Array<{ __typename?: 'User', id?: string | null, email?: string | null, name?: string | null } | null> | null };


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
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    jwt
  }
}
    `;

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument);
};
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $password: String!, $name: String!, $type: String) {
  createUser(email: $email, password: $password, name: $name, type: $type) {
    jwt
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  User {
    id
    email
    name
  }
}
    `;

export function useGetAllUsersQuery(options?: Omit<Urql.UseQueryArgs<GetAllUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>({ query: GetAllUsersDocument, ...options });
};