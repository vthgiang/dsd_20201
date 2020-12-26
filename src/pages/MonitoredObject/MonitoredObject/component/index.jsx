import React, { useEffect, useState } from 'react';
import { withTranslate } from 'react-redux-multilingual';
import MultiSelect from 'react-multi-select-component';
import AreaMonitorImport from './areaMonitoredImport';
import Modals from './modal';
import { Menu, Dropdown, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { MonitoredObjectActions } from '../redux/actions';
import Pagination from '@material-ui/lab/Pagination';
import SuccessNotification from './SuccessNotification';
import { MonitoredObjectConstants } from '../redux/constants';

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
  const handleAreaImport = () => {
    window.$('#modalImport').modal('show');
  };

  const handleMonitoredDelete = (item) => {
    setSelectItemDelete(item);
    window.$('#modal').modal('show');
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
      <Menu.Item>
        <a
          data-target="#modalImport"
          title="ImportForm"
          onClick={() => handleAreaImport()}
        >
          Import File
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
        <div style={{ marginLeft: '90%' }}>
          <Dropdown overlay={menu} placement="bottomLeft" arrow>
            <Button
              type="button"
              className="btn btn-success"
              style={{ borderRadius: 4, width: 90.64, height: 36 }}
            >
              Thêm mới
            </Button>
          </Dropdown>
        </div>
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
            <label className="form-control-static" style={{ margin: '10px' }}>
              <b>Trạng thái</b>
            </label>
            <MultiSelect
              id={`select-multi-status`}
              style={{ width: '100%' }}
              options={[
                { label: 'Bình thường', value: '1' },
                { label: 'Đã hỏng', value: '2' },
                { label: 'Đang được sửa chữa', value: '3' },
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

export default withTranslate(AreaMonitored);
