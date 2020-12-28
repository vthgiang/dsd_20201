import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  Rectangle,
} from "react-google-maps";
import { removeVietnameseTones } from "../../../../helpers/removeVietnameseTones";

import { Input } from "antd";
import { HeatMapOutlined } from "@ant-design/icons";
const axios = require("axios");
const { Search } = Input;

const Map = ({
  onChangeMonitoredZone,
  monitoredZoneInit,
  option,
  monitoredObject,
  setMonitoredObject,
  getCoodinate,
}) => {
  const [monitoredZonesDataInit, setMonitoredZonesDataInit] = useState(null);
  const [monitoredZonesData, setMonitoredZonesData] = useState(null);
  const [currentMonitoredZone, setCurrentMonitoredZone] = useState(null);
  const [selectedMonitoredZone, setSelectedMonitoredZone] = useState([]);
  const [positionClick, setPositionClick] = useState(null);
  const [searchText, searchTextValue] = useState("");
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [initLocation, setInitLocation] = useState({
    lat: 21.017374,
    lng: 105.859521,
  });

  useEffect(() => {
    if (option !== "create") {
      setInitLocation({
        lat: parseFloat(monitoredObject.lat),
        lng: parseFloat(monitoredObject.lng),
      });
      if (monitoredObject.monitoredZone.length > 0) {
        setSelectedMonitoredZone(monitoredObject.monitoredZone);
      }
    }
  }, []);
  useEffect(() => {
    if (monitoredObject.areaMonitored) {
      getMonitoredZone();
    }
  }, [monitoredObject.areaMonitored]);

  const getMonitoredZone = async () => {
    await axios({
      method: "GET",
      url: `https://monitoredzoneserver.herokuapp.com/monitoredzone/area/${monitoredObject.areaMonitored}`,
      headers: {
        token: localStorage.getItem("token"),
        projectType: localStorage.getItem("project-type"),
      },
    })
      .then((res) => {
        if (res.data) {
          setMonitoredZonesData(res.data.content.zone);
          setMonitoredZonesDataInit(res.data.content.zone);
          //Khởi tạo render ban đầu
          setSelectedMonitoredZone(res.data.content.zone);
          if (res.data.content.zone) {
            setInitLocation({
              lat: parseFloat(res.data.content.zone[0].startPoint.latitude),
              lng: parseFloat(res.data.content.zone[0].startPoint.longitude),
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchOnChange = (e) => {
    searchTextValue(e.target.value);
  };

  const submitSearch = (value) => {
    let data = monitoredZonesDataInit.filter((element) => {
      let textElement = removeVietnameseTones(element.name);
      let textValue = removeVietnameseTones(value);
      if (textElement.includes(textValue)) {
        return element;
      }
    });
    setMonitoredZonesData(data);
  };

  const handleClickMonitoredZones = (zone, e) => {
    setPositionClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    getCoodinate(zone);
    if (selectedMonitoredZone && selectedMonitoredZone.indexOf(zone._id) >= 0) {
      setMonitoredObject((prev) => ({
        ...prev,
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }));
    } else {
      setCurrentMonitoredZone(zone);
    }
  };

  const handleCloseMonitoredZones = () => {
    setCurrentMonitoredZone(null);
  };

  const handleMonitoredZoneChange = (monitoredZone, e) => {
    e.preventDefault();
    if (monitoredZone) {
      onChangeMonitoredZone(monitoredZone._id);
      searchTextValue(monitoredZone.code + " - " + monitoredZone.name);
      let arr = [monitoredZone._id];
      setSelectedMonitoredZone(arr);
    } else {
      onChangeMonitoredZone(undefined);
      searchTextValue("");
      setSelectedMonitoredZone([]);
    }
  };
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={
        option !== "create" && monitoredObject.lat
          ? {
              lat: parseFloat(monitoredObject.lat),
              lng: parseFloat(monitoredObject.lng),
            }
          : initLocation
      }
    >
      <Search
        placeholder="Nhập vào miền giám sát"
        onChange={searchOnChange}
        onSearch={submitSearch}
        enterButton
        style={{ position: "absolute", top: "50px", right: "55px", width: 250 }}
        value={searchText}
      />
      {monitoredZonesData &&
        monitoredZonesData.map((zone, index) => (
          <Rectangle
            key={index}
            defaultBounds={
              new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(
                  zone.startPoint.latitude,
                  zone.startPoint.longitude
                ),
                new window.google.maps.LatLng(
                  zone.endPoint.latitude,
                  zone.endPoint.longitude
                )
              )
            }
            onClick={(e) =>
              option === "view" ? null : handleClickMonitoredZones(zone, e)
            }
            options={
              selectedMonitoredZone &&
              selectedMonitoredZone.indexOf(zone._id) >= 0
                ? {
                    strokeColor: "#d34052",
                    fillColor: "#d34052",
                    strokeOpacity: "0.5",
                    strokeWeight: "2",
                  }
                : {
                    strokeColor: "#d34052",
                    fillColor: "#70b8fb",
                    strokeOpacity: "0.5",
                    strokeWeight: "2",
                  }
            }
          />
        ))}
      {monitoredObject && (
        <Marker
          name="Paris"
          position={{
            lat: parseFloat(monitoredObject.lat),
            lng: parseFloat(monitoredObject.lng),
          }}
          onClick={() => {
            setSelectedMonitor({
              lat: parseFloat(monitoredObject.lat),
              lng: parseFloat(monitoredObject.lng),
            });
          }}
        />
      )}
      {selectedMonitor && (
        <InfoWindow
          position={{
            lat: selectedMonitor.lat,
            lng: selectedMonitor.lng,
          }}
          onCloseClick={() => setSelectedMonitor(null)}
        >
          <p>{monitoredObject.name}</p>
        </InfoWindow>
      )}

      {currentMonitoredZone && (
        <InfoWindow
          position={{
            lat: positionClick.lat,
            lng: positionClick.lng,
          }}
          onCloseClick={() => {
            handleCloseMonitoredZones();
          }}
        >
          <div>
            <h3>{currentMonitoredZone.name}</h3>
            <div>Mã miền g/s: {currentMonitoredZone.code}</div>
            <div>
              Độ cao an toàn: &ensp;
              <span style={{ color: "red" }}>
                {currentMonitoredZone.minHeight}
              </span>
              -
              <span style={{ color: "red" }}>
                {currentMonitoredZone.maxHeight}
              </span>
              (m)
            </div>
            <div
              style={{
                marginTop: "10px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {selectedMonitoredZone.indexOf(currentMonitoredZone._id) >= 0 ? (
                <button onClick={(e) => handleMonitoredZoneChange("", e)}>
                  <HeatMapOutlined /> &ensp;
                  <a>Bỏ chọn miền g/s này</a>
                </button>
              ) : (
                <button
                  onClick={(e) =>
                    handleMonitoredZoneChange(currentMonitoredZone, e)
                  }
                >
                  <HeatMapOutlined /> &ensp;
                  <a>Chọn miền g/s này</a>
                </button>
              )}
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));
export default WrappedMap;
