const CollectionName = {
  SHOPS: 'shops',
  TOKENS: 'tokens',
  API_KEYS: 'api_keys',
  PRODUCTS: 'products',
  CLOTHINGS: 'clothings',
  ELECTRONICS: 'electronics',
  FURNITURE: 'furniture',
};

const TEXT_MAX_LENGTH = 255;
const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
  X_CLIENT_ID: 'x-client-id',
};
const ORDER_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
};
const DEFAULT_ORDER_BY = 'createdAt';
const DEFAULT_FIRST_PAGE = 1;
const DEFAULT_LIMIT = 10;

const CommonQueryParams = {
  page: DEFAULT_FIRST_PAGE,
  limit: DEFAULT_LIMIT,
  orderBy: DEFAULT_ORDER_BY,
  orderDirection: ORDER_DIRECTION.ASC,
  keyword: undefined,
};

module.exports = {
  CollectionName,
  TEXT_MAX_LENGTH,
  HEADER,
  ORDER_DIRECTION,
  DEFAULT_ORDER_BY,
  DEFAULT_FIRST_PAGE,
  DEFAULT_LIMIT,
  CommonQueryParams,
};
