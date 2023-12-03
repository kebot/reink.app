/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Search($after: String, $first: Int, $query: String) {\n    search(after: $after, first: $first, query: $query) {\n      ... on SearchSuccess {\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          totalCount\n        }\n        edges {\n          cursor\n          node {\n            title\n            slug\n            description\n            url\n            savedAt\n            siteName\n            siteIcon\n            image\n            author\n\n            language\n            subscription\n            isArchived\n            labels {\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n": types.SearchDocument,
    "\n  query Filters {\n    filters {\n      ... on FiltersSuccess {\n        filters {\n          id\n          name\n          filter\n          position\n          visible\n          defaultFilter\n        }\n      }\n      ... on FiltersError {\n        errorCodes\n      }\n    }\n  }\n": types.FiltersDocument,
    "\n  query Page {\n    me {\n      id\n      name\n      profile {\n        id\n        username\n      }\n    }\n  }\n": types.PageDocument,
    "\n  query GetLabels($username: String!, $slug: String!) {\n    article(username: $username, slug: $slug) {\n      ... on ArticleSuccess {\n        article {\n          id\n          labels {\n            id\n            name\n            color\n            description\n            createdAt\n          }\n        }\n      }\n    }\n\n    labels {\n      ... on LabelsSuccess {\n        labels {\n          id\n          name\n          color\n          description\n          createdAt\n        }\n      }\n      ... on LabelsError {\n        errorCodes\n      }\n    }\n  }\n": types.GetLabelsDocument,
    "\n  mutation CreateLabel($input: CreateLabelInput!) {\n    createLabel(input: $input) {\n      ... on CreateLabelSuccess {\n        label {\n          id\n          name\n          color\n          description\n          createdAt\n        }\n      }\n      ... on CreateLabelError {\n        errorCodes\n      }\n    }\n  }\n": types.CreateLabelDocument,
    "\n  mutation SetLabels($input: SetLabelsInput!) {\n    setLabels(input: $input) {\n      ... on SetLabelsSuccess {\n        labels {\n          id\n          name\n          color\n          description\n          createdAt\n        }\n      }\n      ... on SetLabelsError {\n        errorCodes\n      }\n    }\n  }\n": types.SetLabelsDocument,
    "\n  mutation SetLinkArchived($input: ArchiveLinkInput!) {\n    setLinkArchived(input: $input) {\n      ... on ArchiveLinkSuccess {\n        linkId\n        message\n      }\n      ... on ArchiveLinkError {\n        message\n        errorCodes\n      }\n    }\n  }\n": types.SetLinkArchivedDocument,
    "\n  query Article($username: String!, $slug: String!, $format: String!) {\n    article(username: $username, slug: $slug, format: $format) {\n      ... on ArticleSuccess {\n        article {\n          id\n          title\n          content\n          savedAt\n          url\n          siteName\n          publishedAt\n          savedAt\n          author\n          readingProgressPercent\n        }\n      }\n    }\n  }\n": types.ArticleDocument,
    "\n  mutation SaveArticleReadingProgress($input: SaveArticleReadingProgressInput!) {\n    saveArticleReadingProgress(input: $input) {\n      ... on SaveArticleReadingProgressSuccess {\n        updatedArticle {\n          id\n          readingProgressPercent\n          readingProgressAnchorIndex\n        }\n      }\n      ... on SaveArticleReadingProgressError {\n        errorCodes\n      }\n    }\n  }\n": types.SaveArticleReadingProgressDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Search($after: String, $first: Int, $query: String) {\n    search(after: $after, first: $first, query: $query) {\n      ... on SearchSuccess {\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          totalCount\n        }\n        edges {\n          cursor\n          node {\n            title\n            slug\n            description\n            url\n            savedAt\n            siteName\n            siteIcon\n            image\n            author\n\n            language\n            subscription\n            isArchived\n            labels {\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Search($after: String, $first: Int, $query: String) {\n    search(after: $after, first: $first, query: $query) {\n      ... on SearchSuccess {\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          totalCount\n        }\n        edges {\n          cursor\n          node {\n            title\n            slug\n            description\n            url\n            savedAt\n            siteName\n            siteIcon\n            image\n            author\n\n            language\n            subscription\n            isArchived\n            labels {\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Filters {\n    filters {\n      ... on FiltersSuccess {\n        filters {\n          id\n          name\n          filter\n          position\n          visible\n          defaultFilter\n        }\n      }\n      ... on FiltersError {\n        errorCodes\n      }\n    }\n  }\n"): (typeof documents)["\n  query Filters {\n    filters {\n      ... on FiltersSuccess {\n        filters {\n          id\n          name\n          filter\n          position\n          visible\n          defaultFilter\n        }\n      }\n      ... on FiltersError {\n        errorCodes\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Page {\n    me {\n      id\n      name\n      profile {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query Page {\n    me {\n      id\n      name\n      profile {\n        id\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLabels($username: String!, $slug: String!) {\n    article(username: $username, slug: $slug) {\n      ... on ArticleSuccess {\n        article {\n          id\n          labels {\n            id\n            name\n            color\n            description\n            createdAt\n          }\n        }\n      }\n    }\n\n    labels {\n      ... on LabelsSuccess {\n        labels {\n          id\n          name\n          color\n          description\n          createdAt\n        }\n      }\n      ... on LabelsError {\n        errorCodes\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLabels($username: String!, $slug: String!) {\n    article(username: $username, slug: $slug) {\n      ... on ArticleSuccess {\n        article {\n          id\n          labels {\n            id\n            name\n            color\n            description\n            createdAt\n          }\n        }\n      }\n    }\n\n    labels {\n      ... on LabelsSuccess {\n        labels {\n          id\n          name\n          color\n          description\n          createdAt\n        }\n      }\n      ... on LabelsError {\n        errorCodes\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateLabel($input: CreateLabelInput!) {\n    createLabel(input: $input) {\n      ... on CreateLabelSuccess {\n        label {\n          id\n          name\n          color\n          description\n          createdAt\n        }\n      }\n      ... on CreateLabelError {\n        errorCodes\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLabel($input: CreateLabelInput!) {\n    createLabel(input: $input) {\n      ... on CreateLabelSuccess {\n        label {\n          id\n          name\n          color\n          description\n          createdAt\n        }\n      }\n      ... on CreateLabelError {\n        errorCodes\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetLabels($input: SetLabelsInput!) {\n    setLabels(input: $input) {\n      ... on SetLabelsSuccess {\n        labels {\n          id\n          name\n          color\n          description\n          createdAt\n        }\n      }\n      ... on SetLabelsError {\n        errorCodes\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SetLabels($input: SetLabelsInput!) {\n    setLabels(input: $input) {\n      ... on SetLabelsSuccess {\n        labels {\n          id\n          name\n          color\n          description\n          createdAt\n        }\n      }\n      ... on SetLabelsError {\n        errorCodes\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetLinkArchived($input: ArchiveLinkInput!) {\n    setLinkArchived(input: $input) {\n      ... on ArchiveLinkSuccess {\n        linkId\n        message\n      }\n      ... on ArchiveLinkError {\n        message\n        errorCodes\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SetLinkArchived($input: ArchiveLinkInput!) {\n    setLinkArchived(input: $input) {\n      ... on ArchiveLinkSuccess {\n        linkId\n        message\n      }\n      ... on ArchiveLinkError {\n        message\n        errorCodes\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Article($username: String!, $slug: String!, $format: String!) {\n    article(username: $username, slug: $slug, format: $format) {\n      ... on ArticleSuccess {\n        article {\n          id\n          title\n          content\n          savedAt\n          url\n          siteName\n          publishedAt\n          savedAt\n          author\n          readingProgressPercent\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Article($username: String!, $slug: String!, $format: String!) {\n    article(username: $username, slug: $slug, format: $format) {\n      ... on ArticleSuccess {\n        article {\n          id\n          title\n          content\n          savedAt\n          url\n          siteName\n          publishedAt\n          savedAt\n          author\n          readingProgressPercent\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SaveArticleReadingProgress($input: SaveArticleReadingProgressInput!) {\n    saveArticleReadingProgress(input: $input) {\n      ... on SaveArticleReadingProgressSuccess {\n        updatedArticle {\n          id\n          readingProgressPercent\n          readingProgressAnchorIndex\n        }\n      }\n      ... on SaveArticleReadingProgressError {\n        errorCodes\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SaveArticleReadingProgress($input: SaveArticleReadingProgressInput!) {\n    saveArticleReadingProgress(input: $input) {\n      ... on SaveArticleReadingProgressSuccess {\n        updatedArticle {\n          id\n          readingProgressPercent\n          readingProgressAnchorIndex\n        }\n      }\n      ... on SaveArticleReadingProgressError {\n        errorCodes\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;