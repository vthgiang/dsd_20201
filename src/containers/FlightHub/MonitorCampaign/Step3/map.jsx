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
import parksData from './data.json';

import { Input } from 'antd';
import { HeatMapOutlined } from '@ant-design/icons';
const axios = require('axios');
const { Search } = Input;

const Map = ({ onChangeLocation, parkIdInit }) => {
  const [monitoredZones, setMonitoredZones] = useState(null);
  const [selectedMonitoredZone, setSelectedMonitoredZone] = useState(null);
  const [positionClick, setPositionClick] = useState(null);
  const [searchText, searchTextValue] = useState('');

  useEffect(() => {
    // setDataPark(parksData);

    //khởi tạo park nếu đã có sẵn
    // if (parkIdInit) {
    //   let park = parksData.find((element) => element.PARK_ID == parkIdInit);
    //   handleParkChange(park);
    // }

    getMonitoredZone();
  }, []);

  const getMonitoredZone = async () => {
    await axios({
      method: 'GET',
      url: `https://monitoredzoneserver.herokuapp.com/area`,
    })
      .then((res) => {
        if (res.data) {
          setMonitoredZones(res.data.content.monitoredArea);
          console.log(res.data.content.monitoredArea);
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
    let data = parksData.filter((element) => {
      let textElement = removeVietnameseTones(element.NAME);
      let textValue = removeVietnameseTones(value);
      if (textElement.includes(textValue)) {
        return element;
      }
    });

    // setDataPark(data);
  };

  const handleParkChange = (park) => {
    // setSelectedPark(park);
    searchTextValue(park.NAME);
    onChangeLocation(park);
  };

  const handleClickMonitoredZones = (zone, e) => {
    setPositionClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setSelectedMonitoredZone(zone);
  };

  const handleCloseMonitoredZones = () => {
    setSelectedMonitoredZone(null);
  };

  return (
    <GoogleMap
      defaultZoom={0}
      defaultCenter={{ lat: 40.712216, lng: -74.22655 }}
    >
      <Search
        placeholder="Nhập vào miền giám sát"
        onChange={searchOnChange}
        onSearch={submitSearch}
        enterButton
        style={{ position: 'absolute', top: '10px', left: '10px', width: 250 }}
        value={searchText}
      />
      {/* {monitoredZones &&
        monitoredZones.map((zone) => (
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

      {monitoredZones && (
        <Rectangle
          defaultBounds={
            new window.google.maps.LatLngBounds(
              new window.google.maps.LatLng(
                monitoredZones[0].startPoint.latitude,
                monitoredZones[0].startPoint.longitude,
              ),
              new window.google.maps.LatLng(
                monitoredZones[0].endPoint.latitude,
                monitoredZones[0].endPoint.longitude,
              ),
            )
          }
          onClick={(e) => handleClickMonitoredZones(monitoredZones[0], e)}
        />
      )}

      {selectedMonitoredZone && (
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
            <h3>{selectedMonitoredZone.name}</h3>
            <div>Mã miền g/s: {selectedMonitoredZone.code}</div>
            <div>
              Độ cao an toàn: &ensp;
              <span style={{ color: 'red' }}>
                {selectedMonitoredZone.minHeight}
              </span>
              -
              <span style={{ color: 'red' }}>
                {selectedMonitoredZone.maxHeight}
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
              <button>
                <HeatMapOutlined /> &ensp;
                <a>Chọn miền g/s này</a>
              </button>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));
export default WrappedMap;
