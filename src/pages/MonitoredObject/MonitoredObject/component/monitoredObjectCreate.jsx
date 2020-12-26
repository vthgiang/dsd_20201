import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WrappedMap from "./map";
import { useParams } from "react-router-dom";
import SuccessNotification from "./SuccessNotification";

import { CategoryActions } from "../../Category/redux/actions";
import { MonitoredObjectConstants } from "../redux/constants";
import { MonitoredObjectActions } from "../redux/actions";

const axios = require("axios");

function MonitoredObjectView({ history }) {
  let { id, option } = useParams();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const user = useSelector((state) => state.user.user);
  const monitoredObjects = useSelector((state) => state.monitoredObjects);
  const {
    isObjectSuccess,
    isObjectFailure,
    objectMessages,
    idMonitoredCreate,
  } = monitoredObjects;
  const [monitoredObject, setMonitoredObject] = useState({
    code: "",
    name: "",
    status: 1,
    description: "",
    managementUnit: null,
    category: null,
    areaMonitored: null,
    parent: "",
    lat: "", //Vĩ độ
    lng: "", //Kinh độ
    height: "",
    drones: null,
    images: null,
    videos: null,
    monitoredZone: "",
  });
  const [formatStyle, setFormatStyle] = useState("");
  const [currentMonitoredZone, setCurrentMonitoredZone] = useState(null);
  const [datazoneAll, setDataZoneAll] = useState([]);
  const [listArea, setListArea] = useState([]);

  const getZoneAll = async () => {
    await axios({
      method: "GET",
      url: `https://monitoredzoneserver.herokuapp.com/monitoredzone`,
      headers: {
        token: localStorage.getItem("token"),
        projectType: localStorage.getItem("project-type"),
      },
    })
      .then((res) => {
        if (res.data) {
          setDataZoneAll(res.data.content.zone);
          localStorage.getItem("token");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getArea = async () => {
    axios
      .get(`https://monitoredzoneserver.herokuapp.com/area?pageSize=1000`)
      .then((res) => {
        setListArea(res.data.content.monitoredArea);
      })
      .catch((error) => console.log(error));
  };
  const postLogMonitorObjectAdd = async () => {
    await axios({
      method: "POST",
      url: `http://it4883logging.herokuapp.com/api/monitor-object/add`,
      data: {
        regionId: monitoredObject.monitoredZone,
        entityId: idMonitoredCreate._id,
        description: "add monitor object",
        authorId: "",
        projectType: localStorage.getItem("project-type"),
        state: "",
        name: monitoredObject.name,
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    dispatch(CategoryActions.getAllCategories());
    dispatch(MonitoredObjectActions.getAllMonitoredObjects());
    getZoneAll();
    getArea();
  }, []);
  useEffect(() => {
    if (isObjectFailure) {
      setFormatStyle("btn btn-danger");
      window.$("#modalSuccessNotification").modal("show");
    }
    if (isObjectSuccess) {
      //gọi log khi tạo đối tượng giám sát thành công
      postLogMonitorObjectAdd();
      setFormatStyle("btn btn-success");
      window.$("#modalSuccessNotification").modal("show");
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
  const handleChange = (event) => {
    event.persist();
    setMonitoredObject((formState) => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleCreateMonitoredObject = () => {
    if (
      currentMonitoredZone &&
      (monitoredObject.height < currentMonitoredZone.minHeight ||
        monitoredObject.height > currentMonitoredZone.maxHeight)
    ) {
      alert(
        `Chọn chiều cao cho đối tượng trong khoảng giá trị từ ${currentMonitoredZone.minHeight} - ${currentMonitoredZone.maxHeight}`
      );
      return;
    }
    dispatch(
      MonitoredObjectActions.createMonitoredObject({
        ...monitoredObject,
        code: "1",
        type: localStorage.getItem("project-type"),
        areaMonitored: null,
        managementUnit: null,
        images: null,
        videos: null,
        status: monitoredObject.status === "" ? "1" : monitoredObject.status,
      })
    );
    setMonitoredObject({
      code: "",
      name: "",
      status: 1,
      description: "",
      managementUnit: null,
      category: "",
      areaMonitored: null,
      parent: "",
      lat: "", //Vĩ độ
      lng: "", //Kinh độ
      height: "",
      drones: "",
      images: null,
      videos: null,
    });
  };

  const getCoodinate = (zone) => {
    setCurrentMonitoredZone(zone);
  };
  const onChangeMonitoredZone = (id) => {
    setMonitoredObject((prev) => ({
      ...prev,
      monitoredZone: id,
    }));
  };

  return (
    <div>
      <div className="header-title mb-3">
        <h5
          className="modal-title mt-3 mb-3"
          style={{ fontSize: "25px", textAlign: "center" }}
        >
          Thêm mới đối tượng giám sát
        </h5>
      </div>
      <div className="content row d-flex justify-content-center">
        <div className="col-9">
          <form>
            <div className="form-group row">
              <label
                htmlFor="inputAreaName"
                className="col-sm-2 col-form-label"
              >
                Tên đối tượng
              </label>
              <div className="col-sm-10">
                <input
                  disabled={option === "view"}
                  className="form-control"
                  id="inputAreaName"
                  placeholder="Tên đối tượng"
                  name="name"
                  value={monitoredObject.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputStatus" className="col-sm-2 col-form-label">
                Trạng thái
              </label>
              <div className="col-sm-10">
                <select
                  disabled={option === "view"}
                  className="custom-select"
                  name="status"
                  value={monitoredObject.status || "null"}
                  onChange={handleChange}
                >
                  <option disabled>Chọn trạng thái</option>
                  <option value="1">Bình thường</option>
                  <option value="2">Đã hỏng</option>
                  <option value="3">Đang được sửa chữa</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputAreaName"
                className="col-sm-2 col-form-label"
              >
                Mô tả
              </label>
              <div className="col-sm-10">
                <input
                  disabled={option === "view"}
                  className="form-control"
                  id="inputAreaName"
                  placeholder="Mô tả cho đối tượng"
                  name="description"
                  value={monitoredObject.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputStatus" className="col-sm-2 col-form-label">
                Danh mục
              </label>
              <div className="col-sm-10">
                <select
                  disabled={option === "view"}
                  className="custom-select"
                  name="category"
                  value={monitoredObject.category || ""}
                  onChange={handleChange}
                >
                  <option disabled>Chọn danh mục</option>
                  {!monitoredObject.category && (
                    <option value="">Chưa có giá trị</option>
                  )}
                  {category &&
                    category.list &&
                    category.list.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputStatus" className="col-sm-2 col-form-label">
                Đối tượng chính
              </label>
              <div className="col-sm-10">
                <select
                  disabled={option === "view"}
                  className="custom-select"
                  name="parent"
                  value={monitoredObject.parent}
                  onChange={handleChange}
                >
                  <option disabled>Chọn đối tượng</option>
                  {!monitoredObject.parent && (
                    <option value="">Chưa có giá trị</option>
                  )}
                  {monitoredObject &&
                    monitoredObjects.list &&
                    monitoredObjects.list.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputStatus" className="col-sm-2 col-form-label">
                Khu vực giám sát
              </label>
              <div className="col-sm-10">
                <select
                  disabled={option === "view"}
                  className="custom-select"
                  name="areaMonitored"
                  value={monitoredObject.areaMonitored}
                  onChange={handleChange}
                >
                  <option disabled>Chọn khu vực giám sát</option>
                  {!monitoredObject.areaMonitored && (
                    <option value="">Chưa có giá trị</option>
                  )}
                  {listArea &&
                    listArea.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      {monitoredObject.areaMonitored && (
        <div className="row mt-5 mb-3">
          <div className="col-4">
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Tọa độ</label>
              <div className="col-sm-10 d-flex">
                {!!monitoredObject.lat || !!monitoredObject.lng ? (
                  <p className="d-flex m-0 justify-content-center align-items-center">
                    Kinh độ: {monitoredObject.lng}
                    <br />
                    Vĩ độ: {monitoredObject.lat}
                  </p>
                ) : (
                  <p className="d-flex m-0 justify-content-center align-items-center">
                    Chưa có giá trị{" "}
                  </p>
                )}
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputAreaNumber"
                className="col-sm-2 col-form-label"
              >
                Miền giám sát
              </label>
              <div className="col-sm-10">
                <select
                  disabled
                  className="custom-select"
                  name="monitoredZone"
                  value={monitoredObject.monitoredZone}
                  onChange={handleChange}
                >
                  {datazoneAll &&
                    datazoneAll.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputAreaNumber"
                className="col-sm-2 col-form-label"
              >
                Chiều cao đối tượng
              </label>
              <div className="col-sm-10">
                <input
                  disabled={option === "view"}
                  className="form-control"
                  placeholder="Chiều cao đối tượng"
                  name="height"
                  value={monitoredObject.height}
                  onChange={handleChange}
                />
                {currentMonitoredZone && (
                  <p className="mt-2">
                    Chọn chiều cao cho đối tượng trong khoảng giá trị từ{" "}
                    {currentMonitoredZone.minHeight} -{" "}
                    {currentMonitoredZone.maxHeight}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-8">
            <WrappedMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA15qz81pHiNfVEV3eeniSNhAu64SsJKgU"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `95vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              onChangeMonitoredZone={onChangeMonitoredZone}
              getCoodinate={(zone) => getCoodinate(zone)}
              monitoredObject={monitoredObject}
              setMonitoredObject={setMonitoredObject}
              option={option}
            />
          </div>
        </div>
      )}

      <div className="footer d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary mr-5"
          data-dismiss="modal"
          onClick={() => {
            history.push({
              pathname: `/monitored-object-management`,
            });
          }}
        >
          Đóng
        </button>
        <button
          type="button"
          className="btn btn-primary"
          data-dismiss="modal"
          onClick={handleCreateMonitoredObject}
        >
          Thêm thông tin
        </button>
      </div>
      <SuccessNotification
        history={history}
        formatStyle={formatStyle}
        messages={objectMessages}
      />
    </div>
  );
}
export default MonitoredObjectView;
