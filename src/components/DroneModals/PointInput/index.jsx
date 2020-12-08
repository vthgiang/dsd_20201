import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

PointInput.propTypes = {
    
};

function PointInput(props) {

    const {
        timeCome, setTimeCome, 
        timeStop, setTimeStop,
        note, setNote,
        addPoint
    } = props;

    const handleOkClick = () => {
        if(timeCome == '' || timeStop == '') return;
        addPoint();
    }

    return (
        <>
            <Form.Group controlId="timeCome">
                <Form.Label>Thời gian bay đến</Form.Label>
                <Form.Control type="number" value={timeCome} onChange={(e)=>setTimeCome(e.target.value)} placeholder="phút" />
            </Form.Group>

            <Form.Group controlId="timeStop">
                <Form.Label>Thời gian dừng</Form.Label>
                <Form.Control type="number" onChange={(e)=>setTimeStop(e.target.value)} value={timeStop} placeholder="phút" />
            </Form.Group>
            <Form.Group controlId="note">
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control type="text" onChange={(e)=>setNote(e.target.value)} value={note} placeholder="" />
            </Form.Group>
            <Button onClick={handleOkClick}>OK</Button>
        </>
    );
}

export default PointInput;