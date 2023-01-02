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

export type Account = Node & {
  __typename?: 'Account';
  email?: Maybe<Scalars['String']>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
};

export type Event = Node & {
  __typename?: 'Event';
  astroid?: Maybe<Scalars['String']>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Node = {
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Array<Maybe<Account>>>;
  accountsById?: Maybe<Array<Maybe<Account>>>;
  event?: Maybe<Array<Maybe<Event>>>;
  hello?: Maybe<Scalars['String']>;
};


export type QueryAccountArgs = {
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusEnum>;
};


export type QueryAccountsByIdArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export enum StatusEnum {
  Active = 'ACTIVE',
  Disabled = 'DISABLED'
}

export type GetAllEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEventsQuery = { __typename?: 'Query', event?: Array<{ __typename?: 'Event', id?: string | null, name?: string | null, astroid?: string | null } | null> | null };


export const GetAllEventsDocument = gql`
    query GetAllEvents {
  event {
    id
    name
    astroid
  }
}
    `;

export function useGetAllEventsQuery(options?: Omit<Urql.UseQueryArgs<GetAllEventsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllEventsQuery, GetAllEventsQueryVariables>({ query: GetAllEventsDocument, ...options });
};