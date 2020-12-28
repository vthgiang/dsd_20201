import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

function FlightPathInfo(props) {
    const {name, setName, 
        monitoredZoneName, monitoredAreaName, 
        speed, setSpeed,
        totalDistance
    } = props;
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
                <Form.Group controlId="totalDistance">
                    <Form.Label>Tông quãng đường bay (mét)</Form.Label>
                    <Form.Control type="number" value={Math.round(totalDistance)} placeholder="mét" />
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