/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AddPopularReadError = {
  __typename?: 'AddPopularReadError';
  errorCodes: Array<AddPopularReadErrorCode>;
};

export enum AddPopularReadErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type AddPopularReadResult = AddPopularReadError | AddPopularReadSuccess;

export type AddPopularReadSuccess = {
  __typename?: 'AddPopularReadSuccess';
  pageId: Scalars['String']['output'];
};

export type ApiKey = {
  __typename?: 'ApiKey';
  createdAt: Scalars['Date']['output'];
  expiresAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  key?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  scopes?: Maybe<Array<Scalars['String']['output']>>;
  usedAt?: Maybe<Scalars['Date']['output']>;
};

export type ApiKeysError = {
  __typename?: 'ApiKeysError';
  errorCodes: Array<ApiKeysErrorCode>;
};

export enum ApiKeysErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type ApiKeysResult = ApiKeysError | ApiKeysSuccess;

export type ApiKeysSuccess = {
  __typename?: 'ApiKeysSuccess';
  apiKeys: Array<ApiKey>;
};

export type ArchiveLinkError = {
  __typename?: 'ArchiveLinkError';
  errorCodes: Array<ArchiveLinkErrorCode>;
  message: Scalars['String']['output'];
};

export enum ArchiveLinkErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type ArchiveLinkInput = {
  archived: Scalars['Boolean']['input'];
  linkId: Scalars['ID']['input'];
};

export type ArchiveLinkResult = ArchiveLinkError | ArchiveLinkSuccess;

