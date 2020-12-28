import React, { useEffect, useState } from "react";
import { withTranslate } from "react-redux-multilingual";
import MultiSelect from "react-multi-select-component";
import Modals from "./modal";
import { Menu, Dropdown, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MonitoredObjectActions } from "../redux/actions";
import Pagination from "@material-ui/lab/Pagination";
import SuccessNotification from "./SuccessNotification";
import { MonitoredObjectConstants } from "../redux/constants";
import { Spin } from "antd";

const axios = require("axios");

function AreaMonitored(props) {
  const { history } = props;
  const dispatch = useDispatch();
  const monitoredObjects = useSelector((state) => state.monitoredObjects);
  const {
    listPaginate,
    totalPages,
    isObjectSuccess,
    isObjectFailure,
    objectMessages,
    isDeleteMonitored,
    isLoading,
  } = monitoredObjects;
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });
  const { page, limit } = pagination;
  const [formatStyle, setFormatStyle] = useState("");
  const [selected, setSelected] = useState([]);
  const [selectItemDelete, setSelectItemDelete] = useState({});
  const [itemSearch, setItemSearch] = useState({
    code: "",
    name: "",
    status: [],
  });

  const postLogMonitorObjectDelete = async () => {
    await axios({
      method: "POST",
      url: `http://it4883logging.herokuapp.com/api/monitor-object/delete`,
      data: {
        regionId: selectItemDelete.monitoredZone,
        entityId: selectItemDelete._id,
        description: "delete monitor object",
        authorId: "",
        projectType: localStorage.getItem("project-type"),
        state: "",
        name: selectItemDelete.name,
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    dispatch(
      MonitoredObjectActions.getAllMonitoredObjects({
        page,
        limit,
        type: localStorage.getItem("project-type"),
      })
    );
  }, [page]);
  useEffect(() => {
    let arr = [];
    selected.map((item) => arr.push(item.value));
    setItemSearch((prev) => ({
      ...prev,
      status: arr,
    }));
  }, [selected]);
  useEffect(() => {
    if (isObjectFailure) {
      setFormatStyle("btn btn-danger");
      window.$("#modalSuccessNotification").modal("show");
    }
    if (isObjectSuccess) {
      setFormatStyle("btn btn-success");
      window.$("#modalSuccessNotification").modal("show");
      dispatch(MonitoredObjectActions.getAllMonitoredObjects({ page, limit,type: localStorage.getItem("project-type"), }));
    }
    if (isDeleteMonitored) {
      //gọi log khi xóa đối tượng giám sát
      postLogMonitorObjectDelete();
      setFormatStyle("btn btn-success");
      window.$("#modalSuccessNotification").modal("show");
      dispatch(MonitoredObjectActions.getAllMonitoredObjects({ page, limit,type: localStorage.getItem("project-type"), }));
    }
    dispatch({
      type: MonitoredObjectConstants.DELETE_MONITORED_SUCCESS,
      payload: false,
    });
    dispatch({
      type: MonitoredObjectConstants.OBJECT_FAILURE,
      payload: false,
    });
    dispatch({
      type: MonitoredObjectConstants.OBJECT_SUCCESS,
      payload: false,
    });
  }, [isObjectSuccess, isObjectFailure]);

  const handleSubmitSearch = () => {
    dispatch(
      MonitoredObjectActions.getAllMonitoredObjects({
        ...itemSearch,
        page: page,
        limit: limit,
        type: localStorage.getItem("project-type"),
      })
    );
  };
  const onChangePagination = (event, value) => {
    setPagination({
      ...pagination,
      page: value,
    });
  };
  const handleAreaCreate = () => {
    history.push({
      pathname: `/monitored-object-management/create`,
    });
  };
  const handleMonitoredEdit = (item) => {
    history.push({
      pathname: `/monitored-object-management/edit/${item._id}`,
    });
  };
  const handleMonitoredView = (item) => {
    history.push({
      pathname: `/monitored-object-management/view/${item._id}`,
    });
  };

  const handleMonitoredDelete = (item) => {
    setSelectItemDelete(item);
    window.$("#modal").modal("show");
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          data-target="#modalCreate"
          title="Add area"
          onClick={() => handleAreaCreate()}
        >
          Thêm bằng tay
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div id="area-monitored">
      <div className="row" style={{ marginLeft: 10 }}>
        <h3>Quản lý đối tượng giám sát</h3>
      </div>
      <div className="box-body">
        <div style={{ marginLeft: "90%" }}>
          <Dropdown overlay={menu} placement="bottomLeft" arrow>
            <Button
              type="button"
              className="btn btn-success"
              style={{ borderRadius: 4, height: 36 }}
            >
              Thêm mới
            </Button>
          </Dropdown>
        </div>
        <div className="form-inline" style={{ margin: "15px" }}>
          <div className="form-group">
            <label className="form-control-static" style={{ margin: "10px" }}>
              <b>Tên đối tượng</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={itemSearch.name}
              onChange={(e) => {
                e.persist();
                setItemSearch((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              placeholder="Tên đối tượng"
              autoComplete="off"
            />
          </div>
          <div className="form-group" style={{ marginRight: "15px" }}>
            <label className="form-control-static" style={{ margin: "10px" }}>
              <b>Trạng thái</b>
            </label>
            <MultiSelect
              id={`select-multi-status`}
              style={{ width: "100%" }}
              options={[
                { label: "Bình thường", value: "1" },
                { label: "Đã hỏng", value: "2" },
                { label: "Đang được sửa chữa", value: "3" },
              ]}
              value={selected}
              onChange={setSelected}
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-success"
              title="Tìm kiếm"
              onClick={handleSubmitSearch}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên đối tượng</th>
              <th>Trạng thái</th>
              <th>Mô tả</th>
              <th>Đối tượng liên kết</th>
              <th>Thuộc khu vực</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {!!listPaginate &&
              listPaginate.length > 0 &&
              listPaginate.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td style={{ color: "green" }}>
                    {item.status === 1 ? "Bình thường" : "Đang được sửa chữa"}
                  </td>
                  <td>{item.description}</td>
                  <td>
                    {!!item.category ? item.category.name : "Chưa có giá trị"}
                  </td>
                  <td>
                    {!!item.areaMonitored
                      ? item.areaMonitored.name
                      : "Chưa có giá trị"}
                  </td>
                  <td>
                    <a
                      className="text-green"
                      onClick={() => handleMonitoredView(item)}
                    >
                      <i className="material-icons">visibility</i>
                    </a>
                    <a
                      className="text-yellow"
                      onClick={() => handleMonitoredEdit(item)}
                    >
                      <i className="material-icons">edit</i>
                    </a>
                    <a
                      className="text-red"
                      onClick={() => handleMonitoredDelete(item)}
                    >
                      <i className="material-icons">delete</i>
                    </a>
                  </td>
                </tr>
              ))}
            {!isLoading && listPaginate && listPaginate.length === 0 && (
              <tr>Không có dữ liệu</tr>
            )}
            {isLoading && (
              <tr style={{ margin: "15px auto" }}>
                <td colSpan="7">
                  <Spin size="large" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          count={totalPages}
          page={page}
          onChange={onChangePagination}
        />
        ;
      </div>
      {/* Modal Delete */}
      <Modals value={selectItemDelete} />
      <SuccessNotification
        formatStyle={formatStyle}
        messages={objectMessages}
      />
    </div>
  );
}

export default withTranslate(AreaMonitored);
