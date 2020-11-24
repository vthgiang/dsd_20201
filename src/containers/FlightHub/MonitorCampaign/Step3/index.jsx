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

const Step3 = ({
  nextStep,
  prevStep,
  data,
  handleChangeData,
  monitorObjects,
}) => {
  const [form] = Form.useForm();
  const [isMarkerShown, setIsMarkerShown] = useState(false);

  useEffect(() => {
    form.setFieldsValue(data);
    delayedShowMarker();
    console.log({ data });
  }, [data, form]);

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
          name="monitorObject"
          label="Đối tượng giám sát"
          rules={[{ type: 'string', required: true }]}
        >
          <Select showSearch placeholder="Chọn đối tượng giám sát">
            {monitorObjects.map(({ id, name }) => {
              return (
                <Option key={id} value={id}>
                  {name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="monitoredZone"
          label="Miền giám sát"
          rules={[{ type: 'string' }]}
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
