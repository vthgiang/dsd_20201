import { CategoryConstants } from './constants';

var findIndex = (array, id) => {
  var result = -1;
  array.forEach((value, index) => {
    if (value._id === id) {
      result = index;
    }
  });
  return result;
};

const initialState = {
  listPaginate: [],
  list: [],
  totalDocs: 0,
  limit: 0,
  totalPages: 0,
  page: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  isCatSuccess: false,
  isError: false,
  messages: '',
};

export function category(state = initialState, action) {
  var index = -1;
  var indexPaginate = -1;

  switch (action.type) {
    case CategoryConstants.GET_ALL_CATEGORY_REQUEST:
    case CategoryConstants.GET_PAGINATE_REQUEST:
    case CategoryConstants.CREATE_CATEGORY_MONITORED_REQUEST:
    case CategoryConstants.DELETE_MONITORED_REQUEST:
    case CategoryConstants.EDIT_CATEGORY_MONITORED_REQUEST:
      return {
        ...state,
      };

    case CategoryConstants.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case CategoryConstants.GET_PAGINATE_SUCCESS:
      return {
        ...state,
        listPaginate: action.payload.docs,
        totalDocs: action.payload.totalDocs,
        limit: action.payload.limit,
        totalPages: action.payload.totalPages,
        page: action.payload.page,
        pagingCounter: action.payload.pagingCounter,
        hasPrevPage: action.payload.hasPrevPage,
        hasNextPage: action.payload.hasNextPage,
        prevPage: action.payload.prevPage,
        nextPage: action.payload.nextPage,
      };

    case CategoryConstants.CREATE_CATEGORY_MONITORED_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        listPaginate: [...state.listPaginate, action.payload],
      };

    case CategoryConstants.EDIT_CATEGORY_MONITORED_SUCCESS:
      index = findIndex(state.list, action.payload._id);

      indexPaginate = findIndex(state.listPaginate, action.payload._id);

      if (index !== -1) {
        state.list[index] = action.payload;
      }

      if (indexPaginate !== -1) {
        state.listPaginate[indexPaginate] = action.payload;
      }

      return {
        ...state,
      };

    case CategoryConstants.DELETE_MONITORED_SUCCESS:
      return {
        ...state,
      };

    case CategoryConstants.CAT_MONITORED_SUCCESS:
      return {
        ...state,
        isCatSuccess: action.payload,
      };
    case CategoryConstants.GET_ALL_CATEGORY_FAILURE:
    case CategoryConstants.GET_PAGINATE_FAILURE:
    case CategoryConstants.CREATE_CATEGORY_MONITORED_FAILURE:
    case CategoryConstants.DELETE_MONITORED_FAILURE:
    case CategoryConstants.CAT_MONITORED_FAILURE:
      return {
        ...state,
        isError: action.payload,
      };
    case CategoryConstants.NOTIFICATION_MESSAGE:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
