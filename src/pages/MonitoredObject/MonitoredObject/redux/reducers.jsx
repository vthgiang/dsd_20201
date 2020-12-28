import { MonitoredObjectConstants } from "./constants";

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
  list: [],
  listPaginate: [],
  totalDocs: 0,
  limit: 0,
  totalPages: 0,
  page: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: 0,
  nextPage: 0,
  isObjectSuccess: false,
  isObjectFailure: false,
  objectMessages: "",
  isDeleteMonitored: false,
  idMonitoredCreate: "",
  isLoading: false,
};

export function monitoredObjects(state = initialState, action) {
  var index = -1;
  var indexPaginate = -1;

  switch (action.type) {
    case MonitoredObjectConstants.GET_ALL_MONITORED_OBJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case MonitoredObjectConstants.GET_PAGINATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case MonitoredObjectConstants.CREATE_MONITORED_REQUEST:
    case MonitoredObjectConstants.DELETE_MONITORED_REQUEST:
    case MonitoredObjectConstants.EDIT_MONITORED_REQUEST:
      return {
        ...state,
      };

    case MonitoredObjectConstants.GET_ALL_MONITORED_OBJECT_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };

    case MonitoredObjectConstants.GET_PAGINATE_SUCCESS:
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
        isLoading: false,
      };

    case MonitoredObjectConstants.CREATE_MONITORED_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        listPaginate: [...state.listPaginate, action.payload],
        idMonitoredCreate: action.payload,
      };
    case MonitoredObjectConstants.OBJECT_SUCCESS:
      return {
        ...state,
        isObjectSuccess: action.payload,
      };

    case MonitoredObjectConstants.EDIT_MONITORED_SUCCESS:
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

    case MonitoredObjectConstants.DELETE_MONITORED_SUCCESS:
      // state.list = state.list.filter(
      //   (item) => action.payload.includes(item._id) === false
      // );
      // state.listPaginate = state.listPaginate.filter(
      //   (item) => action.payload.includes(item._id) === false
      // );
      return {
        ...state,
        isDeleteMonitored: action.payload,
      };
    case MonitoredObjectConstants.OBJECT_FAILURE:
      return {
        ...state,
        isObjectFailure: action.payload,
      };
    case MonitoredObjectConstants.GET_ALL_MONITORED_OBJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case MonitoredObjectConstants.GET_PAGINATE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case MonitoredObjectConstants.CREATE_MONITORED_FAILURE:
    case MonitoredObjectConstants.DELETE_MONITORED_FAILURE:
    case MonitoredObjectConstants.GET_ALL_MONITORED_OBJECT_FAILURE:
      return {
        ...state,
      };
    case MonitoredObjectConstants.NOTIFICATION_MESSAGE:
      return {
        ...state,
        objectMessages: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
