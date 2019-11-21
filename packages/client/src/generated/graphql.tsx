export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
  /** Mongo object id scalar type */
  ObjectId: any,
};

export type AuthInfo = {
   __typename?: 'AuthInfo',
  token: Scalars['String'],
  role: AuthRoles,
};

export type AuthResponse = {
   __typename?: 'AuthResponse',
  user: User,
  auth: AuthInfo,
};

/** Roles for the authenticated users */
export enum AuthRoles {
  User = 'USER',
  Admin = 'ADMIN'
}

export type ClosedInput = {
  closed: Scalars['Boolean'],
};

export type Column = {
   __typename?: 'Column',
  _id: Scalars['ID'],
  title: Scalars['String'],
  issues: Array<Maybe<Issue>>,
};

export type CreateIssueInput = {
  title: Scalars['String'],
  description: Scalars['String'],
  /** Project IDs for the issue which it belongs */
  projectIDs: Array<Maybe<Scalars['ObjectId']>>,
};

export type CreateProjectInput = {
  title: Scalars['String'],
  description: Scalars['String'],
  /** Template ID for the project */
  templateID: Scalars['ObjectId'],
};


/** Roles for the authenticated users */
export enum EntityType {
  Issue = 'ISSUE',
  Project = 'PROJECT'
}

export type EntityUnion = Issue | Project;

export type Filters = {
  sort?: Maybe<Sort>,
  status?: Maybe<Status>,
};

export type FindEntityInput = {
  _id: Scalars['ObjectId'],
  type: EntityType,
};

export type FindInput = {
  _id: Scalars['ObjectId'],
};

export type Issue = {
   __typename?: 'Issue',
  _id: Scalars['ID'],
  title: Scalars['String'],
  description: Scalars['String'],
  closed: Scalars['Boolean'],
  createdBy: User,
  projects: Array<Maybe<Project>>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type LoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  /** For logging in user */
  login: AuthResponse,
  /** For signing up new users */
  signup: AuthResponse,
  rearrangeIssue: Scalars['Boolean'],
  createIssue: Issue,
  updateIssueProjects?: Maybe<Issue>,
  deleteIssue?: Maybe<Issue>,
  createProject: Project,
  rearrangeColumn: Scalars['Boolean'],
  /** For closing/reopening a particular issue/project */
  closeOrOpen?: Maybe<EntityUnion>,
  /** For updating title and description of a particular issue/project */
  updateTitleAndDescription?: Maybe<EntityUnion>,
};


export type MutationLoginArgs = {
  data: LoginInput
};


export type MutationSignupArgs = {
  data: SignupInput
};


export type MutationRearrangeIssueArgs = {
  data: RearrangeIssueInput,
  where: RearrangeIssueFindInput
};


export type MutationCreateIssueArgs = {
  data: CreateIssueInput
};


export type MutationUpdateIssueProjectsArgs = {
  data: UpdateIssueProjectInput,
  where: FindInput
};


export type MutationDeleteIssueArgs = {
  where: FindInput
};


export type MutationCreateProjectArgs = {
  data: CreateProjectInput
};


export type MutationRearrangeColumnArgs = {
  data: RearrangeColumnInput,
  where: RearrangeColumnFindInput
};


export type MutationCloseOrOpenArgs = {
  data: ClosedInput,
  where: FindEntityInput
};


export type MutationUpdateTitleAndDescriptionArgs = {
  data: TitleAndDescriptionInput,
  where: FindEntityInput
};


export type Project = {
   __typename?: 'Project',
  _id: Scalars['ID'],
  title: Scalars['String'],
  description: Scalars['String'],
  closed: Scalars['Boolean'],
  createdBy: User,
  columns: Array<Column>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Query = {
   __typename?: 'Query',
  issues: Array<Maybe<Issue>>,
  issue?: Maybe<Issue>,
  projects: Array<Maybe<Project>>,
  project?: Maybe<Project>,
  templates: Array<Maybe<Template>>,
  me: User,
};


export type QueryIssuesArgs = {
  filters: Filters
};


export type QueryIssueArgs = {
  where: FindInput
};


export type QueryProjectsArgs = {
  filters: Filters
};


export type QueryProjectArgs = {
  where: FindInput
};

export type RearrangeColumnFindInput = {
  columnID: Scalars['ObjectId'],
  projectID: Scalars['ObjectId'],
};

export type RearrangeColumnInput = {
  initialPosition: Scalars['Float'],
  finalPosition: Scalars['Float'],
};

export type RearrangeIssueFindInput = {
  columnID: Scalars['ObjectId'],
  issueID: Scalars['ObjectId'],
};

export type RearrangeIssueInput = {
  initialPosition: Scalars['Float'],
  finalPosition: Scalars['Float'],
  destinationColumnID: Scalars['ObjectId'],
};

export type SignupInput = {
  email: Scalars['String'],
  password: Scalars['String'],
  username: Scalars['String'],
};

/** For specifying sorting options */
export enum Sort {
  CreatedAsc = 'CREATED_ASC',
  CreatedDesc = 'CREATED_DESC',
  UpdatedDesc = 'UPDATED_DESC'
}

/** For specifying a enitity status */
export enum Status {
  Open = 'OPEN',
  Closed = 'CLOSED'
}

export type Template = {
   __typename?: 'Template',
  _id: Scalars['ID'],
  title: Scalars['String'],
  description: Scalars['String'],
  columns: Array<Column>,
};

export type TitleAndDescriptionInput = {
  title: Scalars['String'],
  description: Scalars['String'],
};

export type UpdateIssueProjectInput = {
  projectIDs: Array<Maybe<Scalars['ObjectId']>>,
};

export type User = {
   __typename?: 'User',
  _id: Scalars['ID'],
  username: Scalars['String'],
  email: Scalars['String'],
  role: AuthRoles,
};

