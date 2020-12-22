import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';
import { getToken, getProjectType } from '../../Common/info';

FlightPathInput.propTypes = {
    
};

function FlightPathInput(props) {

    const {
        name, setName, height, setHeight, heightPoint, setHeightPoint, 
        selectedArea, setSelectedArea,
        selectedZone, setSelectedZone,
        resetPoint
    } = props;
    
    // list khu vuc giam sat
    const [monitoredAreaList, setMonitoredAreaList] = useState([]);
    const [areaLoading, setAreaLoading] = useState(true);
    // list mien giam sat
    const [monitoredZoneList, setMonitoredZoneList] = useState([]);
    const [zoneLoading, setZoneLoading] = useState(true);

    useEffect(()=> {
        // load khu vuc giam sat
        axios.get('https://monitoredzoneserver.herokuapp.com/area?page=0')
            .then(response => {
                // console.log(response.data.content.monitoredArea)
                const tmp = response.data.content.monitoredArea.map(area => ({
                    name: area.name,
                    _id: area._id,
                    startPoint: area.startPoint,
                    endPoint: area.endPoint,
                    label: area.name,
                    value: area._id
                }))
                setMonitoredAreaList(tmp);
                setAreaLoading(false);
            })
            .catch(e => {
                console.log(e)
            });
    }, []);

    useEffect(()=> {
        // load mien giam sat
        console.log("load zone");
        if(!selectedArea) return;
        const token = getToken();
        const projectType = getProjectType();
        const headers = {'token': token,'projecttype': projectType};
        setZoneLoading(true);
        axios.get(`https://monitoredzoneserver.herokuapp.com/monitoredzone/area/${selectedArea._id}`, {headers: headers})
            .then(response => {
                const tmp = response.data.content.zone.map(zone => ({
                    _id: zone._id,
                    name: zone.name,
                    startPoint: zone.startPoint,
                    endPoint: zone.endPoint,
                    maxHeight: zone.maxHeight,
                    minHeight: zone.minHeight,
                    label: zone.name,
                    value: zone._id
                }))
                console.log("mien giam sat",tmp);
                setMonitoredZoneList(tmp);
                setZoneLoading(false);
            })
            .catch(e => {
                console.log(e);
                setZoneLoading(false);
            });
    }, [selectedArea]);

    const handleAreaChange = (selectedOption) => {
        setSelectedArea(selectedOption);
        setSelectedZone(null);
    }
    
    const handleZoneChange = (selectedOption) => {
        setSelectedZone(selectedOption);
        console.log('heightPoint', heightPoint);
        setHeightPoint(selectedOption.minHeight);
        resetPoint();
    }

    return (
        <>
        <Row>
            <Col>
                <Form.Group controlId="flightName">
                    <Form.Label>Tên đường bay</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Nhập tên đường bay" />
                </Form.Group>

                {/* <Form.Group controlId="heightFlight">
                    <Form.Label>Độ cao khi bay</Form.Label>
                    <Form.Control type="number" onChange={(e)=>setHeight(e.target.value)} value={height} placeholder="m" />
                </Form.Group> */}
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group controlId="task">
                    <Form.Label>Chọn khu vực</Form.Label>
                    <Select
                        value={selectedArea}
                        isSearchable={true}
                        isLoading={areaLoading}
                        onChange={handleAreaChange}
                        options={monitoredAreaList}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="monitoredArea">
                    <Form.Label>Chọn miền giám sát</Form.Label>
                    <Select
                        value={selectedZone}
                        isSearchable={true}
                        isLoading={zoneLoading}
                        onChange={handleZoneChange}
                        options={monitoredZoneList}
                    />
                </Form.Group>
            </Col>
        </Row>
        </>
    );
}

export default FlightPathInput;