export type ArchiveLinkSuccess = {
  __typename?: 'ArchiveLinkSuccess';
  linkId: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Article = {
  __typename?: 'Article';
  author?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  contentReader: ContentReader;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  hasContent?: Maybe<Scalars['Boolean']['output']>;
  hash: Scalars['String']['output'];
  highlights: Array<Highlight>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isArchived: Scalars['Boolean']['output'];
  labels?: Maybe<Array<Label>>;
  language?: Maybe<Scalars['String']['output']>;
  linkId?: Maybe<Scalars['ID']['output']>;
  originalArticleUrl?: Maybe<Scalars['String']['output']>;
  originalHtml?: Maybe<Scalars['String']['output']>;
  pageType?: Maybe<PageType>;
  postedByViewer?: Maybe<Scalars['Boolean']['output']>;
  publishedAt?: Maybe<Scalars['Date']['output']>;
  readAt?: Maybe<Scalars['Date']['output']>;
  readingProgressAnchorIndex: Scalars['Int']['output'];
  readingProgressPercent: Scalars['Float']['output'];
  readingProgressTopPercent?: Maybe<Scalars['Float']['output']>;
  recommendations?: Maybe<Array<Recommendation>>;
  savedAt: Scalars['Date']['output'];
  savedByViewer?: Maybe<Scalars['Boolean']['output']>;
  shareInfo?: Maybe<LinkShareInfo>;
  sharedComment?: Maybe<Scalars['String']['output']>;
  siteIcon?: Maybe<Scalars['String']['output']>;
  siteName?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  state?: Maybe<ArticleSavingRequestStatus>;
  subscription?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  unsubHttpUrl?: Maybe<Scalars['String']['output']>;
  unsubMailTo?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  uploadFileId?: Maybe<Scalars['ID']['output']>;
  url: Scalars['String']['output'];
  wordsCount?: Maybe<Scalars['Int']['output']>;
};


export type ArticleHighlightsArgs = {
  input?: InputMaybe<ArticleHighlightsInput>;
};

export type ArticleEdge = {
  __typename?: 'ArticleEdge';
  cursor: Scalars['String']['output'];
  node: Article;
};

export type ArticleError = {
  __typename?: 'ArticleError';
  errorCodes: Array<ArticleErrorCode>;
};

export enum ArticleErrorCode {
  BadData = 'BAD_DATA',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type ArticleHighlightsInput = {
  includeFriends?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ArticleResult = ArticleError | ArticleSuccess;

export type ArticleSavingRequest = {
  __typename?: 'ArticleSavingRequest';
  /** @deprecated article has been replaced with slug */
  article?: Maybe<Article>;
  createdAt: Scalars['Date']['output'];
  errorCode?: Maybe<CreateArticleErrorCode>;
  id: Scalars['ID']['output'];
  slug: Scalars['String']['output'];
  status: ArticleSavingRequestStatus;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url: Scalars['String']['output'];
  user: User;
  /** @deprecated userId has been replaced with user */
  userId: Scalars['ID']['output'];
};

export type ArticleSavingRequestError = {
  __typename?: 'ArticleSavingRequestError';
  errorCodes: Array<ArticleSavingRequestErrorCode>;
};

export enum ArticleSavingRequestErrorCode {
  BadData = 'BAD_DATA',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type ArticleSavingRequestResult = ArticleSavingRequestError | ArticleSavingRequestSuccess;

export enum ArticleSavingRequestStatus {
  Archived = 'ARCHIVED',
  Deleted = 'DELETED',
  Failed = 'FAILED',
  Processing = 'PROCESSING',
  Succeeded = 'SUCCEEDED'
}

export type ArticleSavingRequestSuccess = {
  __typename?: 'ArticleSavingRequestSuccess';
  articleSavingRequest: ArticleSavingRequest;
};

export type ArticleSuccess = {
  __typename?: 'ArticleSuccess';
  article: Article;
};

export type ArticlesError = {
  __typename?: 'ArticlesError';
  errorCodes: Array<ArticlesErrorCode>;
};

export enum ArticlesErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type ArticlesResult = ArticlesError | ArticlesSuccess;

export type ArticlesSuccess = {
  __typename?: 'ArticlesSuccess';
  edges: Array<ArticleEdge>;
  pageInfo: PageInfo;
};

export type BulkActionError = {
  __typename?: 'BulkActionError';
  errorCodes: Array<BulkActionErrorCode>;
};

export enum BulkActionErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type BulkActionResult = BulkActionError | BulkActionSuccess;

export type BulkActionSuccess = {
  __typename?: 'BulkActionSuccess';
  success: Scalars['Boolean']['output'];
};

export enum BulkActionType {
  AddLabels = 'ADD_LABELS',
  Archive = 'ARCHIVE',
  Delete = 'DELETE',
  MarkAsRead = 'MARK_AS_READ'
}

export enum ContentReader {
  Epub = 'EPUB',
  Pdf = 'PDF',
  Web = 'WEB'
}

export type CreateArticleError = {
  __typename?: 'CreateArticleError';
  errorCodes: Array<CreateArticleErrorCode>;
};

export enum CreateArticleErrorCode {
  ElasticError = 'ELASTIC_ERROR',
  NotAllowedToParse = 'NOT_ALLOWED_TO_PARSE',
  PayloadTooLarge = 'PAYLOAD_TOO_LARGE',
  UnableToFetch = 'UNABLE_TO_FETCH',
  UnableToParse = 'UNABLE_TO_PARSE',
  Unauthorized = 'UNAUTHORIZED',
  UploadFileMissing = 'UPLOAD_FILE_MISSING'
}

export type CreateArticleInput = {
  articleSavingRequestId?: InputMaybe<Scalars['ID']['input']>;
  labels?: InputMaybe<Array<CreateLabelInput>>;
  preparedDocument?: InputMaybe<PreparedDocumentInput>;
  skipParsing?: InputMaybe<Scalars['Boolean']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<ArticleSavingRequestStatus>;
  uploadFileId?: InputMaybe<Scalars['ID']['input']>;
  url: Scalars['String']['input'];
};

export type CreateArticleResult = CreateArticleError | CreateArticleSuccess;

export type CreateArticleSavingRequestError = {
  __typename?: 'CreateArticleSavingRequestError';
  errorCodes: Array<CreateArticleSavingRequestErrorCode>;
};

export enum CreateArticleSavingRequestErrorCode {
  BadData = 'BAD_DATA',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateArticleSavingRequestInput = {
  url: Scalars['String']['input'];
};

export type CreateArticleSavingRequestResult = CreateArticleSavingRequestError | CreateArticleSavingRequestSuccess;

export type CreateArticleSavingRequestSuccess = {
  __typename?: 'CreateArticleSavingRequestSuccess';
  articleSavingRequest: ArticleSavingRequest;
};

export type CreateArticleSuccess = {
  __typename?: 'CreateArticleSuccess';
  created: Scalars['Boolean']['output'];
  createdArticle: Article;
  user: User;
};

export type CreateGroupError = {
  __typename?: 'CreateGroupError';
  errorCodes: Array<CreateGroupErrorCode>;
};

export enum CreateGroupErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateGroupInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  expiresInDays?: InputMaybe<Scalars['Int']['input']>;
  maxMembers?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  onlyAdminCanPost?: InputMaybe<Scalars['Boolean']['input']>;
  onlyAdminCanSeeMembers?: InputMaybe<Scalars['Boolean']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateGroupResult = CreateGroupError | CreateGroupSuccess;

export type CreateGroupSuccess = {
  __typename?: 'CreateGroupSuccess';
  group: RecommendationGroup;
};

export type CreateHighlightError = {
  __typename?: 'CreateHighlightError';
  errorCodes: Array<CreateHighlightErrorCode>;
};

export enum CreateHighlightErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadData = 'BAD_DATA',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateHighlightInput = {
  annotation?: InputMaybe<Scalars['String']['input']>;
  articleId: Scalars['ID']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  highlightPositionAnchorIndex?: InputMaybe<Scalars['Int']['input']>;
  highlightPositionPercent?: InputMaybe<Scalars['Float']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  patch?: InputMaybe<Scalars['String']['input']>;
  prefix?: InputMaybe<Scalars['String']['input']>;
  quote?: InputMaybe<Scalars['String']['input']>;
  sharedAt?: InputMaybe<Scalars['Date']['input']>;
  shortId: Scalars['String']['input'];
  suffix?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<HighlightType>;
};

export type CreateHighlightReplyError = {
  __typename?: 'CreateHighlightReplyError';
  errorCodes: Array<CreateHighlightReplyErrorCode>;
};

export enum CreateHighlightReplyErrorCode {
  EmptyAnnotation = 'EMPTY_ANNOTATION',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateHighlightReplyInput = {
  highlightId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type CreateHighlightReplyResult = CreateHighlightReplyError | CreateHighlightReplySuccess;

export type CreateHighlightReplySuccess = {
  __typename?: 'CreateHighlightReplySuccess';
  highlightReply: HighlightReply;
};

export type CreateHighlightResult = CreateHighlightError | CreateHighlightSuccess;

export type CreateHighlightSuccess = {
  __typename?: 'CreateHighlightSuccess';
  highlight: Highlight;
};

export type CreateLabelError = {
  __typename?: 'CreateLabelError';
  errorCodes: Array<CreateLabelErrorCode>;
};

export enum CreateLabelErrorCode {
  BadRequest = 'BAD_REQUEST',
  LabelAlreadyExists = 'LABEL_ALREADY_EXISTS',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateLabelInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateLabelResult = CreateLabelError | CreateLabelSuccess;

export type CreateLabelSuccess = {
  __typename?: 'CreateLabelSuccess';
  label: Label;
};

export type CreateNewsletterEmailError = {
  __typename?: 'CreateNewsletterEmailError';
  errorCodes: Array<CreateNewsletterEmailErrorCode>;
};

export enum CreateNewsletterEmailErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateNewsletterEmailResult = CreateNewsletterEmailError | CreateNewsletterEmailSuccess;

export type CreateNewsletterEmailSuccess = {
  __typename?: 'CreateNewsletterEmailSuccess';
  newsletterEmail: NewsletterEmail;
};

export type CreateReactionError = {
  __typename?: 'CreateReactionError';
  errorCodes: Array<CreateReactionErrorCode>;
};

export enum CreateReactionErrorCode {
  BadCode = 'BAD_CODE',
  BadTarget = 'BAD_TARGET',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateReactionInput = {
  code: ReactionType;
  highlightId?: InputMaybe<Scalars['ID']['input']>;
  userArticleId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateReactionResult = CreateReactionError | CreateReactionSuccess;

export type CreateReactionSuccess = {
  __typename?: 'CreateReactionSuccess';
  reaction: Reaction;
};

export type CreateReminderError = {
  __typename?: 'CreateReminderError';
  errorCodes: Array<CreateReminderErrorCode>;
};

export enum CreateReminderErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateReminderInput = {
  archiveUntil: Scalars['Boolean']['input'];
  clientRequestId?: InputMaybe<Scalars['ID']['input']>;
  linkId?: InputMaybe<Scalars['ID']['input']>;
  remindAt: Scalars['Date']['input'];
  sendNotification: Scalars['Boolean']['input'];
};

export type CreateReminderResult = CreateReminderError | CreateReminderSuccess;

export type CreateReminderSuccess = {
  __typename?: 'CreateReminderSuccess';
  reminder: Reminder;
};

export type DeleteAccountError = {
  __typename?: 'DeleteAccountError';
  errorCodes: Array<DeleteAccountErrorCode>;
};

export enum DeleteAccountErrorCode {
  Forbidden = 'FORBIDDEN',
  Unauthorized = 'UNAUTHORIZED',
  UserNotFound = 'USER_NOT_FOUND'
}

export type DeleteAccountResult = DeleteAccountError | DeleteAccountSuccess;

export type DeleteAccountSuccess = {
  __typename?: 'DeleteAccountSuccess';
  userID: Scalars['ID']['output'];
};

export type DeleteFilterError = {
  __typename?: 'DeleteFilterError';
  errorCodes: Array<DeleteFilterErrorCode>;
};

export enum DeleteFilterErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteFilterResult = DeleteFilterError | DeleteFilterSuccess;

export type DeleteFilterSuccess = {
  __typename?: 'DeleteFilterSuccess';
  filter: Filter;
};

export type DeleteHighlightError = {
  __typename?: 'DeleteHighlightError';
  errorCodes: Array<DeleteHighlightErrorCode>;
};

export enum DeleteHighlightErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteHighlightReplyError = {
  __typename?: 'DeleteHighlightReplyError';
  errorCodes: Array<DeleteHighlightReplyErrorCode>;
};

export enum DeleteHighlightReplyErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteHighlightReplyResult = DeleteHighlightReplyError | DeleteHighlightReplySuccess;

export type DeleteHighlightReplySuccess = {
  __typename?: 'DeleteHighlightReplySuccess';
  highlightReply: HighlightReply;
};

export type DeleteHighlightResult = DeleteHighlightError | DeleteHighlightSuccess;

export type DeleteHighlightSuccess = {
  __typename?: 'DeleteHighlightSuccess';
  highlight: Highlight;
};

export type DeleteIntegrationError = {
  __typename?: 'DeleteIntegrationError';
  errorCodes: Array<DeleteIntegrationErrorCode>;
};

export enum DeleteIntegrationErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteIntegrationResult = DeleteIntegrationError | DeleteIntegrationSuccess;

export type DeleteIntegrationSuccess = {
  __typename?: 'DeleteIntegrationSuccess';
  integration: Integration;
};

export type DeleteLabelError = {
  __typename?: 'DeleteLabelError';
  errorCodes: Array<DeleteLabelErrorCode>;
};

export enum DeleteLabelErrorCode {
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteLabelResult = DeleteLabelError | DeleteLabelSuccess;

export type DeleteLabelSuccess = {
  __typename?: 'DeleteLabelSuccess';
  label: Label;
};

export type DeleteNewsletterEmailError = {
  __typename?: 'DeleteNewsletterEmailError';
  errorCodes: Array<DeleteNewsletterEmailErrorCode>;
};

export enum DeleteNewsletterEmailErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteNewsletterEmailResult = DeleteNewsletterEmailError | DeleteNewsletterEmailSuccess;

export type DeleteNewsletterEmailSuccess = {
  __typename?: 'DeleteNewsletterEmailSuccess';
  newsletterEmail: NewsletterEmail;
};

export type DeleteReactionError = {
  __typename?: 'DeleteReactionError';
  errorCodes: Array<DeleteReactionErrorCode>;
};

export enum DeleteReactionErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteReactionResult = DeleteReactionError | DeleteReactionSuccess;

export type DeleteReactionSuccess = {
  __typename?: 'DeleteReactionSuccess';
  reaction: Reaction;
};

export type DeleteReminderError = {
  __typename?: 'DeleteReminderError';
  errorCodes: Array<DeleteReminderErrorCode>;
};

export enum DeleteReminderErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteReminderResult = DeleteReminderError | DeleteReminderSuccess;

export type DeleteReminderSuccess = {
  __typename?: 'DeleteReminderSuccess';
  reminder: Reminder;
};

export type DeleteRuleError = {
  __typename?: 'DeleteRuleError';
  errorCodes: Array<DeleteRuleErrorCode>;
};

export enum DeleteRuleErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteRuleResult = DeleteRuleError | DeleteRuleSuccess;

export type DeleteRuleSuccess = {
  __typename?: 'DeleteRuleSuccess';
  rule: Rule;
};

export type DeleteWebhookError = {
  __typename?: 'DeleteWebhookError';
  errorCodes: Array<DeleteWebhookErrorCode>;
};

export enum DeleteWebhookErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeleteWebhookResult = DeleteWebhookError | DeleteWebhookSuccess;

export type DeleteWebhookSuccess = {
  __typename?: 'DeleteWebhookSuccess';
  webhook: Webhook;
};

export type DeviceToken = {
  __typename?: 'DeviceToken';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
};

export type DeviceTokensError = {
  __typename?: 'DeviceTokensError';
  errorCodes: Array<DeviceTokensErrorCode>;
};

export enum DeviceTokensErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type DeviceTokensResult = DeviceTokensError | DeviceTokensSuccess;

export type DeviceTokensSuccess = {
  __typename?: 'DeviceTokensSuccess';
  deviceTokens: Array<DeviceToken>;
};

export type Feature = {
  __typename?: 'Feature';
  createdAt: Scalars['Date']['output'];
  expiresAt?: Maybe<Scalars['Date']['output']>;
  grantedAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  token: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type FeedArticle = {
  __typename?: 'FeedArticle';
  annotationsCount?: Maybe<Scalars['Int']['output']>;
  article: Article;
  highlight?: Maybe<Highlight>;
  highlightsCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  reactions: Array<Reaction>;
  sharedAt: Scalars['Date']['output'];
  sharedBy: User;
  sharedComment?: Maybe<Scalars['String']['output']>;
  sharedWithHighlights?: Maybe<Scalars['Boolean']['output']>;
};

export type FeedArticleEdge = {
  __typename?: 'FeedArticleEdge';
  cursor: Scalars['String']['output'];
  node: FeedArticle;
};

export type FeedArticlesError = {
  __typename?: 'FeedArticlesError';
  errorCodes: Array<FeedArticlesErrorCode>;
};

export enum FeedArticlesErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type FeedArticlesResult = FeedArticlesError | FeedArticlesSuccess;

export type FeedArticlesSuccess = {
  __typename?: 'FeedArticlesSuccess';
  edges: Array<FeedArticleEdge>;
  pageInfo: PageInfo;
};

export type Filter = {
  __typename?: 'Filter';
  category: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  defaultFilter?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  filter: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  visible?: Maybe<Scalars['Boolean']['output']>;
};

export type FiltersError = {
  __typename?: 'FiltersError';
  errorCodes: Array<FiltersErrorCode>;
};

export enum FiltersErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type FiltersResult = FiltersError | FiltersSuccess;

export type FiltersSuccess = {
  __typename?: 'FiltersSuccess';
  filters: Array<Filter>;
};

export type GenerateApiKeyError = {
  __typename?: 'GenerateApiKeyError';
  errorCodes: Array<GenerateApiKeyErrorCode>;
};

export enum GenerateApiKeyErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type GenerateApiKeyInput = {
  expiresAt: Scalars['Date']['input'];
  name: Scalars['String']['input'];
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GenerateApiKeyResult = GenerateApiKeyError | GenerateApiKeySuccess;

export type GenerateApiKeySuccess = {
  __typename?: 'GenerateApiKeySuccess';
  apiKey: ApiKey;
};

export type GetFollowersError = {
  __typename?: 'GetFollowersError';
  errorCodes: Array<GetFollowersErrorCode>;
};

export enum GetFollowersErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type GetFollowersResult = GetFollowersError | GetFollowersSuccess;

export type GetFollowersSuccess = {
  __typename?: 'GetFollowersSuccess';
  followers: Array<User>;
};

export type GetFollowingError = {
  __typename?: 'GetFollowingError';
  errorCodes: Array<GetFollowingErrorCode>;
};

export enum GetFollowingErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type GetFollowingResult = GetFollowingError | GetFollowingSuccess;

export type GetFollowingSuccess = {
  __typename?: 'GetFollowingSuccess';
  following: Array<User>;
};

export type GetUserPersonalizationError = {
  __typename?: 'GetUserPersonalizationError';
  errorCodes: Array<GetUserPersonalizationErrorCode>;
};

export enum GetUserPersonalizationErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type GetUserPersonalizationResult = GetUserPersonalizationError | GetUserPersonalizationSuccess;

export type GetUserPersonalizationSuccess = {
  __typename?: 'GetUserPersonalizationSuccess';
  userPersonalization?: Maybe<UserPersonalization>;
};

export type GoogleLoginInput = {
  email: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type GoogleSignupError = {
  __typename?: 'GoogleSignupError';
  errorCodes: Array<Maybe<SignupErrorCode>>;
};

export type GoogleSignupInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  pictureUrl: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  sourceUserId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GoogleSignupResult = GoogleSignupError | GoogleSignupSuccess;

export type GoogleSignupSuccess = {
  __typename?: 'GoogleSignupSuccess';
  me: User;
};

export type GroupsError = {
  __typename?: 'GroupsError';
  errorCodes: Array<GroupsErrorCode>;
};

export enum GroupsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type GroupsResult = GroupsError | GroupsSuccess;

export type GroupsSuccess = {
  __typename?: 'GroupsSuccess';
  groups: Array<RecommendationGroup>;
};

export type Highlight = {
  __typename?: 'Highlight';
  annotation?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  createdByMe: Scalars['Boolean']['output'];
  highlightPositionAnchorIndex?: Maybe<Scalars['Int']['output']>;
  highlightPositionPercent?: Maybe<Scalars['Float']['output']>;
  html?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  labels?: Maybe<Array<Label>>;
  patch?: Maybe<Scalars['String']['output']>;
  prefix?: Maybe<Scalars['String']['output']>;
  quote?: Maybe<Scalars['String']['output']>;
  reactions: Array<Reaction>;
  replies: Array<HighlightReply>;
  sharedAt?: Maybe<Scalars['Date']['output']>;
  shortId: Scalars['String']['output'];
  suffix?: Maybe<Scalars['String']['output']>;
  type: HighlightType;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user: User;
};

export type HighlightReply = {
  __typename?: 'HighlightReply';
  createdAt: Scalars['Date']['output'];
  highlight: Highlight;
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user: User;
};

export type HighlightStats = {
  __typename?: 'HighlightStats';
  highlightCount: Scalars['Int']['output'];
};

export enum HighlightType {
  Highlight = 'HIGHLIGHT',
  Note = 'NOTE',
  Redaction = 'REDACTION'
}

export type ImportFromIntegrationError = {
  __typename?: 'ImportFromIntegrationError';
  errorCodes: Array<ImportFromIntegrationErrorCode>;
};

export enum ImportFromIntegrationErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type ImportFromIntegrationResult = ImportFromIntegrationError | ImportFromIntegrationSuccess;

export type ImportFromIntegrationSuccess = {
  __typename?: 'ImportFromIntegrationSuccess';
  success: Scalars['Boolean']['output'];
};

export enum ImportItemState {
  All = 'ALL',
  Archived = 'ARCHIVED',
  Unarchived = 'UNARCHIVED',
  Unread = 'UNREAD'
}

export type Integration = {
  __typename?: 'Integration';
  createdAt: Scalars['Date']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  taskName?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  type: IntegrationType;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export enum IntegrationType {
  Export = 'EXPORT',
  Import = 'IMPORT'
}

export type IntegrationsError = {
  __typename?: 'IntegrationsError';
  errorCodes: Array<IntegrationsErrorCode>;
};

export enum IntegrationsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type IntegrationsResult = IntegrationsError | IntegrationsSuccess;

export type IntegrationsSuccess = {
  __typename?: 'IntegrationsSuccess';
  integrations: Array<Integration>;
};

export type JoinGroupError = {
  __typename?: 'JoinGroupError';
  errorCodes: Array<JoinGroupErrorCode>;
};

export enum JoinGroupErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type JoinGroupResult = JoinGroupError | JoinGroupSuccess;

export type JoinGroupSuccess = {
  __typename?: 'JoinGroupSuccess';
  group: RecommendationGroup;
};

export type Label = {
  __typename?: 'Label';
  color: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  internal?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  position?: Maybe<Scalars['Int']['output']>;
};

export type LabelsError = {
  __typename?: 'LabelsError';
  errorCodes: Array<LabelsErrorCode>;
};

export enum LabelsErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type LabelsResult = LabelsError | LabelsSuccess;

export type LabelsSuccess = {
  __typename?: 'LabelsSuccess';
  labels: Array<Label>;
};

export type LeaveGroupError = {
  __typename?: 'LeaveGroupError';
  errorCodes: Array<LeaveGroupErrorCode>;
};

export enum LeaveGroupErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type LeaveGroupResult = LeaveGroupError | LeaveGroupSuccess;

export type LeaveGroupSuccess = {
  __typename?: 'LeaveGroupSuccess';
  success: Scalars['Boolean']['output'];
};

export type Link = {
  __typename?: 'Link';
  highlightStats: HighlightStats;
  id: Scalars['ID']['output'];
  page: Page;
  postedByViewer: Scalars['Boolean']['output'];
  readState: ReadState;
  savedAt: Scalars['Date']['output'];
  savedBy: User;
  savedByViewer: Scalars['Boolean']['output'];
  shareInfo: LinkShareInfo;
  shareStats: ShareStats;
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url: Scalars['String']['output'];
};

export type LinkShareInfo = {
  __typename?: 'LinkShareInfo';
  description: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type LogOutError = {
  __typename?: 'LogOutError';
  errorCodes: Array<LogOutErrorCode>;
};

export enum LogOutErrorCode {
  LogOutFailed = 'LOG_OUT_FAILED'
}

export type LogOutResult = LogOutError | LogOutSuccess;

export type LogOutSuccess = {
  __typename?: 'LogOutSuccess';
  message?: Maybe<Scalars['String']['output']>;
};

export type LoginError = {
  __typename?: 'LoginError';
  errorCodes: Array<LoginErrorCode>;
};

export enum LoginErrorCode {
  AccessDenied = 'ACCESS_DENIED',
  AuthFailed = 'AUTH_FAILED',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UserNotFound = 'USER_NOT_FOUND',
  WrongSource = 'WRONG_SOURCE'
}

export type LoginResult = LoginError | LoginSuccess;

export type LoginSuccess = {
  __typename?: 'LoginSuccess';
  me: User;
};

export type MarkEmailAsItemError = {
  __typename?: 'MarkEmailAsItemError';
  errorCodes: Array<MarkEmailAsItemErrorCode>;
};

export enum MarkEmailAsItemErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type MarkEmailAsItemResult = MarkEmailAsItemError | MarkEmailAsItemSuccess;

export type MarkEmailAsItemSuccess = {
  __typename?: 'MarkEmailAsItemSuccess';
  success: Scalars['Boolean']['output'];
};

export type MergeHighlightError = {
  __typename?: 'MergeHighlightError';
  errorCodes: Array<MergeHighlightErrorCode>;
};

export enum MergeHighlightErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadData = 'BAD_DATA',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type MergeHighlightInput = {
  annotation?: InputMaybe<Scalars['String']['input']>;
  articleId: Scalars['ID']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  highlightPositionAnchorIndex?: InputMaybe<Scalars['Int']['input']>;
  highlightPositionPercent?: InputMaybe<Scalars['Float']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  overlapHighlightIdList: Array<Scalars['String']['input']>;
  patch: Scalars['String']['input'];
  prefix?: InputMaybe<Scalars['String']['input']>;
  quote: Scalars['String']['input'];
  shortId: Scalars['ID']['input'];
  suffix?: InputMaybe<Scalars['String']['input']>;
};

export type MergeHighlightResult = MergeHighlightError | MergeHighlightSuccess;

export type MergeHighlightSuccess = {
  __typename?: 'MergeHighlightSuccess';
  highlight: Highlight;
  overlapHighlightIdList: Array<Scalars['String']['output']>;
};

export type MoveFilterError = {
  __typename?: 'MoveFilterError';
  errorCodes: Array<MoveFilterErrorCode>;
};

export enum MoveFilterErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type MoveFilterInput = {
  afterFilterId?: InputMaybe<Scalars['ID']['input']>;
  filterId: Scalars['ID']['input'];
};

export type MoveFilterResult = MoveFilterError | MoveFilterSuccess;

export type MoveFilterSuccess = {
  __typename?: 'MoveFilterSuccess';
  filter: Filter;
};

export type MoveLabelError = {
  __typename?: 'MoveLabelError';
  errorCodes: Array<MoveLabelErrorCode>;
};

export enum MoveLabelErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type MoveLabelInput = {
  afterLabelId?: InputMaybe<Scalars['ID']['input']>;
  labelId: Scalars['ID']['input'];
};

export type MoveLabelResult = MoveLabelError | MoveLabelSuccess;

export type MoveLabelSuccess = {
  __typename?: 'MoveLabelSuccess';
  label: Label;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPopularRead: AddPopularReadResult;
  bulkAction: BulkActionResult;
  createArticle: CreateArticleResult;
  createArticleSavingRequest: CreateArticleSavingRequestResult;
  createGroup: CreateGroupResult;
  createHighlight: CreateHighlightResult;
  createLabel: CreateLabelResult;
  createNewsletterEmail: CreateNewsletterEmailResult;
  deleteAccount: DeleteAccountResult;
  deleteFilter: DeleteFilterResult;
  deleteHighlight: DeleteHighlightResult;
  deleteIntegration: DeleteIntegrationResult;
  deleteLabel: DeleteLabelResult;
  deleteNewsletterEmail: DeleteNewsletterEmailResult;
  deleteRule: DeleteRuleResult;
  deleteWebhook: DeleteWebhookResult;
  generateApiKey: GenerateApiKeyResult;
  googleLogin: LoginResult;
  googleSignup: GoogleSignupResult;
  importFromIntegration: ImportFromIntegrationResult;
  joinGroup: JoinGroupResult;
  leaveGroup: LeaveGroupResult;
  logOut: LogOutResult;
  markEmailAsItem: MarkEmailAsItemResult;
  mergeHighlight: MergeHighlightResult;
  moveFilter: MoveFilterResult;
  moveLabel: MoveLabelResult;
  optInFeature: OptInFeatureResult;
  recommend: RecommendResult;
  recommendHighlights: RecommendHighlightsResult;
  reportItem: ReportItemResult;
  revokeApiKey: RevokeApiKeyResult;
  saveArticleReadingProgress: SaveArticleReadingProgressResult;
  saveFile: SaveResult;
  saveFilter: SaveFilterResult;
  savePage: SaveResult;
  saveUrl: SaveResult;
  setBookmarkArticle: SetBookmarkArticleResult;
  setDeviceToken: SetDeviceTokenResult;
  setFavoriteArticle: SetFavoriteArticleResult;
  setIntegration: SetIntegrationResult;
  setLabels: SetLabelsResult;
  setLabelsForHighlight: SetLabelsResult;
  setLinkArchived: ArchiveLinkResult;
  setRule: SetRuleResult;
  setUserPersonalization: SetUserPersonalizationResult;
  setWebhook: SetWebhookResult;
  subscribe: SubscribeResult;
  unsubscribe: UnsubscribeResult;
  updateEmail: UpdateEmailResult;
  updateFilter: UpdateFilterResult;
  updateHighlight: UpdateHighlightResult;
  updateLabel: UpdateLabelResult;
  updatePage: UpdatePageResult;
  updateSubscription: UpdateSubscriptionResult;
  updateUser: UpdateUserResult;
  updateUserProfile: UpdateUserProfileResult;
  uploadFileRequest: UploadFileRequestResult;
  uploadImportFile: UploadImportFileResult;
};


export type MutationAddPopularReadArgs = {
  name: Scalars['String']['input'];
};


export type MutationBulkActionArgs = {
  action: BulkActionType;
  async?: InputMaybe<Scalars['Boolean']['input']>;
  expectedCount?: InputMaybe<Scalars['Int']['input']>;
  labelIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  query: Scalars['String']['input'];
};


export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
};


export type MutationCreateArticleSavingRequestArgs = {
  input: CreateArticleSavingRequestInput;
};


export type MutationCreateGroupArgs = {
  input: CreateGroupInput;
};


export type MutationCreateHighlightArgs = {
  input: CreateHighlightInput;
};


export type MutationCreateLabelArgs = {
  input: CreateLabelInput;
};


export type MutationDeleteAccountArgs = {
  userID: Scalars['ID']['input'];
};


export type MutationDeleteFilterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteHighlightArgs = {
  highlightId: Scalars['ID']['input'];
};


export type MutationDeleteIntegrationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLabelArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNewsletterEmailArgs = {
  newsletterEmailId: Scalars['ID']['input'];
};


export type MutationDeleteRuleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWebhookArgs = {
  id: Scalars['ID']['input'];
};


export type MutationGenerateApiKeyArgs = {
  input: GenerateApiKeyInput;
};


export type MutationGoogleLoginArgs = {
  input: GoogleLoginInput;
};


export type MutationGoogleSignupArgs = {
  input: GoogleSignupInput;
};


export type MutationImportFromIntegrationArgs = {
  integrationId: Scalars['ID']['input'];
};


export type MutationJoinGroupArgs = {
  inviteCode: Scalars['String']['input'];
};


export type MutationLeaveGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type MutationMarkEmailAsItemArgs = {
  recentEmailId: Scalars['ID']['input'];
};


export type MutationMergeHighlightArgs = {
  input: MergeHighlightInput;
};


export type MutationMoveFilterArgs = {
  input: MoveFilterInput;
};


export type MutationMoveLabelArgs = {
  input: MoveLabelInput;
};


export type MutationOptInFeatureArgs = {
  input: OptInFeatureInput;
};


export type MutationRecommendArgs = {
  input: RecommendInput;
};


export type MutationRecommendHighlightsArgs = {
  input: RecommendHighlightsInput;
};


export type MutationReportItemArgs = {
  input: ReportItemInput;
};


export type MutationRevokeApiKeyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSaveArticleReadingProgressArgs = {
  input: SaveArticleReadingProgressInput;
};


export type MutationSaveFileArgs = {
  input: SaveFileInput;
};


export type MutationSaveFilterArgs = {
  input: SaveFilterInput;
};


export type MutationSavePageArgs = {
  input: SavePageInput;
};


export type MutationSaveUrlArgs = {
  input: SaveUrlInput;
};


export type MutationSetBookmarkArticleArgs = {
  input: SetBookmarkArticleInput;
};


export type MutationSetDeviceTokenArgs = {
  input: SetDeviceTokenInput;
};


export type MutationSetFavoriteArticleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSetIntegrationArgs = {
  input: SetIntegrationInput;
};


export type MutationSetLabelsArgs = {
  input: SetLabelsInput;
};


export type MutationSetLabelsForHighlightArgs = {
  input: SetLabelsForHighlightInput;
};


export type MutationSetLinkArchivedArgs = {
  input: ArchiveLinkInput;
};


export type MutationSetRuleArgs = {
  input: SetRuleInput;
};


export type MutationSetUserPersonalizationArgs = {
  input: SetUserPersonalizationInput;
};


export type MutationSetWebhookArgs = {
  input: SetWebhookInput;
};


export type MutationSubscribeArgs = {
  input: SubscribeInput;
};


export type MutationUnsubscribeArgs = {
  name: Scalars['String']['input'];
  subscriptionId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateEmailArgs = {
  input: UpdateEmailInput;
};


export type MutationUpdateFilterArgs = {
  input: UpdateFilterInput;
};


export type MutationUpdateHighlightArgs = {
  input: UpdateHighlightInput;
};


export type MutationUpdateLabelArgs = {
  input: UpdateLabelInput;
};


export type MutationUpdatePageArgs = {
  input: UpdatePageInput;
};


export type MutationUpdateSubscriptionArgs = {
  input: UpdateSubscriptionInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};


export type MutationUploadFileRequestArgs = {
  input: UploadFileRequestInput;
};


export type MutationUploadImportFileArgs = {
  contentType: Scalars['String']['input'];
  type: UploadImportFileType;
};

export type NewsletterEmail = {
  __typename?: 'NewsletterEmail';
  address: Scalars['String']['output'];
  confirmationCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  subscriptionCount: Scalars['Int']['output'];
};

export type NewsletterEmailsError = {
  __typename?: 'NewsletterEmailsError';
  errorCodes: Array<NewsletterEmailsErrorCode>;
};

export enum NewsletterEmailsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type NewsletterEmailsResult = NewsletterEmailsError | NewsletterEmailsSuccess;

export type NewsletterEmailsSuccess = {
  __typename?: 'NewsletterEmailsSuccess';
  newsletterEmails: Array<NewsletterEmail>;
};

export type OptInFeatureError = {
  __typename?: 'OptInFeatureError';
  errorCodes: Array<OptInFeatureErrorCode>;
};

export enum OptInFeatureErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND'
}

export type OptInFeatureInput = {
  name: Scalars['String']['input'];
};

export type OptInFeatureResult = OptInFeatureError | OptInFeatureSuccess;

export type OptInFeatureSuccess = {
  __typename?: 'OptInFeatureSuccess';
  feature: Feature;
};

export type Page = {
  __typename?: 'Page';
  author?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  originalHtml: Scalars['String']['output'];
  originalUrl: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['Date']['output']>;
  readableHtml: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: PageType;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url: Scalars['String']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PageInfoInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  previewImage?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['Date']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum PageType {
  Article = 'ARTICLE',
  Book = 'BOOK',
  File = 'FILE',
  Highlights = 'HIGHLIGHTS',
  Image = 'IMAGE',
  Profile = 'PROFILE',
  Tweet = 'TWEET',
  Unknown = 'UNKNOWN',
  Video = 'VIDEO',
  Website = 'WEBSITE'
}

export type ParseResult = {
  byline?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  dir?: InputMaybe<Scalars['String']['input']>;
  excerpt: Scalars['String']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  length: Scalars['Int']['input'];
  previewImage?: InputMaybe<Scalars['String']['input']>;
  publishedDate?: InputMaybe<Scalars['Date']['input']>;
  siteIcon?: InputMaybe<Scalars['String']['input']>;
  siteName?: InputMaybe<Scalars['String']['input']>;
  textContent: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type PreparedDocumentInput = {
  document: Scalars['String']['input'];
  pageInfo: PageInfoInput;
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  pictureUrl?: Maybe<Scalars['String']['output']>;
  private: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  apiKeys: ApiKeysResult;
  article: ArticleResult;
  articleSavingRequest: ArticleSavingRequestResult;
  deviceTokens: DeviceTokensResult;
  filters: FiltersResult;
  getUserPersonalization: GetUserPersonalizationResult;
  groups: GroupsResult;
  hello?: Maybe<Scalars['String']['output']>;
  integrations: IntegrationsResult;
  labels: LabelsResult;
  me?: Maybe<User>;
  newsletterEmails: NewsletterEmailsResult;
  recentEmails: RecentEmailsResult;
  recentSearches: RecentSearchesResult;
  rules: RulesResult;
  search: SearchResult;
  sendInstallInstructions: SendInstallInstructionsResult;
  subscriptions: SubscriptionsResult;
  typeaheadSearch: TypeaheadSearchResult;
  updatesSince: UpdatesSinceResult;
  user: UserResult;
  users: UsersResult;
  validateUsername: Scalars['Boolean']['output'];
  webhook: WebhookResult;
  webhooks: WebhooksResult;
};


export type QueryArticleArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryArticleSavingRequestArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRulesArgs = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySearchArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  includeContent?: InputMaybe<Scalars['Boolean']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySubscriptionsArgs = {
  sort?: InputMaybe<SortParams>;
  type?: InputMaybe<SubscriptionType>;
};


export type QueryTypeaheadSearchArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QueryUpdatesSinceArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  since: Scalars['Date']['input'];
  sort?: InputMaybe<SortParams>;
};


export type QueryUserArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryValidateUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryWebhookArgs = {
  id: Scalars['ID']['input'];
};

export type Reaction = {
  __typename?: 'Reaction';
  code: ReactionType;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user: User;
};

export enum ReactionType {
  Crying = 'CRYING',
  Heart = 'HEART',
  Hushed = 'HUSHED',
  Like = 'LIKE',
  Pout = 'POUT',
  Smile = 'SMILE'
}

export type ReadState = {
  __typename?: 'ReadState';
  progressAnchorIndex: Scalars['Int']['output'];
  progressPercent: Scalars['Float']['output'];
  reading?: Maybe<Scalars['Boolean']['output']>;
  readingTime?: Maybe<Scalars['Int']['output']>;
};

export type RecentEmail = {
  __typename?: 'RecentEmail';
  createdAt: Scalars['Date']['output'];
  from: Scalars['String']['output'];
  html?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  subject: Scalars['String']['output'];
  text: Scalars['String']['output'];
  to: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type RecentEmailsError = {
  __typename?: 'RecentEmailsError';
  errorCodes: Array<RecentEmailsErrorCode>;
};

export enum RecentEmailsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type RecentEmailsResult = RecentEmailsError | RecentEmailsSuccess;

export type RecentEmailsSuccess = {
  __typename?: 'RecentEmailsSuccess';
  recentEmails: Array<RecentEmail>;
};

export type RecentSearch = {
  __typename?: 'RecentSearch';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  term: Scalars['String']['output'];
};

export type RecentSearchesError = {
  __typename?: 'RecentSearchesError';
  errorCodes: Array<RecentSearchesErrorCode>;
};

export enum RecentSearchesErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type RecentSearchesResult = RecentSearchesError | RecentSearchesSuccess;

export type RecentSearchesSuccess = {
  __typename?: 'RecentSearchesSuccess';
  searches: Array<RecentSearch>;
};

export type RecommendError = {
  __typename?: 'RecommendError';
  errorCodes: Array<RecommendErrorCode>;
};

export enum RecommendErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type RecommendHighlightsError = {
  __typename?: 'RecommendHighlightsError';
  errorCodes: Array<RecommendHighlightsErrorCode>;
};

export enum RecommendHighlightsErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type RecommendHighlightsInput = {
  groupIds: Array<Scalars['ID']['input']>;
  highlightIds: Array<Scalars['ID']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  pageId: Scalars['ID']['input'];
};

export type RecommendHighlightsResult = RecommendHighlightsError | RecommendHighlightsSuccess;

export type RecommendHighlightsSuccess = {
  __typename?: 'RecommendHighlightsSuccess';
  success: Scalars['Boolean']['output'];
};

export type RecommendInput = {
  groupIds: Array<Scalars['ID']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  pageId: Scalars['ID']['input'];
  recommendedWithHighlights?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecommendResult = RecommendError | RecommendSuccess;

export type RecommendSuccess = {
  __typename?: 'RecommendSuccess';
  success: Scalars['Boolean']['output'];
};

export type Recommendation = {
  __typename?: 'Recommendation';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  recommendedAt: Scalars['Date']['output'];
  user?: Maybe<RecommendingUser>;
};

export type RecommendationGroup = {
  __typename?: 'RecommendationGroup';
  admins: Array<User>;
  canPost: Scalars['Boolean']['output'];
  canSeeMembers: Scalars['Boolean']['output'];
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inviteUrl: Scalars['String']['output'];
  members: Array<User>;
  name: Scalars['String']['output'];
  topics?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type RecommendingUser = {
  __typename?: 'RecommendingUser';
  name: Scalars['String']['output'];
  profileImageURL?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Reminder = {
  __typename?: 'Reminder';
  archiveUntil: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  remindAt: Scalars['Date']['output'];
  sendNotification: Scalars['Boolean']['output'];
};

export type ReminderError = {
  __typename?: 'ReminderError';
  errorCodes: Array<ReminderErrorCode>;
};

export enum ReminderErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type ReminderResult = ReminderError | ReminderSuccess;

export type ReminderSuccess = {
  __typename?: 'ReminderSuccess';
  reminder: Reminder;
};

export type ReportItemInput = {
  itemUrl: Scalars['String']['input'];
  pageId: Scalars['ID']['input'];
  reportComment: Scalars['String']['input'];
  reportTypes: Array<ReportType>;
  sharedBy?: InputMaybe<Scalars['ID']['input']>;
};

export type ReportItemResult = {
  __typename?: 'ReportItemResult';
  message: Scalars['String']['output'];
};

export enum ReportType {
  Abusive = 'ABUSIVE',
  ContentDisplay = 'CONTENT_DISPLAY',
  ContentViolation = 'CONTENT_VIOLATION',
  Spam = 'SPAM'
}

export type RevokeApiKeyError = {
  __typename?: 'RevokeApiKeyError';
  errorCodes: Array<RevokeApiKeyErrorCode>;
};

export enum RevokeApiKeyErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type RevokeApiKeyResult = RevokeApiKeyError | RevokeApiKeySuccess;

export type RevokeApiKeySuccess = {
  __typename?: 'RevokeApiKeySuccess';
  apiKey: ApiKey;
};

export type Rule = {
  __typename?: 'Rule';
  actions: Array<RuleAction>;
  createdAt: Scalars['Date']['output'];
  enabled: Scalars['Boolean']['output'];
  eventTypes: Array<RuleEventType>;
  filter: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type RuleAction = {
  __typename?: 'RuleAction';
  params: Array<Scalars['String']['output']>;
  type: RuleActionType;
};

export type RuleActionInput = {
  params: Array<Scalars['String']['input']>;
  type: RuleActionType;
};

export enum RuleActionType {
  AddLabel = 'ADD_LABEL',
  Archive = 'ARCHIVE',
  MarkAsRead = 'MARK_AS_READ',
  SendNotification = 'SEND_NOTIFICATION'
}

export enum RuleEventType {
  PageCreated = 'PAGE_CREATED',
  PageUpdated = 'PAGE_UPDATED'
}

export type RulesError = {
  __typename?: 'RulesError';
  errorCodes: Array<RulesErrorCode>;
};

export enum RulesErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type RulesResult = RulesError | RulesSuccess;

export type RulesSuccess = {
  __typename?: 'RulesSuccess';
  rules: Array<Rule>;
};

export type SaveArticleReadingProgressError = {
  __typename?: 'SaveArticleReadingProgressError';
  errorCodes: Array<SaveArticleReadingProgressErrorCode>;
};

export enum SaveArticleReadingProgressErrorCode {
  BadData = 'BAD_DATA',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SaveArticleReadingProgressInput = {
  force?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  readingProgressAnchorIndex?: InputMaybe<Scalars['Int']['input']>;
  readingProgressPercent: Scalars['Float']['input'];
  readingProgressTopPercent?: InputMaybe<Scalars['Float']['input']>;
};

export type SaveArticleReadingProgressResult = SaveArticleReadingProgressError | SaveArticleReadingProgressSuccess;

export type SaveArticleReadingProgressSuccess = {
  __typename?: 'SaveArticleReadingProgressSuccess';
  updatedArticle: Article;
};

export type SaveError = {
  __typename?: 'SaveError';
  errorCodes: Array<SaveErrorCode>;
  message?: Maybe<Scalars['String']['output']>;
};

export enum SaveErrorCode {
  EmbeddedHighlightFailed = 'EMBEDDED_HIGHLIGHT_FAILED',
  Unauthorized = 'UNAUTHORIZED',
  Unknown = 'UNKNOWN'
}

export type SaveFileInput = {
  clientRequestId: Scalars['ID']['input'];
  labels?: InputMaybe<Array<CreateLabelInput>>;
  source: Scalars['String']['input'];
  state?: InputMaybe<ArticleSavingRequestStatus>;
  uploadFileId: Scalars['ID']['input'];
  url: Scalars['String']['input'];
};

export type SaveFilterError = {
  __typename?: 'SaveFilterError';
  errorCodes: Array<SaveFilterErrorCode>;
};

export enum SaveFilterErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SaveFilterInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  filter: Scalars['String']['input'];
  name: Scalars['String']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
};

export type SaveFilterResult = SaveFilterError | SaveFilterSuccess;

export type SaveFilterSuccess = {
  __typename?: 'SaveFilterSuccess';
  filter: Filter;
};

export type SavePageInput = {
  clientRequestId: Scalars['ID']['input'];
  labels?: InputMaybe<Array<CreateLabelInput>>;
  originalContent: Scalars['String']['input'];
  parseResult?: InputMaybe<ParseResult>;
  publishedAt?: InputMaybe<Scalars['Date']['input']>;
  rssFeedUrl?: InputMaybe<Scalars['String']['input']>;
  savedAt?: InputMaybe<Scalars['Date']['input']>;
  source: Scalars['String']['input'];
  state?: InputMaybe<ArticleSavingRequestStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type SaveResult = SaveError | SaveSuccess;

export type SaveSuccess = {
  __typename?: 'SaveSuccess';
  clientRequestId: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type SaveUrlInput = {
  clientRequestId: Scalars['ID']['input'];
  labels?: InputMaybe<Array<CreateLabelInput>>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['Date']['input']>;
  savedAt?: InputMaybe<Scalars['Date']['input']>;
  source: Scalars['String']['input'];
  state?: InputMaybe<ArticleSavingRequestStatus>;
  timezone?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type SearchError = {
  __typename?: 'SearchError';
  errorCodes: Array<SearchErrorCode>;
};

export enum SearchErrorCode {
  QueryTooLong = 'QUERY_TOO_LONG',
  Unauthorized = 'UNAUTHORIZED'
}

export type SearchItem = {
  __typename?: 'SearchItem';
  annotation?: Maybe<Scalars['String']['output']>;
  archivedAt?: Maybe<Scalars['Date']['output']>;
  author?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  contentReader: ContentReader;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  highlights?: Maybe<Array<Highlight>>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isArchived: Scalars['Boolean']['output'];
  labels?: Maybe<Array<Label>>;
  language?: Maybe<Scalars['String']['output']>;
  originalArticleUrl?: Maybe<Scalars['String']['output']>;
  ownedByViewer?: Maybe<Scalars['Boolean']['output']>;
  pageId?: Maybe<Scalars['ID']['output']>;
  pageType: PageType;
  publishedAt?: Maybe<Scalars['Date']['output']>;
  quote?: Maybe<Scalars['String']['output']>;
  readAt?: Maybe<Scalars['Date']['output']>;
  readingProgressAnchorIndex: Scalars['Int']['output'];
  readingProgressPercent: Scalars['Float']['output'];
  readingProgressTopPercent?: Maybe<Scalars['Float']['output']>;
  recommendations?: Maybe<Array<Recommendation>>;
  savedAt: Scalars['Date']['output'];
  shortId?: Maybe<Scalars['String']['output']>;
  siteIcon?: Maybe<Scalars['String']['output']>;
  siteName?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  state?: Maybe<ArticleSavingRequestStatus>;
  subscription?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  unsubHttpUrl?: Maybe<Scalars['String']['output']>;
  unsubMailTo?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  uploadFileId?: Maybe<Scalars['ID']['output']>;
  url: Scalars['String']['output'];
  wordsCount?: Maybe<Scalars['Int']['output']>;
};

export type SearchItemEdge = {
  __typename?: 'SearchItemEdge';
  cursor: Scalars['String']['output'];
  node: SearchItem;
};

export type SearchResult = SearchError | SearchSuccess;

export type SearchSuccess = {
  __typename?: 'SearchSuccess';
  edges: Array<SearchItemEdge>;
  pageInfo: PageInfo;
};

export type SendInstallInstructionsError = {
  __typename?: 'SendInstallInstructionsError';
  errorCodes: Array<SendInstallInstructionsErrorCode>;
};

export enum SendInstallInstructionsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SendInstallInstructionsResult = SendInstallInstructionsError | SendInstallInstructionsSuccess;

export type SendInstallInstructionsSuccess = {
  __typename?: 'SendInstallInstructionsSuccess';
  sent: Scalars['Boolean']['output'];
};

export type SetBookmarkArticleError = {
  __typename?: 'SetBookmarkArticleError';
  errorCodes: Array<SetBookmarkArticleErrorCode>;
};

export enum SetBookmarkArticleErrorCode {
  BookmarkExists = 'BOOKMARK_EXISTS',
  NotFound = 'NOT_FOUND'
}

export type SetBookmarkArticleInput = {
  articleID: Scalars['ID']['input'];
  bookmark: Scalars['Boolean']['input'];
};

export type SetBookmarkArticleResult = SetBookmarkArticleError | SetBookmarkArticleSuccess;

export type SetBookmarkArticleSuccess = {
  __typename?: 'SetBookmarkArticleSuccess';
  bookmarkedArticle: Article;
};

export type SetDeviceTokenError = {
  __typename?: 'SetDeviceTokenError';
  errorCodes: Array<SetDeviceTokenErrorCode>;
};

export enum SetDeviceTokenErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetDeviceTokenInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type SetDeviceTokenResult = SetDeviceTokenError | SetDeviceTokenSuccess;

export type SetDeviceTokenSuccess = {
  __typename?: 'SetDeviceTokenSuccess';
  deviceToken: DeviceToken;
};

export type SetFavoriteArticleError = {
  __typename?: 'SetFavoriteArticleError';
  errorCodes: Array<SetFavoriteArticleErrorCode>;
};

export enum SetFavoriteArticleErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetFavoriteArticleResult = SetFavoriteArticleError | SetFavoriteArticleSuccess;

export type SetFavoriteArticleSuccess = {
  __typename?: 'SetFavoriteArticleSuccess';
  success: Scalars['Boolean']['output'];
};

export type SetFollowError = {
  __typename?: 'SetFollowError';
  errorCodes: Array<SetFollowErrorCode>;
};

export enum SetFollowErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetFollowInput = {
  follow: Scalars['Boolean']['input'];
  userId: Scalars['ID']['input'];
};

export type SetFollowResult = SetFollowError | SetFollowSuccess;

export type SetFollowSuccess = {
  __typename?: 'SetFollowSuccess';
  updatedUser: User;
};

export type SetIntegrationError = {
  __typename?: 'SetIntegrationError';
  errorCodes: Array<SetIntegrationErrorCode>;
};

export enum SetIntegrationErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  InvalidToken = 'INVALID_TOKEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetIntegrationInput = {
  enabled: Scalars['Boolean']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  importItemState?: InputMaybe<ImportItemState>;
  name: Scalars['String']['input'];
  syncedAt?: InputMaybe<Scalars['Date']['input']>;
  token: Scalars['String']['input'];
  type?: InputMaybe<IntegrationType>;
};

export type SetIntegrationResult = SetIntegrationError | SetIntegrationSuccess;

export type SetIntegrationSuccess = {
  __typename?: 'SetIntegrationSuccess';
  integration: Integration;
};

export type SetLabelsError = {
  __typename?: 'SetLabelsError';
  errorCodes: Array<SetLabelsErrorCode>;
};

export enum SetLabelsErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetLabelsForHighlightInput = {
  highlightId: Scalars['ID']['input'];
  labelIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  labels?: InputMaybe<Array<CreateLabelInput>>;
};

export type SetLabelsInput = {
  labelIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  labels?: InputMaybe<Array<CreateLabelInput>>;
  pageId: Scalars['ID']['input'];
};

export type SetLabelsResult = SetLabelsError | SetLabelsSuccess;

export type SetLabelsSuccess = {
  __typename?: 'SetLabelsSuccess';
  labels: Array<Label>;
};

export type SetRuleError = {
  __typename?: 'SetRuleError';
  errorCodes: Array<SetRuleErrorCode>;
};

export enum SetRuleErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetRuleInput = {
  actions: Array<RuleActionInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled: Scalars['Boolean']['input'];
  eventTypes: Array<RuleEventType>;
  filter: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};

export type SetRuleResult = SetRuleError | SetRuleSuccess;

export type SetRuleSuccess = {
  __typename?: 'SetRuleSuccess';
  rule: Rule;
};

export type SetShareArticleError = {
  __typename?: 'SetShareArticleError';
  errorCodes: Array<SetShareArticleErrorCode>;
};

export enum SetShareArticleErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetShareArticleInput = {
  articleID: Scalars['ID']['input'];
  share: Scalars['Boolean']['input'];
  sharedComment?: InputMaybe<Scalars['String']['input']>;
  sharedWithHighlights?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SetShareArticleResult = SetShareArticleError | SetShareArticleSuccess;

export type SetShareArticleSuccess = {
  __typename?: 'SetShareArticleSuccess';
  updatedArticle: Article;
  updatedFeedArticle?: Maybe<FeedArticle>;
  updatedFeedArticleId?: Maybe<Scalars['String']['output']>;
};

export type SetShareHighlightError = {
  __typename?: 'SetShareHighlightError';
  errorCodes: Array<SetShareHighlightErrorCode>;
};

export enum SetShareHighlightErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetShareHighlightInput = {
  id: Scalars['ID']['input'];
  share: Scalars['Boolean']['input'];
};

export type SetShareHighlightResult = SetShareHighlightError | SetShareHighlightSuccess;

export type SetShareHighlightSuccess = {
  __typename?: 'SetShareHighlightSuccess';
  highlight: Highlight;
};

export type SetUserPersonalizationError = {
  __typename?: 'SetUserPersonalizationError';
  errorCodes: Array<SetUserPersonalizationErrorCode>;
};

export enum SetUserPersonalizationErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetUserPersonalizationInput = {
  fields?: InputMaybe<Scalars['JSON']['input']>;
  fontFamily?: InputMaybe<Scalars['String']['input']>;
  fontSize?: InputMaybe<Scalars['Int']['input']>;
  libraryLayoutType?: InputMaybe<Scalars['String']['input']>;
  librarySortOrder?: InputMaybe<SortOrder>;
  margin?: InputMaybe<Scalars['Int']['input']>;
  speechRate?: InputMaybe<Scalars['String']['input']>;
  speechSecondaryVoice?: InputMaybe<Scalars['String']['input']>;
  speechVoice?: InputMaybe<Scalars['String']['input']>;
  speechVolume?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
};

export type SetUserPersonalizationResult = SetUserPersonalizationError | SetUserPersonalizationSuccess;

export type SetUserPersonalizationSuccess = {
  __typename?: 'SetUserPersonalizationSuccess';
  updatedUserPersonalization: UserPersonalization;
};

export type SetWebhookError = {
  __typename?: 'SetWebhookError';
  errorCodes: Array<SetWebhookErrorCode>;
};

export enum SetWebhookErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SetWebhookInput = {
  contentType?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  eventTypes: Array<WebhookEvent>;
  id?: InputMaybe<Scalars['ID']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type SetWebhookResult = SetWebhookError | SetWebhookSuccess;

export type SetWebhookSuccess = {
  __typename?: 'SetWebhookSuccess';
  webhook: Webhook;
};

export type ShareStats = {
  __typename?: 'ShareStats';
  readDuration: Scalars['Int']['output'];
  saveCount: Scalars['Int']['output'];
  viewCount: Scalars['Int']['output'];
};

export type SharedArticleError = {
  __typename?: 'SharedArticleError';
  errorCodes: Array<SharedArticleErrorCode>;
};

export enum SharedArticleErrorCode {
  NotFound = 'NOT_FOUND'
}

export type SharedArticleResult = SharedArticleError | SharedArticleSuccess;

export type SharedArticleSuccess = {
  __typename?: 'SharedArticleSuccess';
  article: Article;
};

export enum SignupErrorCode {
  AccessDenied = 'ACCESS_DENIED',
  ExpiredToken = 'EXPIRED_TOKEN',
  GoogleAuthError = 'GOOGLE_AUTH_ERROR',
  InvalidEmail = 'INVALID_EMAIL',
  InvalidPassword = 'INVALID_PASSWORD',
  InvalidUsername = 'INVALID_USERNAME',
  Unknown = 'UNKNOWN',
  UserExists = 'USER_EXISTS'
}

export enum SortBy {
  PublishedAt = 'PUBLISHED_AT',
  SavedAt = 'SAVED_AT',
  Score = 'SCORE',
  UpdatedTime = 'UPDATED_TIME'
}

export enum SortOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export type SortParams = {
  by: SortBy;
  order?: InputMaybe<SortOrder>;
};

export type SubscribeError = {
  __typename?: 'SubscribeError';
  errorCodes: Array<SubscribeErrorCode>;
};

export enum SubscribeErrorCode {
  AlreadySubscribed = 'ALREADY_SUBSCRIBED',
  BadRequest = 'BAD_REQUEST',
  ExceededMaxSubscriptions = 'EXCEEDED_MAX_SUBSCRIPTIONS',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type SubscribeInput = {
  subscriptionType?: InputMaybe<SubscriptionType>;
  url: Scalars['String']['input'];
};

export type SubscribeResult = SubscribeError | SubscribeSuccess;

export type SubscribeSuccess = {
  __typename?: 'SubscribeSuccess';
  subscriptions: Array<Subscription>;
};

export type Subscription = {
  __typename?: 'Subscription';
  count: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastFetchedAt?: Maybe<Scalars['Date']['output']>;
  name: Scalars['String']['output'];
  newsletterEmail?: Maybe<Scalars['String']['output']>;
  status: SubscriptionStatus;
  type: SubscriptionType;
  unsubscribeHttpUrl?: Maybe<Scalars['String']['output']>;
  unsubscribeMailTo?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export enum SubscriptionStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Unsubscribed = 'UNSUBSCRIBED'
}

export enum SubscriptionType {
  Newsletter = 'NEWSLETTER',
  Rss = 'RSS'
}

export type SubscriptionsError = {
  __typename?: 'SubscriptionsError';
  errorCodes: Array<SubscriptionsErrorCode>;
};

export enum SubscriptionsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type SubscriptionsResult = SubscriptionsError | SubscriptionsSuccess;

export type SubscriptionsSuccess = {
  __typename?: 'SubscriptionsSuccess';
  subscriptions: Array<Subscription>;
};

export type SyncUpdatedItemEdge = {
  __typename?: 'SyncUpdatedItemEdge';
  cursor: Scalars['String']['output'];
  itemID: Scalars['ID']['output'];
  node?: Maybe<SearchItem>;
  updateReason: UpdateReason;
};

export type TypeaheadSearchError = {
  __typename?: 'TypeaheadSearchError';
  errorCodes: Array<TypeaheadSearchErrorCode>;
};

export enum TypeaheadSearchErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type TypeaheadSearchItem = {
  __typename?: 'TypeaheadSearchItem';
  contentReader: ContentReader;
  id: Scalars['ID']['output'];
  siteName?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TypeaheadSearchResult = TypeaheadSearchError | TypeaheadSearchSuccess;

export type TypeaheadSearchSuccess = {
  __typename?: 'TypeaheadSearchSuccess';
  items: Array<TypeaheadSearchItem>;
};

export type UnsubscribeError = {
  __typename?: 'UnsubscribeError';
  errorCodes: Array<UnsubscribeErrorCode>;
};

export enum UnsubscribeErrorCode {
  AlreadyUnsubscribed = 'ALREADY_UNSUBSCRIBED',
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
  UnsubscribeMethodNotFound = 'UNSUBSCRIBE_METHOD_NOT_FOUND'
}

export type UnsubscribeResult = UnsubscribeError | UnsubscribeSuccess;

export type UnsubscribeSuccess = {
  __typename?: 'UnsubscribeSuccess';
  subscription: Subscription;
};

export type UpdateEmailError = {
  __typename?: 'UpdateEmailError';
  errorCodes: Array<UpdateEmailErrorCode>;
};

export enum UpdateEmailErrorCode {
  BadRequest = 'BAD_REQUEST',
  EmailAlreadyExists = 'EMAIL_ALREADY_EXISTS',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateEmailInput = {
  email: Scalars['String']['input'];
};

export type UpdateEmailResult = UpdateEmailError | UpdateEmailSuccess;

export type UpdateEmailSuccess = {
  __typename?: 'UpdateEmailSuccess';
  email: Scalars['String']['output'];
  verificationEmailSent?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateFilterError = {
  __typename?: 'UpdateFilterError';
  errorCodes: Array<UpdateFilterErrorCode>;
};

export enum UpdateFilterErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateFilterInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateFilterResult = UpdateFilterError | UpdateFilterSuccess;

export type UpdateFilterSuccess = {
  __typename?: 'UpdateFilterSuccess';
  filter: Filter;
};

export type UpdateHighlightError = {
  __typename?: 'UpdateHighlightError';
  errorCodes: Array<UpdateHighlightErrorCode>;
};

export enum UpdateHighlightErrorCode {
  BadData = 'BAD_DATA',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateHighlightInput = {
  annotation?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  highlightId: Scalars['ID']['input'];
  html?: InputMaybe<Scalars['String']['input']>;
  quote?: InputMaybe<Scalars['String']['input']>;
  sharedAt?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdateHighlightReplyError = {
  __typename?: 'UpdateHighlightReplyError';
  errorCodes: Array<UpdateHighlightReplyErrorCode>;
};

export enum UpdateHighlightReplyErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateHighlightReplyInput = {
  highlightReplyId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type UpdateHighlightReplyResult = UpdateHighlightReplyError | UpdateHighlightReplySuccess;

export type UpdateHighlightReplySuccess = {
  __typename?: 'UpdateHighlightReplySuccess';
  highlightReply: HighlightReply;
};

export type UpdateHighlightResult = UpdateHighlightError | UpdateHighlightSuccess;

export type UpdateHighlightSuccess = {
  __typename?: 'UpdateHighlightSuccess';
  highlight: Highlight;
};

export type UpdateLabelError = {
  __typename?: 'UpdateLabelError';
  errorCodes: Array<UpdateLabelErrorCode>;
};

export enum UpdateLabelErrorCode {
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateLabelInput = {
  color: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  labelId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateLabelResult = UpdateLabelError | UpdateLabelSuccess;

export type UpdateLabelSuccess = {
  __typename?: 'UpdateLabelSuccess';
  label: Label;
};

export type UpdateLinkShareInfoError = {
  __typename?: 'UpdateLinkShareInfoError';
  errorCodes: Array<UpdateLinkShareInfoErrorCode>;
};

export enum UpdateLinkShareInfoErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateLinkShareInfoInput = {
  description: Scalars['String']['input'];
  linkId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type UpdateLinkShareInfoResult = UpdateLinkShareInfoError | UpdateLinkShareInfoSuccess;

export type UpdateLinkShareInfoSuccess = {
  __typename?: 'UpdateLinkShareInfoSuccess';
  message: Scalars['String']['output'];
};

export type UpdatePageError = {
  __typename?: 'UpdatePageError';
  errorCodes: Array<UpdatePageErrorCode>;
};

export enum UpdatePageErrorCode {
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
  UpdateFailed = 'UPDATE_FAILED'
}

export type UpdatePageInput = {
  byline?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  pageId: Scalars['ID']['input'];
  previewImage?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['Date']['input']>;
  savedAt?: InputMaybe<Scalars['Date']['input']>;
  state?: InputMaybe<ArticleSavingRequestStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePageResult = UpdatePageError | UpdatePageSuccess;

export type UpdatePageSuccess = {
  __typename?: 'UpdatePageSuccess';
  updatedPage: Article;
};

export enum UpdateReason {
  Created = 'CREATED',
  Deleted = 'DELETED',
  Updated = 'UPDATED'
}

export type UpdateReminderError = {
  __typename?: 'UpdateReminderError';
  errorCodes: Array<UpdateReminderErrorCode>;
};

export enum UpdateReminderErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateReminderInput = {
  archiveUntil: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
  remindAt: Scalars['Date']['input'];
  sendNotification: Scalars['Boolean']['input'];
};

export type UpdateReminderResult = UpdateReminderError | UpdateReminderSuccess;

export type UpdateReminderSuccess = {
  __typename?: 'UpdateReminderSuccess';
  reminder: Reminder;
};

export type UpdateSharedCommentError = {
  __typename?: 'UpdateSharedCommentError';
  errorCodes: Array<UpdateSharedCommentErrorCode>;
};

export enum UpdateSharedCommentErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateSharedCommentInput = {
  articleID: Scalars['ID']['input'];
  sharedComment: Scalars['String']['input'];
};

export type UpdateSharedCommentResult = UpdateSharedCommentError | UpdateSharedCommentSuccess;

export type UpdateSharedCommentSuccess = {
  __typename?: 'UpdateSharedCommentSuccess';
  articleID: Scalars['ID']['output'];
  sharedComment: Scalars['String']['output'];
};

export type UpdateSubscriptionError = {
  __typename?: 'UpdateSubscriptionError';
  errorCodes: Array<UpdateSubscriptionErrorCode>;
};

export enum UpdateSubscriptionErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdateSubscriptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastFetchedAt?: InputMaybe<Scalars['Date']['input']>;
  lastFetchedChecksum?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  scheduledAt?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<SubscriptionStatus>;
};

export type UpdateSubscriptionResult = UpdateSubscriptionError | UpdateSubscriptionSuccess;

export type UpdateSubscriptionSuccess = {
  __typename?: 'UpdateSubscriptionSuccess';
  subscription: Subscription;
};

export type UpdateUserError = {
  __typename?: 'UpdateUserError';
  errorCodes: Array<UpdateUserErrorCode>;
};

export enum UpdateUserErrorCode {
  BioTooLong = 'BIO_TOO_LONG',
  EmptyName = 'EMPTY_NAME',
  Unauthorized = 'UNAUTHORIZED',
  UserNotFound = 'USER_NOT_FOUND'
}

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type UpdateUserProfileError = {
  __typename?: 'UpdateUserProfileError';
  errorCodes: Array<UpdateUserProfileErrorCode>;
};

export enum UpdateUserProfileErrorCode {
  BadData = 'BAD_DATA',
  BadUsername = 'BAD_USERNAME',
  Forbidden = 'FORBIDDEN',
  Unauthorized = 'UNAUTHORIZED',
  UsernameExists = 'USERNAME_EXISTS'
}

export type UpdateUserProfileInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  pictureUrl?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserProfileResult = UpdateUserProfileError | UpdateUserProfileSuccess;

export type UpdateUserProfileSuccess = {
  __typename?: 'UpdateUserProfileSuccess';
  user: User;
};

export type UpdateUserResult = UpdateUserError | UpdateUserSuccess;

export type UpdateUserSuccess = {
  __typename?: 'UpdateUserSuccess';
  user: User;
};

export type UpdatesSinceError = {
  __typename?: 'UpdatesSinceError';
  errorCodes: Array<UpdatesSinceErrorCode>;
};

export enum UpdatesSinceErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type UpdatesSinceResult = UpdatesSinceError | UpdatesSinceSuccess;

export type UpdatesSinceSuccess = {
  __typename?: 'UpdatesSinceSuccess';
  edges: Array<SyncUpdatedItemEdge>;
  pageInfo: PageInfo;
};

export type UploadFileRequestError = {
  __typename?: 'UploadFileRequestError';
  errorCodes: Array<UploadFileRequestErrorCode>;
};

export enum UploadFileRequestErrorCode {
  BadInput = 'BAD_INPUT',
  FailedCreate = 'FAILED_CREATE',
  Unauthorized = 'UNAUTHORIZED'
}

export type UploadFileRequestInput = {
  clientRequestId?: InputMaybe<Scalars['String']['input']>;
  contentType: Scalars['String']['input'];
  createPageEntry?: InputMaybe<Scalars['Boolean']['input']>;
  url: Scalars['String']['input'];
};

export type UploadFileRequestResult = UploadFileRequestError | UploadFileRequestSuccess;

export type UploadFileRequestSuccess = {
  __typename?: 'UploadFileRequestSuccess';
  createdPageId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  uploadFileId?: Maybe<Scalars['ID']['output']>;
  uploadSignedUrl?: Maybe<Scalars['String']['output']>;
};

export enum UploadFileStatus {
  Completed = 'COMPLETED',
  Initialized = 'INITIALIZED'
}

export type UploadImportFileError = {
  __typename?: 'UploadImportFileError';
  errorCodes: Array<UploadImportFileErrorCode>;
};

export enum UploadImportFileErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
  UploadDailyLimitExceeded = 'UPLOAD_DAILY_LIMIT_EXCEEDED'
}

export type UploadImportFileResult = UploadImportFileError | UploadImportFileSuccess;

export type UploadImportFileSuccess = {
  __typename?: 'UploadImportFileSuccess';
  uploadSignedUrl?: Maybe<Scalars['String']['output']>;
};

export enum UploadImportFileType {
  Matter = 'MATTER',
  Pocket = 'POCKET',
  UrlList = 'URL_LIST'
}

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  followersCount?: Maybe<Scalars['Int']['output']>;
  friendsCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  intercomHash?: Maybe<Scalars['String']['output']>;
  /** @deprecated isFriend has been replaced with viewerIsFollowing */
  isFriend?: Maybe<Scalars['Boolean']['output']>;
  isFullUser?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  profile: Profile;
  sharedArticles: Array<FeedArticle>;
  sharedArticlesCount?: Maybe<Scalars['Int']['output']>;
  sharedHighlightsCount?: Maybe<Scalars['Int']['output']>;
  sharedNotesCount?: Maybe<Scalars['Int']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  viewerIsFollowing?: Maybe<Scalars['Boolean']['output']>;
};

export type UserError = {
  __typename?: 'UserError';
  errorCodes: Array<UserErrorCode>;
};

export enum UserErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
  UserNotFound = 'USER_NOT_FOUND'
}

export type UserPersonalization = {
  __typename?: 'UserPersonalization';
  fields?: Maybe<Scalars['JSON']['output']>;
  fontFamily?: Maybe<Scalars['String']['output']>;
  fontSize?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  libraryLayoutType?: Maybe<Scalars['String']['output']>;
  librarySortOrder?: Maybe<SortOrder>;
  margin?: Maybe<Scalars['Int']['output']>;
  speechRate?: Maybe<Scalars['String']['output']>;
  speechSecondaryVoice?: Maybe<Scalars['String']['output']>;
  speechVoice?: Maybe<Scalars['String']['output']>;
  speechVolume?: Maybe<Scalars['String']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
};

export type UserResult = UserError | UserSuccess;

export type UserSuccess = {
  __typename?: 'UserSuccess';
  user: User;
};

export type UsersError = {
  __typename?: 'UsersError';
  errorCodes: Array<UsersErrorCode>;
};

export enum UsersErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type UsersResult = UsersError | UsersSuccess;

export type UsersSuccess = {
  __typename?: 'UsersSuccess';
  users: Array<User>;
};

export type Webhook = {
  __typename?: 'Webhook';
  contentType: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  enabled: Scalars['Boolean']['output'];
  eventTypes: Array<WebhookEvent>;
  id: Scalars['ID']['output'];
  method: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url: Scalars['String']['output'];
};

export type WebhookError = {
  __typename?: 'WebhookError';
  errorCodes: Array<WebhookErrorCode>;
};

export enum WebhookErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export enum WebhookEvent {
  HighlightCreated = 'HIGHLIGHT_CREATED',
  HighlightDeleted = 'HIGHLIGHT_DELETED',
  HighlightUpdated = 'HIGHLIGHT_UPDATED',
  LabelCreated = 'LABEL_CREATED',
  LabelDeleted = 'LABEL_DELETED',
  LabelUpdated = 'LABEL_UPDATED',
  PageCreated = 'PAGE_CREATED',
  PageDeleted = 'PAGE_DELETED',
  PageUpdated = 'PAGE_UPDATED'
}

export type WebhookResult = WebhookError | WebhookSuccess;

export type WebhookSuccess = {
  __typename?: 'WebhookSuccess';
  webhook: Webhook;
};

export type WebhooksError = {
  __typename?: 'WebhooksError';
  errorCodes: Array<WebhooksErrorCode>;
};

export enum WebhooksErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED'
}

export type WebhooksResult = WebhooksError | WebhooksSuccess;

export type WebhooksSuccess = {
  __typename?: 'WebhooksSuccess';
  webhooks: Array<Webhook>;
};

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string } | null };


export const ViewerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ViewerQuery, ViewerQueryVariables>;