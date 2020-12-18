import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap'; 

export default function StateModal(props){
    const {drone} = props;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const btn = {};
    if(drone.state === 0){
        btn.variant = 'secondary';
        btn.name = "Đặt lịch sạc";
    }else if(drone.state === 4){
        btn.variant = 'danger';
        btn.name = "ĐẶT bảo trì";
    }

    return (
        <>
        <Button variant={btn.variant} onClick={handleShow}>
            {btn.name}
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}