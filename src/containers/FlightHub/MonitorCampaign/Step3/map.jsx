import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import { removeVietnameseTones } from '../../../../helpers/removeVietnameseTones';
import parksData from './data.json';

import { Input } from 'antd';
const { Search } = Input;

const Map = ({ onChangeLocation, parkIdInit }) => {
  const [selectedPark, setSelectedPark] = useState(null);
  const [searchText, searchTextValue] = useState('');
  const [dataPark, setDataPark] = useState([]);

  useEffect(() => {
    setDataPark(parksData);

    //khởi tạo park nếu đã có sẵn
    if (parkIdInit) {
      let park = parksData.find((element) => element.PARK_ID == parkIdInit);
      handleParkChange(park);
    }
  }, []);

  const searchOnChange = (e) => {
    searchTextValue(e.target.value);
  };

  const submitSearch = (value) => {
    let data = parksData.filter((element) => {
      let textElement = removeVietnameseTones(element.name);
      let textValue = removeVietnameseTones(value);
      if (textElement.includes(textValue)) {
        return element;
      }
    });

    setDataPark(data);
  };

  const handleParkChange = (park) => {
    setSelectedPark(park);
    searchTextValue(park.name);
    onChangeLocation(park);
  };

  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 21.003943, lng: 105.842716 }}
    >
      <Search
        placeholder="Nhập vào miền giám sát"
        onChange={searchOnChange}
        onSearch={submitSearch}
        enterButton
        style={{ position: 'absolute', top: '10px', left: '10px', width: 250 }}
        value={searchText}
      />
      {dataPark.map((park) => (
        <Marker
          key={park.PARK_ID}
          position={{
            lat: park.geometry.coordinates[0],
            lng: park.geometry.coordinates[1],
          }}
          onClick={() => handleParkChange(park)}
        />
      ))}
      {selectedPark && (
        <InfoWindow
          position={{
            lat: selectedPark.geometry.coordinates[0],
            lng: selectedPark.geometry.coordinates[1],
          }}
          onCloseClick={() => {
            setSelectedPark(null);
          }}
        >
          <div>
            <h3>{selectedPark.name}</h3>
            <div>Vĩ độ: {selectedPark.geometry.coordinates[0]}</div>
            <div>Kinh độ: {selectedPark.geometry.coordinates[1]}</div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));
export default WrappedMap;
