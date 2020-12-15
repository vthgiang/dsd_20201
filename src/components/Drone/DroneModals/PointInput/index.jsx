import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

PointInput.propTypes = {
    
};

function PointInput(props) {

    const {
        timeCome, setTimeCome, 
        timeStop, setTimeStop,
        addPoint, newPoint,
        heightPoint, selectedZone,
        setHeightPoint
    } = props;

    const [error, setError] = useState('');

    const handleOkClick = () => {
        if(timeCome == '' || timeStop == '') {
            setError('bạn chưa nhập đủ thông tin');
            return;
        }
        if(selectedZone && (heightPoint < selectedZone.minHeight || heightPoint > selectedZone.maxHeight)){
            setError('Độ cao ko trong giới hạn cho phép');
            return;
        }
        if(!newPoint.locationLat){
            setError('Ok cái gì vậy');
            return;
        }
        addPoint();
        setError('');
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
            <Form.Group controlId="heightPoint">
                <Form.Label>
                    Độ cao {selectedZone != null && `(${selectedZone.minHeight}~${selectedZone.maxHeight})`}
                </Form.Label>
                <Form.Control type="number" onChange={(e)=>setHeightPoint(e.target.value)}  value={heightPoint} placeholder="m" />
            </Form.Group>
            {error !== '' && (<Form.Group controlId="errorMessage">
                <Form.Text className="text-muted">
                    {error}
                </Form.Text>
            </Form.Group>)}
            <Button onClick={handleOkClick}>OK</Button>
        </>
    );
}

export default PointInput;