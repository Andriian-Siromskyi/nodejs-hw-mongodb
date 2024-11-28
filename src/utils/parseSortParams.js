import { SORT_ORDER } from '../constans/sortOrder.js';

const parseSortOrder = (sortOrder) =>
  [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)
    ? sortOrder
    : SORT_ORDER.ASC;

const parseSortBy = (sortBy) =>
  [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavorite',
    'contactType',
    'createdAt',
    'updatedAt',
  ].includes(sortBy)
    ? sortBy
    : '_id';

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
