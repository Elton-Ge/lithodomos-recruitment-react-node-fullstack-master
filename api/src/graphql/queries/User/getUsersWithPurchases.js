import type { UserMongooseRecord } from '../../../mongoose/types/User';
import { UserInputError } from 'apollo-server-micro';
import { getLimitAndSkipFromPagination } from '../../../utils/getLimitAndSkipFromPagination';

/* will get all users who own at least one tour */

type getUsersWithPurchasesArgs = {
  input: {
    recordsPerPage: number,
    pageNumber: number,
  },
};

type getUsersWithPurchasesResponse = {
  totalPages: number,
  totalRecordsCount: number,
  users: Array<UserMongooseRecord>,
};

export async function getUsersWithPurchases(
  _: void,
  { input }: getUsersWithPurchasesArgs,
  ctx: any,
): Promise<getUsersWithPurchasesResponse> {
  const { recordsPerPage = 25, pageNumber = 1 } = input;

  if (pageNumber < 1) {
    return new UserInputError('Page number should be 1 or more');
  }

  if (recordsPerPage < 1 || recordsPerPage > 50) {
    return new UserInputError(
      'Records per page should be between 1 and 50 (both inclusive)',
    );
  }

  const { skip, limit } = getLimitAndSkipFromPagination({
    recordsPerPage,
    pageNumber,
  });

  const [users, totalRecordsCount] = await Promise.all([
    ctx.db.User.query({ 'purchasedTourIDs.1': { $exists: true } })
      .skip(skip)
      .limit(limit)
      .lean()
      .sort({ date: 1 }),
    ctx.db.User.count({}),
  ]);

  return {
    totalPages: limit > 0 ? Math.ceil(totalRecordsCount / recordsPerPage) : 1,
    totalRecordsCount,
    users,
  };
}

getUsersWithPurchases.typeDef = `
  extend type Query {
    getUsersWithPurchases(input: GetUsersWithPurchasesInput!): GetUsersWithPurchasesResponse!
  }
  

input GetUsersWithPurchasesInput {
recordsPerPage: Int
pageNumber: Int
}

type GetUsersWithPurchasesResponse implements PaginatedListResponse {
totalPages: Int!
totalRecordsCount: Int!
users: [User!]!
}
`;
