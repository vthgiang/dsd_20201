// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import WrappedMap from '../MonitoredObject/MonitoredObject/component/map';
// import { useParams } from 'react-router-dom';

// import { CategoryActions } from '../MonitoredObject/Category/redux/actions';



import React, { useEffect, useState } from 'react';
import { withTranslate } from 'react-redux-multilingual';
import MultiSelect from 'react-multi-select-component';
import AreaMonitorImport from '../MonitoredObject/MonitoredObject/component/areaMonitoredImport';
import Modals from '../MonitoredObject/MonitoredObject/component/modal';
import { Menu, Dropdown, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { MonitoredObjectActions } from '../MonitoredObject/MonitoredObject/redux/actions';
import Pagination from '@material-ui/lab/Pagination';
import SuccessNotification from '../MonitoredObject/MonitoredObject/component/SuccessNotification';
import { MonitoredObjectConstants } from '../MonitoredObject/MonitoredObject/redux/constants';

export default function StatisticObjectMonitor(props) {
  const { history } = props;
  const dispatch = useDispatch();
  const monitoredObjects = useSelector((state) => state.monitoredObjects);
  const {
    listPaginate,
    totalPages,
    isObjectSuccess,
    isObjectFailure,
    objectMessages,
    totalDocs,
  } = monitoredObjects;
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });
  const { page, limit } = pagination;
  const [formatStyle, setFormatStyle] = useState('');
  const [selected, setSelected] = useState([]);
  const [selectItemDelete, setSelectItemDelete] = useState({});
  const [itemSearch, setItemSearch] = useState({
    code: '',
    name: '',
    status: [],
  });
  const [numberObject, setNumberObject] = useState();

  useEffect(() => {
    dispatch(MonitoredObjectActions.getAllMonitoredObjects({ page, limit }));
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
    setNumberObject(monitoredObjects.totalDocs);
    if (isObjectFailure) {
      setFormatStyle('btn btn-danger');
      window.$('#modalSuccessNotification').modal('show');
    }
    if (isObjectSuccess) {
      setFormatStyle('btn btn-success');
      window.$('#modalSuccessNotification').modal('show');
      dispatch(MonitoredObjectActions.getAllMonitoredObjects({ page, limit }));
    }
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
      }),
      setNumberObject(monitoredObjects.totalDocs)
    );
  };
  const onChangePagination = (event, value) => {
    setPagination({
      ...pagination,
      page: value,
    });
  };
  const handleMonitoredView = (item) => {
    history.push({
      pathname: `/monitored-object-management/view/${item._id}`,
    });
  };

  return (
    <div id="area-monitored">
      <div className="row" style={{ marginLeft: 10 }}>
        <h3 className="mt-3">Thống kê đối tượng giám sát</h3>
      </div>
      <div className="box-body">
        <div className="form-inline" style={{ margin: '15px' }}>
          <div className="form-group" style={{ marginRight: '30px' }}>
            <label className="form-control-static" style={{ margin: '10px' }}>
              <b>Mã đối tượng</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="code"
              value={itemSearch.code}
              onChange={(e) => {
                e.persist();
                setItemSearch((prev) => ({
                  ...prev,
                  code: e.target.value,
                }));
              }}
              placeholder="Mã đối tượng"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label className="form-control-static" style={{ margin: '10px' }}>
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
        </div>
        <div className="form-inline" style={{ margin: '15px' }}>
          <div className="form-group" style={{ marginRight: '15px' }}>
            <label className="form-control-static" style={{ margin: '10px', marginLeft: '38px' }}>
              <b>Trạng thái</b>
            </label>
            <div style={{ width: '220px' }}>
              <MultiSelect
                id={`select-multi-status`}
                style={{ width: '200px' }}
                options={[
                  { label: 'Bình thường', value: '1' },
                  { label: 'Đã hỏng', value: '2' },
                  { label: 'Đang được sửa chữa', value: '3' },
                ]}
                value={selected}
                onChange={setSelected}
              />
            </div>

          </div>
          <div className="form-group" style={{ marginLeft: '20px' }}>
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
        <h3 className="mt-5 mb-3 ml-3">Có tất cả: {totalDocs} Objects</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã đối tượng</th>
              <th>Tên đối tượng</th>
              <th>Trạng thái</th>
              <th>Mô tả</th>
              <th>Thuộc danh mục</th>
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
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td style={{ color: 'green' }}>
                    {item.status === 1 ? 'Bình thường' : 'Đang được sửa chữa'}
                  </td>
                  <td>{item.description}</td>
                  <td>
                    {!!item.category ? item.category.name : 'Chưa có giá trị'}
                  </td>
                  <td>
                    {!!item.areaMonitored
                      ? item.areaMonitored.name
                      : 'Chưa có giá trị'}
                  </td>
                  <td>
                    <a
                      className="text-green"
                      onClick={() => handleMonitoredView(item)}
                    >
                      Chi tiết
                    </a>
                  </td>
                </tr>
              ))}
            {!!listPaginate && listPaginate.length === 0 && (
              <tr>Không có dữ liệu</tr>
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
      {/* Modal Import */}
      <AreaMonitorImport />
      {/* Modal Delete */}
      <Modals value={selectItemDelete} />
      <SuccessNotification
        formatStyle={formatStyle}
        messages={objectMessages}
      />
    </div>
  );
}

