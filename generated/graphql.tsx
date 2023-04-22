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

export type CreateEventResponse = {
  __typename?: 'CreateEventResponse';
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type Event = Node & {
  __typename?: 'Event';
  bannerUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  eventImageUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  likes?: Maybe<Scalars['Int']>;
  location?: Maybe<Location>;
  name?: Maybe<Scalars['String']>;
  registerLink?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  society?: Maybe<Society>;
  tags?: Maybe<Array<Maybe<EventType>>>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export enum EventType {
  AlumniReunion = 'ALUMNI_REUNION',
  ArtExhibit = 'ART_EXHIBIT',
  CampusTour = 'CAMPUS_TOUR',
  CareerFair = 'CAREER_FAIR',
  CharityEvent = 'CHARITY_EVENT',
  ClubFair = 'CLUB_FAIR',
  ClubMeeting = 'CLUB_MEETING',
  Concert = 'CONCERT',
  DebateEvent = 'DEBATE_EVENT',
  GamingEvent = 'GAMING_EVENT',
  GuestSpeaker = 'GUEST_SPEAKER',
  Hackathon = 'HACKATHON',
  Lecture = 'LECTURE',
  MovieNight = 'MOVIE_NIGHT',
  MusicEvent = 'MUSIC_EVENT',
  NetworkingEvent = 'NETWORKING_EVENT',
  Other = 'OTHER',
  Performance = 'PERFORMANCE',
  PoliticalEvent = 'POLITICAL_EVENT',
  ReligiousEvent = 'RELIGIOUS_EVENT',
  ResearchEvent = 'RESEARCH_EVENT',
  Seminar = 'SEMINAR',
  SportsGame = 'SPORTS_GAME',
  StudySession = 'STUDY_SESSION',
  VolunteerEvent = 'VOLUNTEER_EVENT',
  WellnessEvent = 'WELLNESS_EVENT',
  Workshop = 'WORKSHOP'
}

export type Group = Society | Union;

export type Location = Node & {
  __typename?: 'Location';
  address?: Maybe<Scalars['String']>;
  event?: Maybe<Event>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  link?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export enum LocationType {
  Address = 'ADDRESS',
  Online = 'ONLINE',
  Tbd = 'TBD'
}

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<CreateEventResponse>;
  createUser?: Maybe<AuthenticatedUserResponse>;
  editEvent?: Maybe<Event>;
  loginCredentialsUser?: Maybe<AuthenticatedUserResponse>;
  setUserCurrentGroup?: Maybe<State>;
};


export type MutationCreateEventArgs = {
  address?: InputMaybe<Scalars['String']>;
  bannerUrl?: InputMaybe<Scalars['String']>;
  date: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  locationLink?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  registerLink?: InputMaybe<Scalars['String']>;
  societyId: Scalars['String'];
  tags?: InputMaybe<Array<InputMaybe<EventType>>>;
  thumbnailUrl?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type MutationEditEventArgs = {
  address?: InputMaybe<Scalars['String']>;
  bannerUrl?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  locationLink?: InputMaybe<Scalars['String']>;
  locationType?: InputMaybe<LocationType>;
  name?: InputMaybe<Scalars['String']>;
  registerLink?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<EventType>>>;
  thumbnailUrl?: InputMaybe<Scalars['String']>;
};


export type MutationLoginCredentialsUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationSetUserCurrentGroupArgs = {
  groupId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type Node = {
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  Event?: Maybe<Array<Maybe<Event>>>;
  FindEventById?: Maybe<Event>;
  FindEventBySocietyId?: Maybe<Array<Maybe<Event>>>;
  FindEventByUnionId?: Maybe<Array<Maybe<Event>>>;
  FindGroupById?: Maybe<Group>;
  FindPastEvents?: Maybe<Array<Maybe<Event>>>;
  FindSocietyById?: Maybe<Society>;
  FindUserById?: Maybe<User>;
  Society?: Maybe<Array<Maybe<Society>>>;
  Uni?: Maybe<Array<Maybe<Uni>>>;
  Union?: Maybe<Array<Maybe<Union>>>;
  User?: Maybe<Array<Maybe<User>>>;
  hello?: Maybe<Scalars['String']>;
};


export type QueryEventArgs = {
  societyId?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<EventType>>>;
  unionId?: InputMaybe<Scalars['String']>;
};


export type QueryFindEventByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryFindEventBySocietyIdArgs = {
  societyId?: InputMaybe<Scalars['String']>;
};


export type QueryFindEventByUnionIdArgs = {
  unionId?: InputMaybe<Scalars['String']>;
};


export type QueryFindGroupByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryFindPastEventsArgs = {
  societyId?: InputMaybe<Scalars['String']>;
  unionId?: InputMaybe<Scalars['String']>;
};


export type QueryFindSocietyByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryFindUserByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type Society = Node & {
  __typename?: 'Society';
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  events?: Maybe<Array<Maybe<Event>>>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  union?: Maybe<Union>;
  unionRequests?: Maybe<Array<Maybe<Union>>>;
  updatedAt?: Maybe<Scalars['String']>;
  userRequests?: Maybe<Array<Maybe<User>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type State = Node & {
  __typename?: 'State';
  currentGroup?: Maybe<Scalars['String']>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  previouslyLoggedIn?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
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
  createdAt?: Maybe<Scalars['String']>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  societies?: Maybe<Array<Maybe<Society>>>;
  societyRequests?: Maybe<Array<Maybe<Society>>>;
  uni?: Maybe<Uni>;
  updatedAt?: Maybe<Scalars['String']>;
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
  state?: Maybe<State>;
  type?: Maybe<Array<Maybe<Scalars['String']>>>;
  unionRequests?: Maybe<Array<Maybe<Union>>>;
  unions?: Maybe<Array<Maybe<Union>>>;
};

export type CreateEventMutationVariables = Exact<{
  name: Scalars['String'];
  societyId: Scalars['String'];
  date: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  locationLink?: InputMaybe<Scalars['String']>;
  registerLink?: InputMaybe<Scalars['String']>;
  bannerUrl?: InputMaybe<Scalars['String']>;
  thumbnailUrl?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<EventType>> | InputMaybe<EventType>>;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'CreateEventResponse', id?: string | null, slug?: string | null } | null };

export type EditEventMutationVariables = Exact<{
  eventId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  locationLink?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  locationType?: InputMaybe<LocationType>;
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  registerLink?: InputMaybe<Scalars['String']>;
  bannerUrl?: InputMaybe<Scalars['String']>;
  thumbnailUrl?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<EventType>> | InputMaybe<EventType>>;
}>;


export type EditEventMutation = { __typename?: 'Mutation', editEvent?: { __typename?: 'Event', id?: string | null, slug?: string | null } | null };

export type GetAllEventsQueryVariables = Exact<{
  unionId?: InputMaybe<Scalars['String']>;
  societyId?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<EventType>> | InputMaybe<EventType>>;
}>;


export type GetAllEventsQuery = { __typename?: 'Query', Event?: Array<{ __typename?: 'Event', id?: string | null, name?: string | null, tags?: Array<EventType | null> | null, bannerUrl?: string | null, thumbnailUrl?: string | null, date?: string | null, createdAt?: string | null, society?: { __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null } | null } | null> | null };

export type GetEventByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetEventByIdQuery = { __typename?: 'Query', FindEventById?: { __typename?: 'Event', id?: string | null, name?: string | null, tags?: Array<EventType | null> | null, bannerUrl?: string | null, description?: string | null, date?: string | null, registerLink?: string | null, location?: { __typename?: 'Location', type?: string | null, address?: string | null, link?: string | null } | null, society?: { __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null } | null } | null };

export type FindEventBySocietyIdQueryVariables = Exact<{
  societyId?: InputMaybe<Scalars['String']>;
}>;


export type FindEventBySocietyIdQuery = { __typename?: 'Query', FindEventBySocietyId?: Array<{ __typename?: 'Event', id?: string | null, name?: string | null, tags?: Array<EventType | null> | null, bannerUrl?: string | null, thumbnailUrl?: string | null, date?: string | null, createdAt?: string | null, society?: { __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null } | null } | null> | null };

export type FindEventByUnionIdQueryVariables = Exact<{
  unionId?: InputMaybe<Scalars['String']>;
}>;


export type FindEventByUnionIdQuery = { __typename?: 'Query', FindEventByUnionId?: Array<{ __typename?: 'Event', id?: string | null, name?: string | null, tags?: Array<EventType | null> | null, bannerUrl?: string | null, thumbnailUrl?: string | null, date?: string | null, createdAt?: string | null, society?: { __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null } | null } | null> | null };

export type GetPastEventsQueryVariables = Exact<{
  societyId?: InputMaybe<Scalars['String']>;
  unionId?: InputMaybe<Scalars['String']>;
}>;


export type GetPastEventsQuery = { __typename?: 'Query', FindPastEvents?: Array<{ __typename?: 'Event', id?: string | null, name?: string | null, tags?: Array<EventType | null> | null, bannerUrl?: string | null, thumbnailUrl?: string | null, date?: string | null, createdAt?: string | null, society?: { __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null } | null } | null> | null };

export type GroupQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GroupQuery = { __typename?: 'Query', FindGroupById?: { __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, description?: string | null, imageUrl?: string | null, createdAt?: string | null, users?: Array<{ __typename?: 'User', name?: string | null } | null> | null, userRequests?: Array<{ __typename?: 'User', name?: string | null } | null> | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null } | { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null, createdAt?: string | null, imageUrl?: string | null, users?: Array<{ __typename?: 'User', name?: string | null } | null> | null, userRequests?: Array<{ __typename?: 'User', name?: string | null } | null> | null, uni?: { __typename?: 'Uni', name?: string | null } | null, societies?: Array<{ __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, createdAt?: string | null } | null> | null } | null };

export type GetAllSocietiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSocietiesQuery = { __typename?: 'Query', Society?: Array<{ __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, createdAt?: string | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null } | null> | null };

export type GetSocietyByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetSocietyByIdQuery = { __typename?: 'Query', FindSocietyById?: { __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, createdAt?: string | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null } | null };

export type GetAllUnionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUnionsQuery = { __typename?: 'Query', Union?: Array<{ __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null, createdAt?: string | null, uni?: { __typename?: 'Uni', name?: string | null } | null, societies?: Array<{ __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, createdAt?: string | null } | null> | null } | null> | null };

export type LoginCredentialsUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginCredentialsUserMutation = { __typename?: 'Mutation', loginCredentialsUser?: { __typename?: 'AuthenticatedUserResponse', jwt?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'AuthenticatedUserResponse', jwt?: string | null } | null };

export type SetUserCurrentGroupMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
}>;


export type SetUserCurrentGroupMutation = { __typename?: 'Mutation', setUserCurrentGroup?: { __typename?: 'State', id?: string | null, currentGroup?: string | null } | null };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', User?: Array<{ __typename?: 'User', id?: string | null, email?: string | null, name?: string | null } | null> | null };

export type GetUserByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetUserByIdQuery = { __typename?: 'Query', FindUserById?: { __typename?: 'User', state?: { __typename?: 'State', currentGroup?: string | null } | null, societies?: Array<{ __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null, users?: Array<{ __typename?: 'User', name?: string | null } | null> | null, userRequests?: Array<{ __typename?: 'User', name?: string | null } | null> | null } | null> | null, unions?: Array<{ __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null, users?: Array<{ __typename?: 'User', name?: string | null } | null> | null, userRequests?: Array<{ __typename?: 'User', name?: string | null } | null> | null } | null> | null } | null };


export const CreateEventDocument = gql`
    mutation CreateEvent($name: String!, $societyId: String!, $date: String!, $description: String, $address: String, $locationLink: String, $registerLink: String, $bannerUrl: String, $thumbnailUrl: String, $tags: [EventType]) {
  createEvent(
    name: $name
    societyId: $societyId
    date: $date
    description: $description
    address: $address
    locationLink: $locationLink
    registerLink: $registerLink
    bannerUrl: $bannerUrl
    thumbnailUrl: $thumbnailUrl
    tags: $tags
  ) {
    id
    slug
  }
}
    `;

export function useCreateEventMutation() {
  return Urql.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument);
};
export const EditEventDocument = gql`
    mutation EditEvent($eventId: String!, $name: String, $locationLink: String, $date: String, $locationType: LocationType, $address: String, $description: String, $registerLink: String, $bannerUrl: String, $thumbnailUrl: String, $tags: [EventType]) {
  editEvent(
    id: $eventId
    name: $name
    locationLink: $locationLink
    date: $date
    locationType: $locationType
    address: $address
    description: $description
    registerLink: $registerLink
    bannerUrl: $bannerUrl
    thumbnailUrl: $thumbnailUrl
    tags: $tags
  ) {
    id
    slug
  }
}
    `;

export function useEditEventMutation() {
  return Urql.useMutation<EditEventMutation, EditEventMutationVariables>(EditEventDocument);
};
export const GetAllEventsDocument = gql`
    query GetAllEvents($unionId: String, $societyId: String, $tags: [EventType]) {
  Event(unionId: $unionId, societyId: $societyId, tags: $tags) {
    id
    name
    tags
    bannerUrl
    thumbnailUrl
    society {
      id
      name
      shortName
      union {
        id
        name
        shortName
      }
    }
    date
    createdAt
  }
}
    `;

export function useGetAllEventsQuery(options?: Omit<Urql.UseQueryArgs<GetAllEventsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllEventsQuery, GetAllEventsQueryVariables>({ query: GetAllEventsDocument, ...options });
};
export const GetEventByIdDocument = gql`
    query GetEventById($id: String) {
  FindEventById(id: $id) {
    id
    name
    tags
    bannerUrl
    description
    date
    registerLink
    location {
      type
      address
      link
    }
    society {
      id
      name
      shortName
      union {
        id
        name
        shortName
      }
    }
  }
}
    `;

export function useGetEventByIdQuery(options?: Omit<Urql.UseQueryArgs<GetEventByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEventByIdQuery, GetEventByIdQueryVariables>({ query: GetEventByIdDocument, ...options });
};
export const FindEventBySocietyIdDocument = gql`
    query FindEventBySocietyId($societyId: String) {
  FindEventBySocietyId(societyId: $societyId) {
    id
    name
    tags
    bannerUrl
    thumbnailUrl
    society {
      id
      name
      shortName
      union {
        id
        name
        shortName
      }
    }
    date
    createdAt
  }
}
    `;

export function useFindEventBySocietyIdQuery(options?: Omit<Urql.UseQueryArgs<FindEventBySocietyIdQueryVariables>, 'query'>) {
  return Urql.useQuery<FindEventBySocietyIdQuery, FindEventBySocietyIdQueryVariables>({ query: FindEventBySocietyIdDocument, ...options });
};
export const FindEventByUnionIdDocument = gql`
    query FindEventByUnionId($unionId: String) {
  FindEventByUnionId(unionId: $unionId) {
    id
    name
    tags
    bannerUrl
    thumbnailUrl
    society {
      id
      name
      shortName
      union {
        id
        name
        shortName
      }
    }
    date
    createdAt
  }
}
    `;

export function useFindEventByUnionIdQuery(options?: Omit<Urql.UseQueryArgs<FindEventByUnionIdQueryVariables>, 'query'>) {
  return Urql.useQuery<FindEventByUnionIdQuery, FindEventByUnionIdQueryVariables>({ query: FindEventByUnionIdDocument, ...options });
};
export const GetPastEventsDocument = gql`
    query GetPastEvents($societyId: String, $unionId: String) {
  FindPastEvents(societyId: $societyId, unionId: $unionId) {
    id
    name
    tags
    bannerUrl
    thumbnailUrl
    society {
      id
      name
      shortName
      union {
        id
        name
        shortName
      }
    }
    date
    createdAt
  }
}
    `;

export function useGetPastEventsQuery(options?: Omit<Urql.UseQueryArgs<GetPastEventsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPastEventsQuery, GetPastEventsQueryVariables>({ query: GetPastEventsDocument, ...options });
};
export const GroupDocument = gql`
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
    `;

export function useGroupQuery(options?: Omit<Urql.UseQueryArgs<GroupQueryVariables>, 'query'>) {
  return Urql.useQuery<GroupQuery, GroupQueryVariables>({ query: GroupDocument, ...options });
};
export const GetAllSocietiesDocument = gql`
    query GetAllSocieties {
  Society {
    id
    name
    shortName
    union {
      id
      name
      shortName
    }
    createdAt
  }
}
    `;

export function useGetAllSocietiesQuery(options?: Omit<Urql.UseQueryArgs<GetAllSocietiesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllSocietiesQuery, GetAllSocietiesQueryVariables>({ query: GetAllSocietiesDocument, ...options });
};
export const GetSocietyByIdDocument = gql`
    query GetSocietyById($id: String) {
  FindSocietyById(id: $id) {
    id
    name
    shortName
    union {
      id
      name
      shortName
    }
    createdAt
  }
}
    `;

export function useGetSocietyByIdQuery(options?: Omit<Urql.UseQueryArgs<GetSocietyByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSocietyByIdQuery, GetSocietyByIdQueryVariables>({ query: GetSocietyByIdDocument, ...options });
};
export const GetAllUnionsDocument = gql`
    query GetAllUnions {
  Union {
    id
    name
    shortName
    createdAt
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
    `;

export function useGetAllUnionsQuery(options?: Omit<Urql.UseQueryArgs<GetAllUnionsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllUnionsQuery, GetAllUnionsQueryVariables>({ query: GetAllUnionsDocument, ...options });
};
export const LoginCredentialsUserDocument = gql`
    mutation LoginCredentialsUser($email: String!, $password: String!) {
  loginCredentialsUser(email: $email, password: $password) {
    jwt
  }
}
    `;

export function useLoginCredentialsUserMutation() {
  return Urql.useMutation<LoginCredentialsUserMutation, LoginCredentialsUserMutationVariables>(LoginCredentialsUserDocument);
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
export const SetUserCurrentGroupDocument = gql`
    mutation SetUserCurrentGroup($userId: String, $groupId: String) {
  setUserCurrentGroup(userId: $userId, groupId: $groupId) {
    id
    currentGroup
  }
}
    `;

export function useSetUserCurrentGroupMutation() {
  return Urql.useMutation<SetUserCurrentGroupMutation, SetUserCurrentGroupMutationVariables>(SetUserCurrentGroupDocument);
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
export const GetUserByIdDocument = gql`
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
    `;

export function useGetUserByIdQuery(options?: Omit<Urql.UseQueryArgs<GetUserByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>({ query: GetUserByIdDocument, ...options });
};