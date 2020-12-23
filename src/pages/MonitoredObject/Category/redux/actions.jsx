import { CategoryConstants } from "./constants";
import { CategoryServices } from "./services";

export const CategoryActions = {
  getAllCategories,
  createCategory,
  editCategory,
  deleteManyCategories,
};

function getAllCategories(data) {
  if (data === undefined) {
    return (dispatch) => {
      dispatch({
        type: CategoryConstants.GET_ALL_CATEGORY_REQUEST,
      });
      CategoryServices.getAllCategories()
        .then((res) => {
          dispatch({
            type: CategoryConstants.GET_ALL_CATEGORY_SUCCESS,
            payload: res.data.content,
          });
        })
        .catch((err) => {
          dispatch({
            type: CategoryConstants.GET_ALL_CATEGORY_FAILURE,
            error: err,
          });
        });
    };
  } else {
    return (dispatch) => {
      dispatch({
        type: CategoryConstants.GET_PAGINATE_REQUEST,
      });
      CategoryServices.getAllCategories(data)
        .then((res) => {
          dispatch({
            type: CategoryConstants.GET_PAGINATE_SUCCESS,
            payload: res.data.content,
          });
        })
        .catch((err) => {
          dispatch({
            type: CategoryConstants.GET_PAGINATE_FAILURE,
            error: err,
          });
        });
    };
  }
}

function createCategory(data) {
  return (dispatch) => {
    dispatch({
      type: CategoryConstants.CREATE_CATEGORY_MONITORED_REQUEST,
    });
    CategoryServices.createCategory(data)
      .then((res) => {
        dispatch({
          type: CategoryConstants.CREATE_CATEGORY_MONITORED_SUCCESS,
          payload: res.data.content,
        });
        dispatch({
          type: CategoryConstants.CAT_MONITORED_SUCCESS,
          payload: true,
        });
        dispatch({
          type: CategoryConstants.NOTIFICATION_MESSAGE,
          payload: "Tạo mới danh mục đối tượng giám sát thành công",
        });
      })
      .catch((err) => {
        dispatch({
          type: CategoryConstants.CAT_MONITORED_FAILURE,
          payload: true,
        });
        dispatch({
          type: CategoryConstants.NOTIFICATION_MESSAGE,
          payload: "Tạo danh mục đối tượng giám sát thất bại",
        });
      });
  };
}

function editCategory(id, data) {
  return (dispatch) => {
    dispatch({
      type: CategoryConstants.EDIT_CATEGORY_MONITORED_REQUEST,
    });
    CategoryServices.editCategory(id, data)
      .then((res) => {
        dispatch({
          type: CategoryConstants.EDIT_CATEGORY_MONITORED_SUCCESS,
          payload: res.data.content,
        });
        dispatch({
          type: CategoryConstants.CAT_MONITORED_SUCCESS,
          payload: true,
        });
        dispatch({
          type: CategoryConstants.NOTIFICATION_MESSAGE,
          payload: "Chỉnh sửa danh mục đối tượng giám sát thành công",
        });
      })
      .catch((err) => {
        dispatch({
          type: CategoryConstants.CAT_MONITORED_FAILURE,
          payload: true,
        });
        dispatch({
          type: CategoryConstants.NOTIFICATION_MESSAGE,
          payload: "Chỉnh sửa danh mục đối tượng giám sát thất bại",
        });
      });
  };
}

function deleteManyCategories(arrayId) {
  return (dispatch) => {
    dispatch({
      type: CategoryConstants.DELETE_MONITORED_REQUEST,
    });
    CategoryServices.deleteManyCategories(arrayId)
      .then((res) => {
        dispatch({
          type: CategoryConstants.DELETE_MONITORED_SUCCESS,
          payload: res.data.content,
        });
        dispatch({
          type: CategoryConstants.CAT_MONITORED_SUCCESS,
          payload: true,
        });
        dispatch({
          type: CategoryConstants.NOTIFICATION_MESSAGE,
          payload: "Xóa danh mục đối tượng giám sát thành công",
        });
      })
      .catch((err) => {
        dispatch({
          type: CategoryConstants.DELETE_MONITORED_FAILURE,
          error: err,
        });
        dispatch({
          type: CategoryConstants.CAT_MONITORED_SUCCESS,
          payload: true,
        });
        dispatch({
          type: CategoryConstants.NOTIFICATION_MESSAGE,
          payload: "Xóa danh mục đối tượng giám sát thành công",
        });
      });
  };
}
