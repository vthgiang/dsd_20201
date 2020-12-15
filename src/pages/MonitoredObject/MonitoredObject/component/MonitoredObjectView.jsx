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
  const monitoredObjects = useSelector((state) => state.monitoredObjects);
  const { isObjectSuccess, isObjectFailure, objectMessages } = monitoredObjects;
  const [monitoredObject, setMonitoredObject] = useState({
    code: "",
    name: "",
    type: "",
    status: 1,
    description: "",
    managementUnit: null,
    category: null,
    areaMonitored: null,
    parent: "",
    lat: "", //Vĩ độ
    lng: "", //Kinh độ
    height: "",
    drones: "",
    images: null,
    videos: null,
    monitoredZone: "",
  });
  const [formatStyle, setFormatStyle] = useState("");
  const [arrImages, setArrImages] = useState([]);
  const [currentMonitoredZone, setCurrentMonitoredZone] = useState(null);
  const [datazoneAll, setDataZoneAll] = useState([]);

  const getZoneAll = async () => {
    await axios({
      method: "GET",
      url: `https://monitoredzoneserver.herokuapp.com/monitoredzone?page=0`,
    })
      .then((res) => {
        if (res.data) {
          setDataZoneAll(res.data.content.zone);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDetailMonitoredObject = async () => {
    if (id) {
      await axios({
        method: "GET",
        url: `https://dsd05-monitored-object.herokuapp.com/monitored-object/detail-monitored-object/${id}`,
      })
        .then((res) => {
          if (res.data) {
            setMonitoredObject({
              _id: res.data.content._id,
              code: res.data.content.code,
              name: res.data.content.name,
              type: res.data.content.type,
              status: res.data.content.status,
              description: res.data.content.description,
              managementUnit:
                res.data.content.managementUnit &&
                res.data.content.managementUnit._id,
              category:
                res.data.content.category && res.data.content.category._id,
              parent: res.data.content.parent && res.data.content.parent._id,
              lat: res.data.content.lat, //Vĩ độ
              lng: res.data.content.lng, //Kinh độ
              height: res.data.content.height,
              drones: res.data.content.drones,
              images: res.data.content.images,
              videos: res.data.content.videos,
              monitoredZone: res.data.content.monitoredZone,
            });
          }
          getDetailZoneById(res.data.content.monitoredZone);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getImagesMonitored = async () => {
    if (id) {
      await axios({
        method: "GET",
        url: `https://it4483team2.herokuapp.com/api/records/monitored/images/${id}`,
      })
        .then((res) => {
          if (res.data) {
            // res.data.result &&
            //   res.data.result.map((item) => arrImages.push(item.link));
            // console.log(arrImages);
            // setTimeout(
            //   setMonitoredObject((prev) => ({
            //     ...prev,
            //     images: arrImages,
            //   })),
            //   1000
            // );
            setArrImages([
              "https://picsum.photos/id/1018/1000/600/",
              "https://picsum.photos/id/1015/1000/600/",
              "https://picsum.photos/id/1019/1000/600/",
            ]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getVideoMonitored = async () => {
    if (id) {
      await axios({
        method: "GET",
        url: `https://it4483team2.herokuapp.com/api/records/monitored/videos/${id}`,
      })
        .then((res) => {
          if (res.data) {
            setMonitoredObject((prev) => ({
              ...prev,
              videos: res.data.result,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getDetailZoneById = async (payload) => {
    if (payload) {
      await axios({
        method: "GET",
        url: `https://monitoredzoneserver.herokuapp.com/monitoredzone/zoneinfo/${payload}`,
      })
        .then((res) => {
          if (res.data) {
            setCurrentMonitoredZone(res.data.content.zone);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    dispatch(CategoryActions.getAllCategories());
    dispatch(MonitoredObjectActions.getAllMonitoredObjects());
    getZoneAll();
    getDetailMonitoredObject();
    getImagesMonitored();
    getVideoMonitored();
  }, []);
  useEffect(() => {
    if (isObjectFailure) {
      setFormatStyle("btn btn-danger");
      window.$("#modalSuccessNotification").modal("show");
    }
    if (isObjectSuccess) {
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

    if (monitoredObject._id) {
      dispatch(
        MonitoredObjectActions.editMonitoredObject(monitoredObject._id, {
          ...monitoredObject,
          areaMonitored: null,
          managementUnit: null,
          images: null,
          videos: null,
          status: monitoredObject.status === "" ? "1" : monitoredObject.status,
        })
      );
    } else {
      dispatch(
        MonitoredObjectActions.createMonitoredObject({
          ...monitoredObject,
          areaMonitored: null,
          managementUnit: null,
          images: null,
          videos: null,
          status: monitoredObject.status === "" ? "1" : monitoredObject.status,
        })
      );
    }
    setMonitoredObject({
      code: "",
      name: "",
      status: 1,
      description: "",
      managementUnit: null,
      category: "",
      areaMonitored: null,
      parent: "",
      type: "",
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

  let indexImage = 0;
  return (
    <div>
      <div className="header-title mb-5">
        <h5 className="modal-title" id="exampleModalLongTitle">
          {option === "view" && "Xem chi tiết thông tin đối tượng giám sát"}
          {option === "edit" && "Chỉnh sửa thông tin đối tượng giám sát"} 
        </h5>
      </div>
      <div className="content row">
        <div className="col-6">
          <form>
            <div className="form-group row">
              <label
                htmlFor="inputAreaNumber"
                className="col-sm-2 col-form-label"
              >
                Mã đối tượng
              </label>
              <div className="col-sm-10">
                <input
                  disabled={option === "view"}
                  className="form-control"
                  id="inputAreaNumber"
                  placeholder="Mã đối tượng"
                  name="code"
                  value={monitoredObject.code}
                  onChange={handleChange}
                />
              </div>
            </div>
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
                Loại đối tượng
              </label>
              <div className="col-sm-10">
                <select
                  disabled={option === "view"}
                  className="custom-select"
                  name="type"
                  value={monitoredObject.type || ""}
                  onChange={handleChange}
                >
                  <option disabled>Chọn loại đối tượng </option>
                  <option value="DE_DIEU">Đê điều</option>
                  <option value="CHAY_RUNG">Cháy rừng</option>
                  <option value="LUOI_DIEN">Lưới điện</option>
                  <option value="CAY_TRONG">Cây trồng</option>
                  {!monitoredObject.type && (
                    <option value="">Chưa có giá trị</option>
                  )}
                </select>
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
                  {!monitoredObject.status && (
                    <option value="">Chưa có giá trị</option>
                  )}
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
          </form>
        </div>
        <div className="col-6">
          <div className="form-group row">
            <label htmlFor="inputAreaName" className="col-sm-2 col-form-label">
              Hình ảnh
            </label>
            <div className="col-sm-10">
              <div
                id="carousel-example-2"
                className="carousel slide carousel-fade z-depth-1-half"
                data-ride="false"
              >
                <ol className="carousel-indicators">
                  {arrImages.map((item, index) => (
                    <li
                      data-target="#carousel-example-2"
                      data-slide-to={index}
                      className={indexImage === index ? "active" : ""}
                      key={index}
                    ></li>
                  ))}
                </ol>
                <div className="carousel-inner" role="listbox">
                  {arrImages.map((item, index) => (
                    <div
                      className={
                        indexImage === index
                          ? "carousel-item active"
                          : "carousel-item"
                      }
                      key={index}
                    >
                      <div className="view">
                        <img
                          className="d-block w-100"
                          src={item}
                          alt="First slide"
                          height={300}
                        />
                        <div className="mask rgba-black-light"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carousel-example-2"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carousel-example-2"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputAreaName" className="col-sm-2 col-form-label">
              Video
            </label>
            <div className="col-sm-10 ">
              <ul className="d-flex p-0 m-0" style={{ overflow: "auto" }}>
                {monitoredObject.videos &&
                  monitoredObject.videos.map((item, index) => (
                    <li
                      className="mr-3"
                      style={{ listStyle: "none" }}
                      key={index}
                    >
                      <video width="320" height="240" controls>
                        <source src={item.link} type="video/mp4" />
                      </video>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5 mb-3">
        <div className="col-4">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Tọa độ</label>
            <div className="col-sm-10 d-flex">
              {!!monitoredObject.lat || !!monitoredObject.lng ? (
                <p className="d-flex m-0 justify-content-center align-items-center">
                  Kinh độ: {monitoredObject.lng}<br />Vĩ độ: {monitoredObject.lat}
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
          {monitoredObject.monitoredZone && (
            <WrappedMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCV09KQtrmzDnyXYeC_UzB-HAwMKytXRpE"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `95vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              onChangeMonitoredZone={onChangeMonitoredZone}
              id={id}
              getCoodinate={(zone) => getCoodinate(zone)}
              monitoredObject={monitoredObject}
              setMonitoredObject={setMonitoredObject}
              option={option}
            />
          )}
        </div>
      </div>
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
        {option !== "view" && (
          <button
            type="button"
            className="btn btn-primary"
            data-dismiss="modal"
            onClick={handleCreateMonitoredObject}
          >
            {option === "edit" && "Sửa thông tin"}
          </button>
        )}
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
