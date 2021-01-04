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

function MonitorObjectHistory({ formatStyle, messages, history }) {
  const axios = require("axios");
  const onChangePage = () => {
    if (history) {
      history.push({
        pathname: `/monitored-object-management`,
      });
    }
  };
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
  const onChangePagination = (event, value) => {
    setPagination({
      ...pagination,
      page: value,
    });
  };
  return (
    <div
      className="modal fade"
      id="modalhistory"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Lịch sử sự cố của đối tượng giám sát
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="box-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sự cố</th>
                  <th>Hành động</th>
                  <th>Thời gian</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {!!listPaginate &&
                  listPaginate.length > 0 &&
                  listPaginate.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>   </td>
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
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className={formatStyle}
              data-dismiss="modal"
              onClick={onChangePage}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MonitorObjectHistory;
