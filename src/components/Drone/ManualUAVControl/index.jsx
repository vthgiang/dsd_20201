import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Map from "./Map";
import TopInfo from "./TopInfo";
import UAVProvider from './Context';
import ActionControl from "./ActionControl";
import VideoStream from './VideoStream';

function ManualDroneControl() {
  return (
    <Container>
        <UAVProvider>
            <Row>
                <TopInfo/>
            </Row>
            <Row>
                <Col md={5}><ActionControl/></Col>
                <Col md={7}><Map/></Col>
            </Row>
            <Row>
              <Col><VideoStream/></Col>
            </Row>
        </UAVProvider>
    </Container>
  );
}

export default ManualDroneControl;
