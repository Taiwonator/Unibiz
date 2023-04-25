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

export type EventImage = {
  __typename?: 'EventImage';
  eventId?: Maybe<Scalars['String']>;
  eventImageUrl?: Maybe<Scalars['String']>;
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

export type Faq = Node & {
  __typename?: 'FAQ';
  answer?: Maybe<Scalars['String']>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  question?: Maybe<Scalars['String']>;
};

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
  addEventImageUrls?: Maybe<Event>;
  createEvent?: Maybe<CreateEventResponse>;
  createFAQ?: Maybe<Faq>;
  createPasswordlessUser?: Maybe<AuthenticatedUserResponse>;
  createSociety?: Maybe<Society>;
  createUser?: Maybe<AuthenticatedUserResponse>;
  deleteEvent?: Maybe<Event>;
  deleteEventImageUrl?: Maybe<Scalars['String']>;
  deleteFAQ?: Maybe<Faq>;
  deleteSociety?: Maybe<Society>;
  editEvent?: Maybe<Event>;
  editFAQ?: Maybe<Faq>;
  editSociety?: Maybe<Society>;
  editUnion?: Maybe<Union>;
  leaveGroup?: Maybe<Group>;
  leaveSociety?: Maybe<Society>;
  likeEvent?: Maybe<Event>;
  loginCredentialsUser?: Maybe<AuthenticatedUserResponse>;
  processSocietyRequest?: Maybe<Union>;
  processUserRequest?: Maybe<Group>;
  removeSocietyFromUnion?: Maybe<Union>;
  removeUserFromGroup?: Maybe<Group>;
  requestSocietyFromUser?: Maybe<User>;
  requestUnionFromSociety?: Maybe<Society>;
  requestUnionFromUser?: Maybe<User>;
  setUserCurrentGroup?: Maybe<State>;
  updateUserName?: Maybe<User>;
};


