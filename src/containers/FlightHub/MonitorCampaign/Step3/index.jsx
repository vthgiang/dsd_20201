import React, { useEffect, useState } from 'react';
import StyleStep3 from './index.style';
import { Button, Col, Form, Select, Row } from 'antd';
import { VALIDATE_MESSAGES, LAYOUT } from '../config';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import parksData from './data.json';

const { Option } = Select;

const Map = (props) => {
  const [selectedPark, setSelectedPark] = useState(null);
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 21.003943, lng: 105.842716 }}
    >
      {parksData.map((park) => (
        <Marker
          key={park.PARK_ID}
          position={{
            lat: park.geometry.coordinates[0],
            lng: park.geometry.coordinates[1],
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
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
        />
      )}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const Step3 = ({ nextStep, prevStep, data, handleChangeData }) => {
  const [form] = Form.useForm();
  const [isMarkerShown, setIsMarkerShown] = useState(false);

  useEffect(() => {
    form.setFieldsValue(data);
    delayedShowMarker();
  }, [data, form]);

  const getObjectOptions = () => {
    let data = [
      {
        _id: '1',
        name: 'Khói',
      },
      {
        _id: '2',
        name: 'Lửa',
      },
      {
        _id: '3',
        name: 'Nhiệt độ',
      },
    ];

    const options = data.map((item) => {
      return (
        <Option key={item._id} value={item._id}>
          {item.name}
        </Option>
      );
    });
    return options;
  };

  const onFinish = (values) => {
    handleChangeData(values);
    nextStep();
  };

  const delayedShowMarker = () => {
    setTimeout(() => {
      setIsMarkerShown(true);
    }, 500);
  };

  const handleMarkerClick = () => {
    setIsMarkerShown(false);
    delayedShowMarker();
  };

  return (
    <StyleStep3>
      <Form
        {...LAYOUT}
        form={form}
        name="flight-hub-object"
        onFinish={onFinish}
        validateMessages={VALIDATE_MESSAGES}
        initialValues={data}
      >
        <Form.Item
          name="objectId"
          label="Đối tượng giám sát"
          rules={[{ type: 'string', required: true }]}
        >
          <Select showSearch placeholder="Chọn đối tượng giám sát">
            {getObjectOptions()}
          </Select>
        </Form.Item>
        <Form.Item
          name="location"
          label="Miền giám sát"
          rules={[{ type: 'string', required: true }]}
        >
          {/* <WrappedMap /> */}
          <WrappedMap
            isMarkerShown={isMarkerShown}
            onMarkerClick={handleMarkerClick}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </Form.Item>
        <Col offset={6}>
          <Row type="flex">
            <Button type="default" onClick={prevStep}>
              Quay lại
            </Button>
            &ensp;
            <Button type="primary" htmlType="submit">
              Tiếp theo
            </Button>
          </Row>
        </Col>
      </Form>
    </StyleStep3>
  );
};

export default Step3;
