import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';

FlightPathInfo.propTypes = {
    
};

function FlightPathInfo(props) {
    const {name, setName, monitoredZoneName, monitoredAreaName, speed, setSpeed} = props;
    return (
        <>
        <Row>
            <Col>
                <Form.Group controlId="flightPathName">
                    <Form.Label>Tên đường bay</Form.Label>
                    <Form.Control type="text" placeholder="" value={name} onChange={e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="speed">
                    <Form.Label>Vận tốc bay</Form.Label>
                    <Form.Control type="number" min="1" max="100" onChange={(e)=>setSpeed(e.target.value)} value={speed} placeholder="m/s" />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group controlId="monitoredArea">
                    <Form.Label>Khu vực giám sát</Form.Label>
                    <Form.Control type="text" placeholder="" value={monitoredAreaName}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="monitoredZone">
                    <Form.Label>Miền giám sát</Form.Label>
                    <Form.Control type="text" placeholder="" value={monitoredZoneName} />
                </Form.Group>
            </Col>
        </Row>
        </>
    );
}

export default FlightPathInfo;