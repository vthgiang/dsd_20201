import { MonitoredObjectConstants } from "./constants";
import { MonitoredObjectServices } from "./services";

export const MonitoredObjectActions = {
  getAllMonitoredObjects,
  // getDetailMonitoredObject,
  createMonitoredObject,
  editMonitoredObject,
  deleteManyMonitoredObjects,
};

function getAllMonitoredObjects(data) {
  if (data === undefined) {
    return (dispatch) => {
      dispatch({
        type: MonitoredObjectConstants.GET_ALL_MONITORED_OBJECT_REQUEST,
      });
      MonitoredObjectServices.getAllMonitoredObjects()
        .then((res) => {
          dispatch({
            type: MonitoredObjectConstants.GET_ALL_MONITORED_OBJECT_SUCCESS,
            payload: res.data.content,
          });
        })
        .catch((err) => {
          dispatch({
            type: MonitoredObjectConstants.GET_ALL_MONITORED_OBJECT_FAILURE,
            error: err,
          });
        });
    };
  } else {
    return (dispatch) => {
      dispatch({
        type: MonitoredObjectConstants.GET_PAGINATE_REQUEST,
      });
      MonitoredObjectServices.getAllMonitoredObjects(data)
        .then((res) => {
          dispatch({
            type: MonitoredObjectConstants.GET_PAGINATE_SUCCESS,
            payload: res.data.content,
          });
        })
        .catch((err) => {
          dispatch({
            type: MonitoredObjectConstants.GET_PAGINATE_FAILURE,
            error: err,
          });
        });
    };
  }
}

function createMonitoredObject(data) {
  return (dispatch) => {
    dispatch({
      type: MonitoredObjectConstants.CREATE_MONITORED_REQUEST,
    });
    MonitoredObjectServices.createMonitoredObject(data)
      .then((res) => {
        dispatch({
          type: MonitoredObjectConstants.CREATE_MONITORED_SUCCESS,
          payload: res.data.content,
        });
        dispatch({
          type: MonitoredObjectConstants.OBJECT_SUCCESS,
          payload: true,
        });
        dispatch({
          type: MonitoredObjectConstants.NOTIFICATION_MESSAGE,
          payload: "Tạo đối tượng giám sát thành công",
        });
      })
      .catch((err) => {
        dispatch({
          type: MonitoredObjectConstants.CREATE_MONITORED_FAILURE,
          error: err,
        });
        dispatch({
          type: MonitoredObjectConstants.OBJECT_FAILURE,
          payload: true,
        });
        dispatch({
          type: MonitoredObjectConstants.NOTIFICATION_MESSAGE,
          payload: "Tạo đối tượng giám sát thất bại",
        });
      });
  };
}

function editMonitoredObject(id, data) {
  return (dispatch) => {
    dispatch({
      type: MonitoredObjectConstants.EDIT_MONITORED_REQUEST,
    });
    MonitoredObjectServices.editMonitoredObject(id, data)
      .then((res) => {
        dispatch({
          type: MonitoredObjectConstants.EDIT_MONITORED_SUCCESS,
          payload: res.data.content,
        });
        dispatch({
          type: MonitoredObjectConstants.OBJECT_SUCCESS,
          payload: true,
        });
        dispatch({
          type: MonitoredObjectConstants.NOTIFICATION_MESSAGE,
          payload: "Chỉnh sửa đối tượng giám sát thành công",
        });
      })
      .catch((err) => {
        dispatch({
          type: MonitoredObjectConstants.EDIT_MONITORED_FAILURE,
          error: err,
        });
        dispatch({
          type: MonitoredObjectConstants.OBJECT_FAILURE,
          payload: true,
        });
        dispatch({
          type: MonitoredObjectConstants.NOTIFICATION_MESSAGE,
          payload: "Chỉnh sửa đối tượng giám sát thất bại",
        });
      });
  };
}

function deleteManyMonitoredObjects(arrayId) {
  return (dispatch) => {
    dispatch({
      type: MonitoredObjectConstants.DELETE_MONITORED_REQUEST,
    });
    MonitoredObjectServices.deleteManyMonitoredObjects(arrayId)
      .then((res) => {
        dispatch({
          type: MonitoredObjectConstants.DELETE_MONITORED_SUCCESS,
          payload: true,
        });
        dispatch({
          type: MonitoredObjectConstants.OBJECT_SUCCESS,
          payload: true,
        });
        dispatch({
          type: MonitoredObjectConstants.NOTIFICATION_MESSAGE,
          payload: "Xóa đối tượng giám sát thành công ",
        });
      })
      .catch((err) => {
        dispatch({
          type: MonitoredObjectConstants.DELETE_MONITORED_FAILURE,
          error: err,
        });
        dispatch({
          type: MonitoredObjectConstants.OBJECT_FAILURE,
          payload: true,
        });
        dispatch({
          type: MonitoredObjectConstants.NOTIFICATION_MESSAGE,
          payload: "Xóa đối tượng giám sát thất bại",
        });
      });
  };
}