export type MutationAddEventImageUrlsArgs = {
  id: Scalars['String'];
  imageUrls: Array<Scalars['String']>;
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


export type MutationCreateFaqArgs = {
  answer: Scalars['String'];
  question: Scalars['String'];
  unionId: Scalars['String'];
};


export type MutationCreatePasswordlessUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationCreateSocietyArgs = {
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  shortName: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteEventArgs = {
  id: Scalars['String'];
};


export type MutationDeleteEventImageUrlArgs = {
  id: Scalars['String'];
  imageUrl: Scalars['String'];
};


export type MutationDeleteFaqArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSocietyArgs = {
  id: Scalars['String'];
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


export type MutationEditFaqArgs = {
  answer?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  question?: InputMaybe<Scalars['String']>;
};


export type MutationEditSocietyArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type MutationEditUnionArgs = {
  id: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type MutationLeaveGroupArgs = {
  groupId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationLeaveSocietyArgs = {
  societyId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationLikeEventArgs = {
  id: Scalars['String'];
};


export type MutationLoginCredentialsUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationProcessSocietyRequestArgs = {
  accept: Scalars['Boolean'];
  societyId: Scalars['String'];
  unionId: Scalars['String'];
};


export type MutationProcessUserRequestArgs = {
  accept: Scalars['Boolean'];
  groupId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRemoveSocietyFromUnionArgs = {
  societyId: Scalars['String'];
  unionId: Scalars['String'];
};


export type MutationRemoveUserFromGroupArgs = {
  groupId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRequestSocietyFromUserArgs = {
  societyId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRequestUnionFromSocietyArgs = {
  societyId: Scalars['String'];
  unionId: Scalars['String'];
};


export type MutationRequestUnionFromUserArgs = {
  unionId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationSetUserCurrentGroupArgs = {
  groupId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserNameArgs = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
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
  FindUnverifiedEvents?: Maybe<Array<Maybe<Event>>>;
  FindUserByEmail?: Maybe<User>;
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


export type QueryFindUserByEmailArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type QueryFindUserByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QuerySocietyArgs = {
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type Society = Node & {
  __typename?: 'Society';
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  eventIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  eventImageUrls?: Maybe<Array<Maybe<EventImage>>>;
  events?: Maybe<Array<Maybe<Event>>>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  totalEventLikes?: Maybe<Scalars['Int']>;
  union?: Maybe<Union>;
  unionRequests?: Maybe<Array<Maybe<Union>>>;
  updatedAt?: Maybe<Scalars['String']>;
  userIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  userRequestIds?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  faqs?: Maybe<Array<Maybe<Faq>>>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']>;
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  societies?: Maybe<Array<Maybe<Society>>>;
  societyIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  societyRequestIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  societyRequests?: Maybe<Array<Maybe<Society>>>;
  uni?: Maybe<Uni>;
  updatedAt?: Maybe<Scalars['String']>;
  userIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  userRequestIds?: Maybe<Array<Maybe<Scalars['String']>>>;
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

export type LikeEventMutationVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type LikeEventMutation = { __typename?: 'Mutation', likeEvent?: { __typename?: 'Event', id?: string | null, likes?: number | null, name?: string | null } | null };

export type AddEventImageUrlsMutationVariables = Exact<{
  eventId: Scalars['String'];
  imageUrls: Array<Scalars['String']> | Scalars['String'];
}>;


export type AddEventImageUrlsMutation = { __typename?: 'Mutation', addEventImageUrls?: { __typename?: 'Event', id?: string | null } | null };

export type DeleteEventImageUrlMutationVariables = Exact<{
  eventId: Scalars['String'];
  imageUrl: Scalars['String'];
}>;


export type DeleteEventImageUrlMutation = { __typename?: 'Mutation', deleteEventImageUrl?: string | null };

export type GetAllEventsQueryVariables = Exact<{
  unionId?: InputMaybe<Scalars['String']>;
  societyId?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<EventType>> | InputMaybe<EventType>>;
}>;


export type GetAllEventsQuery = { __typename?: 'Query', Event?: Array<{ __typename?: 'Event', id?: string | null, name?: string | null, tags?: Array<EventType | null> | null, bannerUrl?: string | null, likes?: number | null, thumbnailUrl?: string | null, date?: string | null, createdAt?: string | null, society?: { __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null } | null } | null> | null };

export type FindUnverifiedEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUnverifiedEventsQuery = { __typename?: 'Query', FindUnverifiedEvents?: Array<{ __typename?: 'Event', id?: string | null, name?: string | null, tags?: Array<EventType | null> | null, bannerUrl?: string | null, thumbnailUrl?: string | null, date?: string | null, createdAt?: string | null, society?: { __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null } | null } | null> | null };

export type GetEventByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetEventByIdQuery = { __typename?: 'Query', FindEventById?: { __typename?: 'Event', id?: string | null, name?: string | null, tags?: Array<EventType | null> | null, bannerUrl?: string | null, description?: string | null, date?: string | null, likes?: number | null, registerLink?: string | null, eventImageUrls?: Array<string | null> | null, location?: { __typename?: 'Location', type?: string | null, address?: string | null, link?: string | null } | null, society?: { __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null } | null } | null };

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

export type LeaveGroupMutationVariables = Exact<{
  userId: Scalars['String'];
  groupId: Scalars['String'];
}>;


export type LeaveGroupMutation = { __typename?: 'Mutation', leaveGroup?: { __typename?: 'Society', name?: string | null, users?: Array<{ __typename?: 'User', id?: string | null, name?: string | null, email?: string | null } | null> | null } | { __typename?: 'Union', name?: string | null, users?: Array<{ __typename?: 'User', id?: string | null, name?: string | null, email?: string | null } | null> | null } | null };

export type ProcessUserRequestMutationVariables = Exact<{
  userId: Scalars['String'];
  groupId: Scalars['String'];
  accept: Scalars['Boolean'];
}>;


export type ProcessUserRequestMutation = { __typename?: 'Mutation', processUserRequest?: { __typename?: 'Society', id?: string | null } | { __typename?: 'Union', id?: string | null } | null };

export type RemoveUserFromGroupMutationVariables = Exact<{
  userId: Scalars['String'];
  groupId: Scalars['String'];
}>;


export type RemoveUserFromGroupMutation = { __typename?: 'Mutation', removeUserFromGroup?: { __typename?: 'Society', id?: string | null } | { __typename?: 'Union', id?: string | null } | null };

export type GroupQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GroupQuery = { __typename?: 'Query', FindGroupById?: { __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, description?: string | null, imageUrl?: string | null, userIds?: Array<string | null> | null, userRequestIds?: Array<string | null> | null, createdAt?: string | null, users?: Array<{ __typename?: 'User', id?: string | null, name?: string | null, email?: string | null } | null> | null, userRequests?: Array<{ __typename?: 'User', id?: string | null, name?: string | null, email?: string | null } | null> | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null } | { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null, createdAt?: string | null, imageUrl?: string | null, userIds?: Array<string | null> | null, userRequestIds?: Array<string | null> | null, societyRequestIds?: Array<string | null> | null, users?: Array<{ __typename?: 'User', id?: string | null, name?: string | null, email?: string | null } | null> | null, userRequests?: Array<{ __typename?: 'User', id?: string | null, name?: string | null, email?: string | null } | null> | null, uni?: { __typename?: 'Uni', name?: string | null } | null, societies?: Array<{ __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, createdAt?: string | null } | null> | null, societyRequests?: Array<{ __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null } | null> | null, faqs?: Array<{ __typename?: 'FAQ', id?: string | null, question?: string | null, answer?: string | null } | null> | null } | null };

export type EditSocietyMutationVariables = Exact<{
  societyId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  shortName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
}>;


export type EditSocietyMutation = { __typename?: 'Mutation', editSociety?: { __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, description?: string | null, imageUrl?: string | null } | null };

export type CreateSocietyMutationVariables = Exact<{
  name: Scalars['String'];
  shortName: Scalars['String'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  userId: Scalars['String'];
}>;


export type CreateSocietyMutation = { __typename?: 'Mutation', createSociety?: { __typename?: 'Society', id?: string | null } | null };

export type DeleteSocietyMutationVariables = Exact<{
  societyId: Scalars['String'];
}>;


export type DeleteSocietyMutation = { __typename?: 'Mutation', deleteSociety?: { __typename?: 'Society', id?: string | null, name?: string | null } | null };

export type LeaveSocietyMutationVariables = Exact<{
  userId: Scalars['String'];
  societyId: Scalars['String'];
}>;


export type LeaveSocietyMutation = { __typename?: 'Mutation', leaveSociety?: { __typename?: 'Society', name?: string | null, users?: Array<{ __typename?: 'User', id?: string | null, name?: string | null, email?: string | null } | null> | null } | null };

export type RequestSocietyFromUserMutationVariables = Exact<{
  userId: Scalars['String'];
  societyId: Scalars['String'];
}>;


export type RequestSocietyFromUserMutation = { __typename?: 'Mutation', requestSocietyFromUser?: { __typename?: 'User', id?: string | null } | null };

export type GetAllSocietiesQueryVariables = Exact<{
  verified?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetAllSocietiesQuery = { __typename?: 'Query', Society?: Array<{ __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, imageUrl?: string | null, userIds?: Array<string | null> | null, createdAt?: string | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null } | null> | null };

export type GetSocietyByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetSocietyByIdQuery = { __typename?: 'Query', FindSocietyById?: { __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, imageUrl?: string | null, description?: string | null, userIds?: Array<string | null> | null, createdAt?: string | null, totalEventLikes?: number | null, eventIds?: Array<string | null> | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null, imageUrl?: string | null } | null, eventImageUrls?: Array<{ __typename?: 'EventImage', eventId?: string | null, eventImageUrl?: string | null } | null> | null } | null };

export type EditUnionMutationVariables = Exact<{
  unionId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  shortName?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
}>;


export type EditUnionMutation = { __typename?: 'Mutation', editUnion?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null, imageUrl?: string | null } | null };

export type CreateFaqMutationVariables = Exact<{
  unionId: Scalars['String'];
  question: Scalars['String'];
  answer: Scalars['String'];
}>;


export type CreateFaqMutation = { __typename?: 'Mutation', createFAQ?: { __typename?: 'FAQ', question?: string | null, answer?: string | null } | null };

export type EditFaqMutationVariables = Exact<{
  faqId: Scalars['String'];
  question?: InputMaybe<Scalars['String']>;
  answer?: InputMaybe<Scalars['String']>;
}>;


export type EditFaqMutation = { __typename?: 'Mutation', editFAQ?: { __typename?: 'FAQ', id?: string | null, answer?: string | null, question?: string | null } | null };

export type DeleteFaqMutationVariables = Exact<{
  faqId: Scalars['String'];
}>;


export type DeleteFaqMutation = { __typename?: 'Mutation', deleteFAQ?: { __typename?: 'FAQ', question?: string | null, answer?: string | null, id?: string | null } | null };

export type RequestUnionFromUserMutationVariables = Exact<{
  userId: Scalars['String'];
  unionId: Scalars['String'];
}>;


export type RequestUnionFromUserMutation = { __typename?: 'Mutation', requestUnionFromUser?: { __typename?: 'User', id?: string | null } | null };

export type RequestUnionFromSocietyMutationVariables = Exact<{
  societyId: Scalars['String'];
  unionId: Scalars['String'];
}>;


export type RequestUnionFromSocietyMutation = { __typename?: 'Mutation', requestUnionFromSociety?: { __typename?: 'Society', id?: string | null } | null };

export type RemoveSocietyFromUnionMutationVariables = Exact<{
  societyId: Scalars['String'];
  unionId: Scalars['String'];
}>;


export type RemoveSocietyFromUnionMutation = { __typename?: 'Mutation', removeSocietyFromUnion?: { __typename?: 'Union', id?: string | null } | null };

export type ProcessSocietyRequestMutationVariables = Exact<{
  societyId: Scalars['String'];
  unionId: Scalars['String'];
  accept: Scalars['Boolean'];
}>;


export type ProcessSocietyRequestMutation = { __typename?: 'Mutation', processSocietyRequest?: { __typename?: 'Union', id?: string | null } | null };

export type GetAllUnionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUnionsQuery = { __typename?: 'Query', Union?: Array<{ __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null, createdAt?: string | null, imageUrl?: string | null, userIds?: Array<string | null> | null, societyIds?: Array<string | null> | null, societyRequestIds?: Array<string | null> | null, uni?: { __typename?: 'Uni', name?: string | null } | null, faqs?: Array<{ __typename?: 'FAQ', id?: string | null, question?: string | null, answer?: string | null } | null> | null, societies?: Array<{ __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, imageUrl?: string | null, createdAt?: string | null } | null> | null } | null> | null };

export type LoginCredentialsUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginCredentialsUserMutation = { __typename?: 'Mutation', loginCredentialsUser?: { __typename?: 'AuthenticatedUserResponse', jwt?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'AuthenticatedUserResponse', jwt?: string | null } | null };

export type CreatePasswordlessUserMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
}>;


export type CreatePasswordlessUserMutation = { __typename?: 'Mutation', createPasswordlessUser?: { __typename?: 'AuthenticatedUserResponse', jwt?: string | null } | null };

export type SetUserCurrentGroupMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
}>;


export type SetUserCurrentGroupMutation = { __typename?: 'Mutation', setUserCurrentGroup?: { __typename?: 'State', id?: string | null, currentGroup?: string | null } | null };

export type UpdateUserNameMutationVariables = Exact<{
  userId: Scalars['String'];
  name: Scalars['String'];
}>;


export type UpdateUserNameMutation = { __typename?: 'Mutation', updateUserName?: { __typename?: 'User', id?: string | null } | null };

export type DeleteEventMutationVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent?: { __typename?: 'Event', id?: string | null, name?: string | null } | null };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', User?: Array<{ __typename?: 'User', id?: string | null, email?: string | null, name?: string | null } | null> | null };

export type GetUserByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetUserByIdQuery = { __typename?: 'Query', FindUserById?: { __typename?: 'User', name?: string | null, state?: { __typename?: 'State', currentGroup?: string | null } | null, societies?: Array<{ __typename?: 'Society', id?: string | null, name?: string | null, shortName?: string | null, union?: { __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null } | null, users?: Array<{ __typename?: 'User', name?: string | null } | null> | null, userRequests?: Array<{ __typename?: 'User', name?: string | null } | null> | null } | null> | null, unions?: Array<{ __typename?: 'Union', id?: string | null, name?: string | null, shortName?: string | null, users?: Array<{ __typename?: 'User', name?: string | null } | null> | null, userRequests?: Array<{ __typename?: 'User', name?: string | null } | null> | null } | null> | null } | null };

export type GetUserByEmailQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', FindUserByEmail?: { __typename?: 'User', id?: string | null } | null };


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
export const LikeEventDocument = gql`
    mutation LikeEvent($eventId: String!) {
  likeEvent(id: $eventId) {
    id
    likes
    name
  }
}
    `;

export function useLikeEventMutation() {
  return Urql.useMutation<LikeEventMutation, LikeEventMutationVariables>(LikeEventDocument);
};
export const AddEventImageUrlsDocument = gql`
    mutation AddEventImageUrls($eventId: String!, $imageUrls: [String!]!) {
  addEventImageUrls(id: $eventId, imageUrls: $imageUrls) {
    id
  }
}
    `;

export function useAddEventImageUrlsMutation() {
  return Urql.useMutation<AddEventImageUrlsMutation, AddEventImageUrlsMutationVariables>(AddEventImageUrlsDocument);
};
export const DeleteEventImageUrlDocument = gql`
    mutation DeleteEventImageUrl($eventId: String!, $imageUrl: String!) {
  deleteEventImageUrl(id: $eventId, imageUrl: $imageUrl)
}
    `;

export function useDeleteEventImageUrlMutation() {
  return Urql.useMutation<DeleteEventImageUrlMutation, DeleteEventImageUrlMutationVariables>(DeleteEventImageUrlDocument);
};
export const GetAllEventsDocument = gql`
    query GetAllEvents($unionId: String, $societyId: String, $tags: [EventType]) {
  Event(unionId: $unionId, societyId: $societyId, tags: $tags) {
    id
    name
    tags
    bannerUrl
    likes
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
export const FindUnverifiedEventsDocument = gql`
    query FindUnverifiedEvents {
  FindUnverifiedEvents {
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

export function useFindUnverifiedEventsQuery(options?: Omit<Urql.UseQueryArgs<FindUnverifiedEventsQueryVariables>, 'query'>) {
  return Urql.useQuery<FindUnverifiedEventsQuery, FindUnverifiedEventsQueryVariables>({ query: FindUnverifiedEventsDocument, ...options });
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
    likes
    registerLink
    eventImageUrls
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
export const LeaveGroupDocument = gql`
    mutation LeaveGroup($userId: String!, $groupId: String!) {
  leaveGroup(userId: $userId, groupId: $groupId) {
    ... on Society {
      name
      users {
        id
        name
        email
      }
    }
    ... on Union {
      name
      users {
        id
        name
        email
      }
    }
  }
}
    `;

export function useLeaveGroupMutation() {
  return Urql.useMutation<LeaveGroupMutation, LeaveGroupMutationVariables>(LeaveGroupDocument);
};
export const ProcessUserRequestDocument = gql`
    mutation ProcessUserRequest($userId: String!, $groupId: String!, $accept: Boolean!) {
  processUserRequest(userId: $userId, groupId: $groupId, accept: $accept) {
    ... on Society {
      id
    }
    ... on Union {
      id
    }
  }
}
    `;

export function useProcessUserRequestMutation() {
  return Urql.useMutation<ProcessUserRequestMutation, ProcessUserRequestMutationVariables>(ProcessUserRequestDocument);
};
export const RemoveUserFromGroupDocument = gql`
    mutation RemoveUserFromGroup($userId: String!, $groupId: String!) {
  removeUserFromGroup(userId: $userId, groupId: $groupId) {
    ... on Society {
      id
    }
    ... on Union {
      id
    }
  }
}
    `;

export function useRemoveUserFromGroupMutation() {
  return Urql.useMutation<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>(RemoveUserFromGroupDocument);
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
    `;

export function useGroupQuery(options?: Omit<Urql.UseQueryArgs<GroupQueryVariables>, 'query'>) {
  return Urql.useQuery<GroupQuery, GroupQueryVariables>({ query: GroupDocument, ...options });
};
export const EditSocietyDocument = gql`
    mutation EditSociety($societyId: String!, $name: String, $shortName: String, $description: String, $imageUrl: String) {
  editSociety(
    id: $societyId
    name: $name
    shortName: $shortName
    description: $description
    imageUrl: $imageUrl
  ) {
    id
    name
    shortName
    description
    imageUrl
  }
}
    `;

export function useEditSocietyMutation() {
  return Urql.useMutation<EditSocietyMutation, EditSocietyMutationVariables>(EditSocietyDocument);
};
export const CreateSocietyDocument = gql`
    mutation CreateSociety($name: String!, $shortName: String!, $description: String!, $imageUrl: String!, $userId: String!) {
  createSociety(
    name: $name
    shortName: $shortName
    description: $description
    imageUrl: $imageUrl
    userId: $userId
  ) {
    id
  }
}
    `;

export function useCreateSocietyMutation() {
  return Urql.useMutation<CreateSocietyMutation, CreateSocietyMutationVariables>(CreateSocietyDocument);
};
export const DeleteSocietyDocument = gql`
    mutation DeleteSociety($societyId: String!) {
  deleteSociety(id: $societyId) {
    id
    name
  }
}
    `;

export function useDeleteSocietyMutation() {
  return Urql.useMutation<DeleteSocietyMutation, DeleteSocietyMutationVariables>(DeleteSocietyDocument);
};
export const LeaveSocietyDocument = gql`
    mutation LeaveSociety($userId: String!, $societyId: String!) {
  leaveSociety(userId: $userId, societyId: $societyId) {
    name
    users {
      id
      name
      email
    }
  }
}
    `;

export function useLeaveSocietyMutation() {
  return Urql.useMutation<LeaveSocietyMutation, LeaveSocietyMutationVariables>(LeaveSocietyDocument);
};
export const RequestSocietyFromUserDocument = gql`
    mutation RequestSocietyFromUser($userId: String!, $societyId: String!) {
  requestSocietyFromUser(userId: $userId, societyId: $societyId) {
    id
  }
}
    `;

export function useRequestSocietyFromUserMutation() {
  return Urql.useMutation<RequestSocietyFromUserMutation, RequestSocietyFromUserMutationVariables>(RequestSocietyFromUserDocument);
};
export const GetAllSocietiesDocument = gql`
    query GetAllSocieties($verified: Boolean) {
  Society(verified: $verified) {
    id
    name
    shortName
    imageUrl
    union {
      id
      name
      shortName
    }
    userIds
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
    imageUrl
    description
    union {
      id
      name
      shortName
      imageUrl
    }
    userIds
    createdAt
    totalEventLikes
    eventIds
    eventImageUrls {
      eventId
      eventImageUrl
    }
  }
}
    `;

export function useGetSocietyByIdQuery(options?: Omit<Urql.UseQueryArgs<GetSocietyByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSocietyByIdQuery, GetSocietyByIdQueryVariables>({ query: GetSocietyByIdDocument, ...options });
};
export const EditUnionDocument = gql`
    mutation EditUnion($unionId: String!, $name: String, $shortName: String, $imageUrl: String) {
  editUnion(id: $unionId, name: $name, shortName: $shortName, imageUrl: $imageUrl) {
    id
    name
    shortName
    imageUrl
  }
}
    `;

export function useEditUnionMutation() {
  return Urql.useMutation<EditUnionMutation, EditUnionMutationVariables>(EditUnionDocument);
};
export const CreateFaqDocument = gql`
    mutation CreateFaq($unionId: String!, $question: String!, $answer: String!) {
  createFAQ(unionId: $unionId, question: $question, answer: $answer) {
    question
    answer
  }
}
    `;

export function useCreateFaqMutation() {
  return Urql.useMutation<CreateFaqMutation, CreateFaqMutationVariables>(CreateFaqDocument);
};
export const EditFaqDocument = gql`
    mutation EditFAQ($faqId: String!, $question: String, $answer: String) {
  editFAQ(id: $faqId, question: $question, answer: $answer) {
    id
    answer
    question
  }
}
    `;

export function useEditFaqMutation() {
  return Urql.useMutation<EditFaqMutation, EditFaqMutationVariables>(EditFaqDocument);
};
export const DeleteFaqDocument = gql`
    mutation DeleteFAQ($faqId: String!) {
  deleteFAQ(id: $faqId) {
    question
    answer
    id
  }
}
    `;

export function useDeleteFaqMutation() {
  return Urql.useMutation<DeleteFaqMutation, DeleteFaqMutationVariables>(DeleteFaqDocument);
};
export const RequestUnionFromUserDocument = gql`
    mutation RequestUnionFromUser($userId: String!, $unionId: String!) {
  requestUnionFromUser(userId: $userId, unionId: $unionId) {
    id
  }
}
    `;

export function useRequestUnionFromUserMutation() {
  return Urql.useMutation<RequestUnionFromUserMutation, RequestUnionFromUserMutationVariables>(RequestUnionFromUserDocument);
};
export const RequestUnionFromSocietyDocument = gql`
    mutation RequestUnionFromSociety($societyId: String!, $unionId: String!) {
  requestUnionFromSociety(societyId: $societyId, unionId: $unionId) {
    id
  }
}
    `;

export function useRequestUnionFromSocietyMutation() {
  return Urql.useMutation<RequestUnionFromSocietyMutation, RequestUnionFromSocietyMutationVariables>(RequestUnionFromSocietyDocument);
};
export const RemoveSocietyFromUnionDocument = gql`
    mutation RemoveSocietyFromUnion($societyId: String!, $unionId: String!) {
  removeSocietyFromUnion(societyId: $societyId, unionId: $unionId) {
    id
  }
}
    `;

export function useRemoveSocietyFromUnionMutation() {
  return Urql.useMutation<RemoveSocietyFromUnionMutation, RemoveSocietyFromUnionMutationVariables>(RemoveSocietyFromUnionDocument);
};
export const ProcessSocietyRequestDocument = gql`
    mutation ProcessSocietyRequest($societyId: String!, $unionId: String!, $accept: Boolean!) {
  processSocietyRequest(societyId: $societyId, unionId: $unionId, accept: $accept) {
    id
  }
}
    `;

export function useProcessSocietyRequestMutation() {
  return Urql.useMutation<ProcessSocietyRequestMutation, ProcessSocietyRequestMutationVariables>(ProcessSocietyRequestDocument);
};
export const GetAllUnionsDocument = gql`
    query GetAllUnions {
  Union {
    id
    name
    shortName
    createdAt
    imageUrl
    uni {
      name
    }
    faqs {
      id
      question
      answer
    }
    societies {
      id
      name
      shortName
      imageUrl
      createdAt
    }
    userIds
    societyIds
    societyRequestIds
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
    mutation CreateUser($email: String!, $password: String!, $name: String!) {
  createUser(email: $email, password: $password, name: $name) {
    jwt
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const CreatePasswordlessUserDocument = gql`
    mutation CreatePasswordlessUser($email: String, $name: String) {
  createPasswordlessUser(email: $email, name: $name) {
    jwt
  }
}
    `;

export function useCreatePasswordlessUserMutation() {
  return Urql.useMutation<CreatePasswordlessUserMutation, CreatePasswordlessUserMutationVariables>(CreatePasswordlessUserDocument);
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
export const UpdateUserNameDocument = gql`
    mutation UpdateUserName($userId: String!, $name: String!) {
  updateUserName(id: $userId, name: $name) {
    id
  }
}
    `;

export function useUpdateUserNameMutation() {
  return Urql.useMutation<UpdateUserNameMutation, UpdateUserNameMutationVariables>(UpdateUserNameDocument);
};
export const DeleteEventDocument = gql`
    mutation DeleteEvent($eventId: String!) {
  deleteEvent(id: $eventId) {
    id
    name
  }
}
    `;

export function useDeleteEventMutation() {
  return Urql.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument);
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
    `;

export function useGetUserByIdQuery(options?: Omit<Urql.UseQueryArgs<GetUserByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>({ query: GetUserByIdDocument, ...options });
};
export const GetUserByEmailDocument = gql`
    query GetUserByEmail($email: String) {
  FindUserByEmail(email: $email) {
    id
  }
}
    `;

export function useGetUserByEmailQuery(options?: Omit<Urql.UseQueryArgs<GetUserByEmailQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>({ query: GetUserByEmailDocument, ...options });
};