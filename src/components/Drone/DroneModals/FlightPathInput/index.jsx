import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';
import { getToken, getProjectType, getRole } from '../../Common/info';
import { Link } from 'react-router-dom';

function FlightPathInput(props) {

    const {
        name, setName, height, setHeight, heightPoint, setHeightPoint, 
        selectedArea, setSelectedArea,
        selectedZone, setSelectedZone,
        resetPoint,
        speed, setSpeed, 
        totalDistance
    } = props;
    
    // list khu vuc giam sat
    const [monitoredAreaList, setMonitoredAreaList] = useState([]);
    const [areaLoading, setAreaLoading] = useState(true);
    // list mien giam sat
    const [monitoredZoneList, setMonitoredZoneList] = useState([]);
    const [zoneLoading, setZoneLoading] = useState(true);

    const [showLinkCreateZone, setShowLinkCreateZone] = useState(false);

    useEffect(()=> {
        // load khu vuc giam sat
        setShowLinkCreateZone(false);
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
        setShowLinkCreateZone(false);
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
                if(tmp.length === 0){
                    const role = getRole();
                    if(role === 'ADMIN' || role === 'SUPER_ADMIN')
                        setShowLinkCreateZone(true);
                }
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

                <Form.Group controlId="speed">
                    <Form.Label>Vận tốc bay</Form.Label>
                    <Form.Control type="number" min="1" max="100" onChange={(e)=>setSpeed(e.target.value)} value={speed} placeholder="mét/phút" />
                </Form.Group>

                <Form.Group controlId="totalDistance">
                    <Form.Label>Tổng quãng đường bay (mét)</Form.Label>
                    <Form.Control type="number" value={Math.round(totalDistance)} placeholder="mét" />
                </Form.Group>
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
        {showLinkCreateZone &&
        <Row>
            <Col>
            <Form.Group controlId="formBasicEmail">
                <Form.Text className="text-muted">
                    <Link to='/surveillance-domain-manage'>Khu vực hiện tại chưa có miền nào, bấm vào đây để thêm miền mới</Link>
                </Form.Text>
            </Form.Group>
            </Col>
        </Row>}
        </>
    );
}

export default FlightPathInput;