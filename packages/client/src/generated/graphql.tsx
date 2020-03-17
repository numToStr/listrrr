import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ObjectId: any;
};

export type AuthInfo = {
  token: Scalars['String'];
  role: AuthRoles;
};

export type AuthResponse = {
  user: User;
  auth: AuthInfo;
};

export enum AuthRoles {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export type ClosedInput = {
  closed: Scalars['Boolean'];
};

export type Column = {
  _id: Scalars['ID'];
  title: Scalars['String'];
  issues: Array<Maybe<Issue>>;
};

export type CreateIssueInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  projectIDs: Array<Maybe<Scalars['ObjectId']>>;
};

export type CreateProjectInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  templateID: Scalars['ObjectId'];
};


export enum EntityType {
  ISSUE = 'ISSUE',
  PROJECT = 'PROJECT'
}

export type EntityUnion = Issue | Project;

export type Filters = {
  sort?: Maybe<Sort>;
  status?: Maybe<Status>;
};

export type FindEntityInput = {
  _id: Scalars['ObjectId'];
  type: EntityType;
};

export type FindInput = {
  _id: Scalars['ObjectId'];
};

export type Issue = {
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  closed: Scalars['Boolean'];
  createdBy: User;
  projects: Array<Maybe<Project>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type IssueConnection = {
  edges: Array<IssueEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
  closedCount: Scalars['Float'];
  openCount: Scalars['Float'];
};

export type IssueEdge = {
  cursor: Scalars['String'];
  node: Issue;
};

export type Label = {
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  color: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  login: AuthResponse;
  signup: AuthResponse;
  rearrangeIssue: Scalars['Boolean'];
  createIssue: Issue;
  updateIssueProjects: Scalars['Boolean'];
  deleteIssue?: Maybe<Issue>;
  createProject: Project;
  rearrangeColumn: Scalars['Boolean'];
  closeOrOpen?: Maybe<Scalars['Boolean']>;
  updateTitleAndDescription?: Maybe<EntityUnion>;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationRearrangeIssueArgs = {
  data: RearrangeIssueInput;
  where: RearrangeIssueFindInput;
};


export type MutationCreateIssueArgs = {
  data: CreateIssueInput;
};


export type MutationUpdateIssueProjectsArgs = {
  data: UpdateIssueProjectInput;
  where: FindInput;
};


export type MutationDeleteIssueArgs = {
  where: FindInput;
};


export type MutationCreateProjectArgs = {
  data: CreateProjectInput;
};


export type MutationRearrangeColumnArgs = {
  data: RearrangeColumnInput;
  where: RearrangeColumnFindInput;
};


export type MutationCloseOrOpenArgs = {
  data: ClosedInput;
  where: FindEntityInput;
};


export type MutationUpdateTitleAndDescriptionArgs = {
  data: TitleAndDescriptionInput;
  where: FindEntityInput;
};


export type PageInfo = {
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
};

export type Project = {
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  closed: Scalars['Boolean'];
  createdBy: User;
  columns: Array<Column>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ProjectConnection = {
  edges: Array<ProjectEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
  closedCount: Scalars['Float'];
  openCount: Scalars['Float'];
};

export type ProjectEdge = {
  cursor: Scalars['String'];
  node: Project;
};

export type Query = {
  issueConnection: IssueConnection;
  issues: Array<Maybe<Issue>>;
  issue?: Maybe<Issue>;
  labels: Array<Maybe<Label>>;
  projectConnections: ProjectConnection;
  projects: Array<Maybe<Project>>;
  project?: Maybe<Project>;
  templates: Array<Maybe<Template>>;
  me: User;
};


export type QueryIssueConnectionArgs = {
  filters: Filters;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
};


export type QueryIssuesArgs = {
  filters: Filters;
};


export type QueryIssueArgs = {
  where: FindInput;
};


export type QueryProjectConnectionsArgs = {
  filters: Filters;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
};


export type QueryProjectsArgs = {
  filters: Filters;
};


export type QueryProjectArgs = {
  where: FindInput;
};

export type RearrangeColumnFindInput = {
  columnID: Scalars['ObjectId'];
  projectID: Scalars['ObjectId'];
};

export type RearrangeColumnInput = {
  initialPosition: Scalars['Float'];
  finalPosition: Scalars['Float'];
};

export type RearrangeIssueFindInput = {
  columnID: Scalars['ObjectId'];
  issueID: Scalars['ObjectId'];
};

export type RearrangeIssueInput = {
  initialPosition: Scalars['Float'];
  finalPosition: Scalars['Float'];
  destinationColumnID: Scalars['ObjectId'];
};

export type SignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export enum Sort {
  CREATED_ASC = 'CREATED_ASC',
  CREATED_DESC = 'CREATED_DESC',
  UPDATED_DESC = 'UPDATED_DESC'
}

export enum Status {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export type Template = {
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  columns: Array<Column>;
};

export type TitleAndDescriptionInput = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type UpdateIssueProjectInput = {
  projectIDs: Array<Maybe<Scalars['ObjectId']>>;
};

export type User = {
  _id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type UserFragmentFragment = Pick<User, '_id' | 'username' | 'email'>;

export type AuthFragmentFragment = { user: UserFragmentFragment, auth: Pick<AuthInfo, 'token' | 'role'> };

export type LoginMutationVariables = {
  data: LoginInput;
};


export type LoginMutation = { login: AuthFragmentFragment };

export type SignupMutationVariables = {
  data: SignupInput;
};


export type SignupMutation = { signup: AuthFragmentFragment };

export type MeQueryVariables = {};


export type MeQuery = { me: UserFragmentFragment };

export type IssueFragmentFragment = Pick<Issue, '_id' | 'title' | 'description' | 'closed' | 'createdAt' | 'updatedAt'>;

export type IssuesQueryVariables = {
  filters: Filters;
};


export type IssuesQuery = { issues: Array<Maybe<IssueFragmentFragment>> };

export type IssueQueryVariables = {
  where: FindInput;
};


export type IssueQuery = { issue: Maybe<(
    { projects: Array<Maybe<Pick<Project, '_id' | 'title'>>> }
    & IssueFragmentFragment
  )> };

export type CreateIssueMutationVariables = {
  data: CreateIssueInput;
};


export type CreateIssueMutation = { createIssue: (
    { projects: Array<Maybe<Pick<Project, '_id' | 'title'>>> }
    & IssueFragmentFragment
  ) };

export type ProjectFragmentFragment = Pick<Project, '_id' | 'title' | 'description' | 'closed' | 'createdAt' | 'updatedAt'>;

export type ColumnFragmentFragment = (
  Pick<Column, '_id' | 'title'>
  & { issues: Array<Maybe<Pick<Issue, '_id' | 'title' | 'updatedAt'>>> }
);

export type ProjectsQueryVariables = {
  filters: Filters;
};


export type ProjectsQuery = { projects: Array<Maybe<ProjectFragmentFragment>> };

export type ProjectsFilterQueryVariables = {
  filters: Filters;
};


export type ProjectsFilterQuery = { projects: Array<Maybe<(
    Pick<Project, '_id' | 'title'>
    & { value: Project['_id'] }
  )>> };

export type ProjectQueryVariables = {
  where: FindInput;
};


export type ProjectQuery = { project: Maybe<(
    { columns: Array<ColumnFragmentFragment> }
    & ProjectFragmentFragment
  )> };

export type CreateProjectMutationVariables = {
  data: CreateProjectInput;
};


export type CreateProjectMutation = { createProject: (
    { columns: Array<ColumnFragmentFragment> }
    & ProjectFragmentFragment
  ) };

export type RearrangeColumnMutationVariables = {
  where: RearrangeColumnFindInput;
  data: RearrangeColumnInput;
};


export type RearrangeColumnMutation = Pick<Mutation, 'rearrangeColumn'>;

export type RearrangeIssueMutationVariables = {
  where: RearrangeIssueFindInput;
  data: RearrangeIssueInput;
};


export type RearrangeIssueMutation = Pick<Mutation, 'rearrangeIssue'>;

export type EditDetailsMutationVariables = {
  where: FindEntityInput;
  data: TitleAndDescriptionInput;
};


export type EditDetailsMutation = { updateTitleAndDescription: Maybe<IssueFragmentFragment | ProjectFragmentFragment> };

export type CloseOrOpenMutationVariables = {
  where: FindEntityInput;
  data: ClosedInput;
};


export type CloseOrOpenMutation = Pick<Mutation, 'closeOrOpen'>;

export type TemplatesQueryVariables = {};


export type TemplatesQuery = { templates: Array<Maybe<Pick<Template, '_id' | 'title'>>> };

export type UpdateIssueProjectsMutationVariables = {
  where: FindInput;
  data: UpdateIssueProjectInput;
};


export type UpdateIssueProjectsMutation = Pick<Mutation, 'updateIssueProjects'>;

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  _id
  username
  email
}
    `;
export const AuthFragmentFragmentDoc = gql`
    fragment AuthFragment on AuthResponse {
  user {
    ...UserFragment
  }
  auth {
    token
    role
  }
}
    ${UserFragmentFragmentDoc}`;
export const IssueFragmentFragmentDoc = gql`
    fragment IssueFragment on Issue {
  _id
  title
  description
  closed
  createdAt
  updatedAt
}
    `;
export const ProjectFragmentFragmentDoc = gql`
    fragment ProjectFragment on Project {
  _id
  title
  description
  closed
  createdAt
  updatedAt
}
    `;
export const ColumnFragmentFragmentDoc = gql`
    fragment ColumnFragment on Column {
  _id
  title
  issues {
    _id
    title
    updatedAt
  }
}
    `;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    ...AuthFragment
  }
}
    ${AuthFragmentFragmentDoc}`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($data: SignupInput!) {
  signup(data: $data) {
    ...AuthFragment
  }
}
    ${AuthFragmentFragmentDoc}`;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const IssuesDocument = gql`
    query Issues($filters: Filters!) {
  issues(filters: $filters) {
    ...IssueFragment
  }
}
    ${IssueFragmentFragmentDoc}`;

/**
 * __useIssuesQuery__
 *
 * To run a query within a React component, call `useIssuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssuesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssuesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useIssuesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IssuesQuery, IssuesQueryVariables>) {
        return ApolloReactHooks.useQuery<IssuesQuery, IssuesQueryVariables>(IssuesDocument, baseOptions);
      }
export function useIssuesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IssuesQuery, IssuesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IssuesQuery, IssuesQueryVariables>(IssuesDocument, baseOptions);
        }
export type IssuesQueryHookResult = ReturnType<typeof useIssuesQuery>;
export type IssuesLazyQueryHookResult = ReturnType<typeof useIssuesLazyQuery>;
export type IssuesQueryResult = ApolloReactCommon.QueryResult<IssuesQuery, IssuesQueryVariables>;
export const IssueDocument = gql`
    query Issue($where: FindInput!) {
  issue(where: $where) {
    ...IssueFragment
    projects {
      _id
      title
    }
  }
}
    ${IssueFragmentFragmentDoc}`;

/**
 * __useIssueQuery__
 *
 * To run a query within a React component, call `useIssueQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssueQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssueQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useIssueQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IssueQuery, IssueQueryVariables>) {
        return ApolloReactHooks.useQuery<IssueQuery, IssueQueryVariables>(IssueDocument, baseOptions);
      }
export function useIssueLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IssueQuery, IssueQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IssueQuery, IssueQueryVariables>(IssueDocument, baseOptions);
        }
export type IssueQueryHookResult = ReturnType<typeof useIssueQuery>;
export type IssueLazyQueryHookResult = ReturnType<typeof useIssueLazyQuery>;
export type IssueQueryResult = ApolloReactCommon.QueryResult<IssueQuery, IssueQueryVariables>;
export const CreateIssueDocument = gql`
    mutation CreateIssue($data: CreateIssueInput!) {
  createIssue(data: $data) {
    ...IssueFragment
    projects {
      _id
      title
    }
  }
}
    ${IssueFragmentFragmentDoc}`;
export type CreateIssueMutationFn = ApolloReactCommon.MutationFunction<CreateIssueMutation, CreateIssueMutationVariables>;

/**
 * __useCreateIssueMutation__
 *
 * To run a mutation, you first call `useCreateIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIssueMutation, { data, loading, error }] = useCreateIssueMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateIssueMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateIssueMutation, CreateIssueMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateIssueMutation, CreateIssueMutationVariables>(CreateIssueDocument, baseOptions);
      }
export type CreateIssueMutationHookResult = ReturnType<typeof useCreateIssueMutation>;
export type CreateIssueMutationResult = ApolloReactCommon.MutationResult<CreateIssueMutation>;
export type CreateIssueMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateIssueMutation, CreateIssueMutationVariables>;
export const ProjectsDocument = gql`
    query Projects($filters: Filters!) {
  projects(filters: $filters) {
    ...ProjectFragment
  }
}
    ${ProjectFragmentFragmentDoc}`;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        return ApolloReactHooks.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
      }
export function useProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = ApolloReactCommon.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const ProjectsFilterDocument = gql`
    query ProjectsFilter($filters: Filters!) {
  projects(filters: $filters) {
    _id
    title
    value: _id
  }
}
    `;

/**
 * __useProjectsFilterQuery__
 *
 * To run a query within a React component, call `useProjectsFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsFilterQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useProjectsFilterQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectsFilterQuery, ProjectsFilterQueryVariables>) {
        return ApolloReactHooks.useQuery<ProjectsFilterQuery, ProjectsFilterQueryVariables>(ProjectsFilterDocument, baseOptions);
      }
export function useProjectsFilterLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectsFilterQuery, ProjectsFilterQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProjectsFilterQuery, ProjectsFilterQueryVariables>(ProjectsFilterDocument, baseOptions);
        }
export type ProjectsFilterQueryHookResult = ReturnType<typeof useProjectsFilterQuery>;
export type ProjectsFilterLazyQueryHookResult = ReturnType<typeof useProjectsFilterLazyQuery>;
export type ProjectsFilterQueryResult = ApolloReactCommon.QueryResult<ProjectsFilterQuery, ProjectsFilterQueryVariables>;
export const ProjectDocument = gql`
    query Project($where: FindInput!) {
  project(where: $where) {
    ...ProjectFragment
    columns {
      ...ColumnFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${ColumnFragmentFragmentDoc}`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        return ApolloReactHooks.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
      }
export function useProjectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = ApolloReactCommon.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($data: CreateProjectInput!) {
  createProject(data: $data) {
    ...ProjectFragment
    columns {
      ...ColumnFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${ColumnFragmentFragmentDoc}`;
export type CreateProjectMutationFn = ApolloReactCommon.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, baseOptions);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = ApolloReactCommon.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const RearrangeColumnDocument = gql`
    mutation RearrangeColumn($where: RearrangeColumnFindInput!, $data: RearrangeColumnInput!) {
  rearrangeColumn(where: $where, data: $data)
}
    `;
export type RearrangeColumnMutationFn = ApolloReactCommon.MutationFunction<RearrangeColumnMutation, RearrangeColumnMutationVariables>;

/**
 * __useRearrangeColumnMutation__
 *
 * To run a mutation, you first call `useRearrangeColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRearrangeColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rearrangeColumnMutation, { data, loading, error }] = useRearrangeColumnMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRearrangeColumnMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RearrangeColumnMutation, RearrangeColumnMutationVariables>) {
        return ApolloReactHooks.useMutation<RearrangeColumnMutation, RearrangeColumnMutationVariables>(RearrangeColumnDocument, baseOptions);
      }
export type RearrangeColumnMutationHookResult = ReturnType<typeof useRearrangeColumnMutation>;
export type RearrangeColumnMutationResult = ApolloReactCommon.MutationResult<RearrangeColumnMutation>;
export type RearrangeColumnMutationOptions = ApolloReactCommon.BaseMutationOptions<RearrangeColumnMutation, RearrangeColumnMutationVariables>;
export const RearrangeIssueDocument = gql`
    mutation RearrangeIssue($where: RearrangeIssueFindInput!, $data: RearrangeIssueInput!) {
  rearrangeIssue(where: $where, data: $data)
}
    `;
export type RearrangeIssueMutationFn = ApolloReactCommon.MutationFunction<RearrangeIssueMutation, RearrangeIssueMutationVariables>;

/**
 * __useRearrangeIssueMutation__
 *
 * To run a mutation, you first call `useRearrangeIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRearrangeIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rearrangeIssueMutation, { data, loading, error }] = useRearrangeIssueMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRearrangeIssueMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RearrangeIssueMutation, RearrangeIssueMutationVariables>) {
        return ApolloReactHooks.useMutation<RearrangeIssueMutation, RearrangeIssueMutationVariables>(RearrangeIssueDocument, baseOptions);
      }
export type RearrangeIssueMutationHookResult = ReturnType<typeof useRearrangeIssueMutation>;
export type RearrangeIssueMutationResult = ApolloReactCommon.MutationResult<RearrangeIssueMutation>;
export type RearrangeIssueMutationOptions = ApolloReactCommon.BaseMutationOptions<RearrangeIssueMutation, RearrangeIssueMutationVariables>;
export const EditDetailsDocument = gql`
    mutation EditDetails($where: FindEntityInput!, $data: TitleAndDescriptionInput!) {
  updateTitleAndDescription(where: $where, data: $data) {
    ...ProjectFragment
    ...IssueFragment
  }
}
    ${ProjectFragmentFragmentDoc}
${IssueFragmentFragmentDoc}`;
export type EditDetailsMutationFn = ApolloReactCommon.MutationFunction<EditDetailsMutation, EditDetailsMutationVariables>;

/**
 * __useEditDetailsMutation__
 *
 * To run a mutation, you first call `useEditDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editDetailsMutation, { data, loading, error }] = useEditDetailsMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditDetailsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditDetailsMutation, EditDetailsMutationVariables>) {
        return ApolloReactHooks.useMutation<EditDetailsMutation, EditDetailsMutationVariables>(EditDetailsDocument, baseOptions);
      }
export type EditDetailsMutationHookResult = ReturnType<typeof useEditDetailsMutation>;
export type EditDetailsMutationResult = ApolloReactCommon.MutationResult<EditDetailsMutation>;
export type EditDetailsMutationOptions = ApolloReactCommon.BaseMutationOptions<EditDetailsMutation, EditDetailsMutationVariables>;
export const CloseOrOpenDocument = gql`
    mutation CloseOrOpen($where: FindEntityInput!, $data: ClosedInput!) {
  closeOrOpen(where: $where, data: $data)
}
    `;
export type CloseOrOpenMutationFn = ApolloReactCommon.MutationFunction<CloseOrOpenMutation, CloseOrOpenMutationVariables>;

/**
 * __useCloseOrOpenMutation__
 *
 * To run a mutation, you first call `useCloseOrOpenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseOrOpenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeOrOpenMutation, { data, loading, error }] = useCloseOrOpenMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCloseOrOpenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CloseOrOpenMutation, CloseOrOpenMutationVariables>) {
        return ApolloReactHooks.useMutation<CloseOrOpenMutation, CloseOrOpenMutationVariables>(CloseOrOpenDocument, baseOptions);
      }
export type CloseOrOpenMutationHookResult = ReturnType<typeof useCloseOrOpenMutation>;
export type CloseOrOpenMutationResult = ApolloReactCommon.MutationResult<CloseOrOpenMutation>;
export type CloseOrOpenMutationOptions = ApolloReactCommon.BaseMutationOptions<CloseOrOpenMutation, CloseOrOpenMutationVariables>;
export const TemplatesDocument = gql`
    query Templates {
  templates {
    _id
    title
  }
}
    `;

/**
 * __useTemplatesQuery__
 *
 * To run a query within a React component, call `useTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTemplatesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TemplatesQuery, TemplatesQueryVariables>) {
        return ApolloReactHooks.useQuery<TemplatesQuery, TemplatesQueryVariables>(TemplatesDocument, baseOptions);
      }
export function useTemplatesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TemplatesQuery, TemplatesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TemplatesQuery, TemplatesQueryVariables>(TemplatesDocument, baseOptions);
        }
export type TemplatesQueryHookResult = ReturnType<typeof useTemplatesQuery>;
export type TemplatesLazyQueryHookResult = ReturnType<typeof useTemplatesLazyQuery>;
export type TemplatesQueryResult = ApolloReactCommon.QueryResult<TemplatesQuery, TemplatesQueryVariables>;
export const UpdateIssueProjectsDocument = gql`
    mutation UpdateIssueProjects($where: FindInput!, $data: UpdateIssueProjectInput!) {
  updateIssueProjects(where: $where, data: $data)
}
    `;
export type UpdateIssueProjectsMutationFn = ApolloReactCommon.MutationFunction<UpdateIssueProjectsMutation, UpdateIssueProjectsMutationVariables>;

/**
 * __useUpdateIssueProjectsMutation__
 *
 * To run a mutation, you first call `useUpdateIssueProjectsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIssueProjectsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIssueProjectsMutation, { data, loading, error }] = useUpdateIssueProjectsMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateIssueProjectsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateIssueProjectsMutation, UpdateIssueProjectsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateIssueProjectsMutation, UpdateIssueProjectsMutationVariables>(UpdateIssueProjectsDocument, baseOptions);
      }
export type UpdateIssueProjectsMutationHookResult = ReturnType<typeof useUpdateIssueProjectsMutation>;
export type UpdateIssueProjectsMutationResult = ApolloReactCommon.MutationResult<UpdateIssueProjectsMutation>;
export type UpdateIssueProjectsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateIssueProjectsMutation, UpdateIssueProjectsMutationVariables>;