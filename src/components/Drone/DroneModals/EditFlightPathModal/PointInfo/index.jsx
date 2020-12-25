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
        pointChange, setPointChange,
        selectedPoint
    } = props;

    const [error, setError] = useState(''); 

    const handleOkClick = () => {
        if(!heightPoint || !timeCome || !timeStop) return setError('Bạn chưa nhập đủ thông tin');
        if(heightPoint < zone.minHeight || heightPoint > zone.maxHeight) return setError("Độ cao không trong phạm vi cho phép");
        console.log("ok clicked")
        updatePoint();
        setError('');
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
            {selectedPoint != null && selectedPoint.object != null && (<Form.Group controlId="monitoredObject">
                <Form.Text className="text-muted">
                    <div className='border-blue'>
                        <h6>Đối tượng giám sát</h6>
                        <span className='color-name'>Tên: {selectedPoint.object.name}</span><br/>
                        <span className='color-height'>Độ cao: {selectedPoint.object.height + " m"}</span>
                    </div>
                </Form.Text>
            </Form.Group>)}
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