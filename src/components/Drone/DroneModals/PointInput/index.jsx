import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './PointInput.css'

function PointInput(props) {

    const {
        // timeCome, setTimeCome, 
        timeStop, setTimeStop,
        addPoint, newPoint,
        heightPoint, selectedZone,
        setHeightPoint,
        selectedObject,
        monitoredObjectListLoading,
        flightHeightDown, setFlightHeightDown
    } = props;

    const [error, setError] = useState('');

    const handleOkClick = () => {
        if(timeStop == '') {
            setError('bạn chưa nhập đủ thông tin');
            return;
        }
        if(timeStop && timeStop < 0) return setError('Giá trị thời gian không hợp lệ');
        
        if(flightHeightDown && (flightHeightDown >= heightPoint || flightHeightDown < 0)){
            setError('Độ cao hạ xuống không hợp lệ');
            return;
        }
        if(selectedZone && (heightPoint < selectedZone.minHeight || heightPoint > selectedZone.maxHeight)){
            setError('Độ cao ko trong giới hạn cho phép');
            return;
        }
        if(!newPoint.locationLat){
            setError('Bạn chưa chọn tọa độ');
            return;
        }
        addPoint();
        setError('');
    }

    return (
        <>
            {/* <Form.Group controlId="timeCome">
                <Form.Label>Thời gian bay đến</Form.Label>
                <Form.Control type="number" min="1" value={timeCome} onChange={(e)=>setTimeCome(e.target.value)} placeholder="phút" />
            </Form.Group> */}

            <Form.Group controlId="timeStop">
                <Form.Label>Thời gian dừng</Form.Label>
                <Form.Control type="number" min="0" onChange={(e)=>setTimeStop(e.target.value)} value={timeStop} placeholder="phút" />
            </Form.Group>
            <Form.Group controlId="heightPoint">
                <Form.Label>
                    Độ cao {selectedZone != null && `(${selectedZone.minHeight}~${selectedZone.maxHeight})`}
                </Form.Label>
                <Form.Control type="number" min="0" onChange={(e)=>setHeightPoint(e.target.value)}  value={heightPoint} placeholder="m" />
            </Form.Group>
            <Form.Group controlId="heightDown">
                <Form.Label>
                    Độ cao hạ xuống
                </Form.Label>
                <Form.Control type="number" min="0" onChange={(e)=>setFlightHeightDown(e.target.value)}  value={flightHeightDown} placeholder="m" />
            </Form.Group>
            {selectedObject != null && (<Form.Group controlId="monitoredObject">
                <Form.Text className="text-muted">
                    <div className='border-blue'>
                        <h6>Đối tượng giám sát</h6>
                        <span className='color-name'>Tên: {selectedObject.name}</span><br/>
                        <span className='color-height'>Độ cao: {selectedObject.height != null ? (selectedObject.height + " m") : "empty"}</span>
                    </div>
                </Form.Text>
            </Form.Group>)}
            {error !== '' && (<Form.Group controlId="errorMessage">
                <Form.Text className="text-muted">
                    <span className='error-message'>{error}</span>
                </Form.Text>
            </Form.Group>)}
            <Button onClick={handleOkClick}>OK</Button>
        </>
    );
}

export default PointInput;