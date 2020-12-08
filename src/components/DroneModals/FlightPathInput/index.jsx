import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form } from 'react-bootstrap';

FlightPathInput.propTypes = {
    
};

function FlightPathInput(props) {

    const {name, setName, height, setHeight, task, setTask, monitoredArea, setMonitoredArea} = props;

    return (
        <>
        <Col>
            <Form.Group controlId="flightName">
                <Form.Label>Tên đường bay</Form.Label>
                <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Nhập tên đường bay" />
            </Form.Group>

            <Form.Group controlId="heightFlight">
                <Form.Label>Độ cao</Form.Label>
                <Form.Control type="number" onChange={(e)=>setHeight(e.target.value)} value={height} placeholder="m" />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="task">
                <Form.Label>Công việc</Form.Label>
                <Form.Control type="text" onChange={(e)=>setTask(e.target.value)} value={task} placeholder="" />
            </Form.Group>
            <Form.Group controlId="monitoredArea">
                <Form.Label>Khu vực giám sát</Form.Label>
                <Form.Control type="text" onChange={(e)=>setMonitoredArea(e.target.value)} value={monitoredArea} placeholder="" />
            </Form.Group>
        </Col>
        </>
    );
}

export default FlightPathInput;