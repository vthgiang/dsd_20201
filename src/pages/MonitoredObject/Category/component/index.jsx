import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CatMonitorCreate from './catMonitoredCreate';
import Modals from './modal';
import { Menu, Dropdown, Button } from 'antd';
import Pagination from '@material-ui/lab/Pagination';
import { CategoryActions } from '../redux/actions';
import { CategoryConstants } from '../redux/constants';
import SuccessNotification from './SuccessNotification';
import { Spin } from "antd";

function AreaMonitored(props) {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const {
    listPaginate,
    totalPages,
    isError,
    messages,
    isCatSuccess,
    isLoading,
  } = category;
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });
  const { page, limit } = pagination;
  const [formatStyle, setFormatStyle] = useState('');
  const [itemSearch, setItemSearch] = useState({
    code: '',
    name: '',
  });

  const [option, setOption] = useState('');
  const [catMonitored, setCatMonitored] = useState({
    code: '',
    name: '',
    description: '',
  });
  useEffect(() => {
    dispatch(
      CategoryActions.getAllCategories({
        page,
        limit,
        type: localStorage.getItem("project-type"),
      })
    );
  }, [page]);
  useEffect(() => {}, [listPaginate]);

  useEffect(() => {
    if (isError) {
      setFormatStyle('btn btn-danger');
      window.$('#modalSuccessNotification').modal('show');
    }
    if (isCatSuccess) {
      setFormatStyle('btn btn-success');
      window.$('#modalSuccessNotification').modal('show');
      dispatch(CategoryActions.getAllCategories({ 
        page, 
        limit,
        type: localStorage.getItem("project-type"),
       }));
    }
    dispatch({
      type: CategoryConstants.CAT_MONITORED_FAILURE,
      payload: false,
    });
    dispatch({
      type: CategoryConstants.CAT_MONITORED_SUCCESS,
      payload: false,
    });
  }, [isError, isCatSuccess]);
  const onChangePagination = (event, value) => {
    setPagination({
      ...pagination,
      page: value,
    });
  };
  const handleChange = (event) => {
    event.persist();
    setCatMonitored((formState) => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleCatCreate = () => {
    window.$('#modalCreateCatObject').modal('show');
    setOption('add');
  };
  const handleCatImport = () => {
    window.$('#modalImport').modal('show');
  };

  const handleSubmitSearch = () => {
    dispatch(
      CategoryActions.getAllCategories({
        ...itemSearch,
        page: page,
        limit: limit,
        type: localStorage.getItem("project-type"),
      }),
    );
  };
  const handleACatView = (item) => {
    setCatMonitored(item);
    setOption('view');
    window.$('#modalCreateCatObject').modal('show');
  };
  const handleCatEdit = (item) => {
    setCatMonitored(item);
    setOption('edit');
    window.$('#modalCreateCatObject').modal('show');
  };
  const handleCatDelete = (item) => {
    setCatMonitored(item);
    window.$('#modal').modal('show');
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          data-target="#modalCreateCatObject"
          title="Add area"
          onClick={handleCatCreate}
        >
          Thêm bằng tay
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div id="area-monitored">
      <div className="row" style={{ marginLeft: 10 }}>
        <h3>Quản lý danh mục giám sát</h3>
      </div>
      <div className="box-body">
        <div style={{ marginLeft: '90%' }}>
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
              <b>Tên danh mục</b>
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
              placeholder="Tên danh mục"
              autoComplete="off"
            />
          </div>
          <div className="form-group ml-3">
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
              <th>Tên danh mục</th>
              <th>Mô tả</th>
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
                  <td>{item.description}</td>
                  <td>
                    <a
                      className="text-green"
                      onClick={() => handleACatView(item)}
                    >
                      <i className="material-icons">visibility</i>
                    </a>
                    <a
                      className="text-yellow"
                      onClick={() => handleCatEdit(item)}
                    >
                      <i className="material-icons">edit</i>
                    </a>
                    <a
                      className="text-red"
                      onClick={() => handleCatDelete(item)}
                    >
                      <i className="material-icons">delete</i>
                    </a>
                  </td>
                </tr>
              ))}
            {!isLoading && !!listPaginate && listPaginate.length === 0 && (
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
      </div>
      {/* Modal Thêm mới */}
      <CatMonitorCreate
        value={catMonitored}
        handleChange={handleChange}
        setCatMonitored={setCatMonitored}
        isError={isError}
        messages={messages}
        option={option}
      />

     
      {/* Modal */}
      <Modals value={catMonitored} setCatMonitored={setCatMonitored} />
      <SuccessNotification formatStyle={formatStyle} messages={messages} />
    </div>
  );
}

export default AreaMonitored;
