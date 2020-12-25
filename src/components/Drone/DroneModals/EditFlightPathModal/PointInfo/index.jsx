import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

PointInfo.propTypes = {
    
};

function PointInfo(props) {
    const {
        timeCome, setTimeCome, 
        timeStop, setTimeStop, 
        heightPoint, setHeightPoint,
        zone, updatePoint,
        pointChange, setPointChange
    } = props;

    const [error, setError] = useState('');

    const handleOkClick = () => {
        console.log("ok clicked")
        updatePoint();
    }

    return (
        <>
            <Form.Group controlId="timeCome">
                <Form.Label>Thời gian bay đến</Form.Label>
                <Form.Control type="number" value={timeCome} 
                    onChange={(e)=>{
                        setTimeCome(e.target.value); 
                        setPointChange(true);}
                    } placeholder="phút" />
            </Form.Group>

            <Form.Group controlId="timeStop">
                <Form.Label>Thời gian dừng</Form.Label>
                <Form.Control type="number" 
                    onChange={(e)=>{
                        setTimeStop(e.target.value);
                        setPointChange(true);}
                    } 
                    value={timeStop} placeholder="phút" />
            </Form.Group>
            <Form.Group controlId="heightPoint">
                <Form.Label>
                    Độ cao {zone != null && `(${zone.minHeight}~${zone.maxHeight})`}
                </Form.Label>
                <Form.Control type="number" 
                    onChange={(e)=>{
                        setHeightPoint(e.target.value);
                        setPointChange(true);
                        }}  
                    value={heightPoint} placeholder="m" />
            </Form.Group>
            {error !== '' && (<Form.Group controlId="errorMessage">
                <Form.Text className="text-muted">
                    <span className='error-message'>{error}</span>
                </Form.Text>
            </Form.Group>)}
            {pointChange && <Button onClick={handleOkClick}>OK</Button>}
        </>
    );
}

export default PointInfo;