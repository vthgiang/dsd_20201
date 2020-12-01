import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  Rectangle,
} from 'react-google-maps';
import { removeVietnameseTones } from '../../../../helpers/removeVietnameseTones';

import { Input, Form } from 'antd';
import { HeatMapOutlined } from '@ant-design/icons';
const axios = require('axios');
const { Search } = Input;

const Map = ({
  onChangeLocation,
  onChangeMonitoredZone,
  monitoredZoneInit,
}) => {
  const [form] = Form.useForm();
  const [monitoredZonesData, setMonitoredZonesData] = useState(null);
  const [currentMonitoredZone, setCurrentMonitoredZone] = useState(null);
  const [selectedMonitoredZone, setSelectedMonitoredZone] = useState(null);
  const [positionClick, setPositionClick] = useState(null);
  const [searchText, searchTextValue] = useState('');

  useEffect(() => {
    getMonitoredZone();
  }, []);

  const getMonitoredZone = async () => {
    await axios({
      method: 'GET',
      url: `https://monitoredzoneserver.herokuapp.com/area`,
    })
      .then((res) => {
        if (res.data) {
          setMonitoredZonesData(res.data.content.monitoredArea);
          console.log(res.data.content.monitoredArea);

          // khởi tạo park nếu đã có sẵn
          if (monitoredZoneInit) {
            let zone = res.data.content.monitoredArea.find(
              (element) => element._id == monitoredZoneInit,
            );
            if (zone) {
              setPositionClick({
                lat: (zone.startPoint.latitude + zone.endPoint.latitude) / 2,
                lng: (zone.startPoint.longitude + zone.endPoint.longitude) / 2,
              });
              setCurrentMonitoredZone(zone);
            }
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
    // let data = parksData.filter((element) => {
    //   let textElement = removeVietnameseTones(element.name);
    //   let textValue = removeVietnameseTones(value);
    //   if (textElement.includes(textValue)) {
    //     return element;
    //   }
    // });
    // setDataPark(data);
  };

  const handleClickMonitoredZones = (zone, e) => {
    setPositionClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });

    setCurrentMonitoredZone(zone);
  };

  const handleCloseMonitoredZones = () => {
    setCurrentMonitoredZone(null);
  };

  const handleMonitoredZoneChange = (monitoredZone, e) => {
    e.preventDefault();
    if (monitoredZone) {
      onChangeMonitoredZone(monitoredZone._id);
      searchTextValue(monitoredZone.code + ' - ' + monitoredZone.name);
      setSelectedMonitoredZone(monitoredZone._id);
    } else {
      onChangeMonitoredZone(undefined);
      searchTextValue('');
      setSelectedMonitoredZone(undefined);
    }
  };

  return (
    <GoogleMap
      defaultZoom={2}
      // defaultCenter={{ lat: 40.712216, lng: -74.22655 }}
      defaultCenter={{ lat: 57.2959, lng: 176.13119 }}
    >
      <Search
        placeholder="Nhập vào miền giám sát"
        onChange={searchOnChange}
        onSearch={submitSearch}
        enterButton
        style={{ position: 'absolute', top: '10px', left: '10px', width: 250 }}
        value={searchText}
      />
      {/* {monitoredZonesData &&
        monitoredZonesData.map((zone) => (
          <Rectangle
            defaultBounds={
              new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(
                  zone.startPoint.latitude,
                  zone.startPoint.longitude,
                ),
                new window.google.maps.LatLng(
                  zone.endPoint.latitude,
                  zone.endPoint.longitude,
                ),
              )
            }
          />
        ))} */}

      {monitoredZonesData && monitoredZonesData.length && (
        <Rectangle
          defaultBounds={
            new window.google.maps.LatLngBounds(
              new window.google.maps.LatLng(
                monitoredZonesData[1].startPoint.latitude,
                monitoredZonesData[1].startPoint.longitude,
              ),
              new window.google.maps.LatLng(
                monitoredZonesData[1].endPoint.latitude,
                monitoredZonesData[1].endPoint.longitude,
              ),
            )
          }
          onClick={(e) => handleClickMonitoredZones(monitoredZonesData[1], e)}
          options={
            monitoredZoneInit === monitoredZonesData[1]._id ||
            selectedMonitoredZone === monitoredZonesData[1]._id
              ? {
                  strokeColor: '#d34052',
                  fillColor: '#d34052',
                  strokeOpacity: '0.5',
                  strokeWeight: '2',
                }
              : {
                  strokeColor: '#d34052',
                  fillColor: '#70b8fb',
                  strokeOpacity: '0.5',
                  strokeWeight: '2',
                }
          }
        />
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
              <span style={{ color: 'red' }}>
                {currentMonitoredZone.minHeight}
              </span>
              -
              <span style={{ color: 'red' }}>
                {currentMonitoredZone.maxHeight}
              </span>
              (m)
            </div>
            <div
              style={{
                marginTop: '10px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {currentMonitoredZone._id === monitoredZoneInit ||
              currentMonitoredZone._id === selectedMonitoredZone ? (
                <button onClick={(e) => handleMonitoredZoneChange('', e)}>
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
              {/* <button
                onClick={(e) =>
                  handleMonitoredZoneChange(currentMonitoredZone, e)
                }
              >
                <HeatMapOutlined /> &ensp;
                <a>Chọn miền g/s này</a>
              </button> */}
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));
export default WrappedMap;
