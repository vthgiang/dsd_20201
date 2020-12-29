import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { DATE_TIME_FORMAT } from '../../../../configs';
import {
    Form,
    DatePicker,
} from 'antd';
import StateDrone from '../StateDrone';
import { Spin } from 'antd';


export default function SetStateAll(props) {
    const [loader, setLoader] = useState(false);
    const { listId, state, onReload } = props;
    const [show, setShow] = useState(false);
    const { RangePicker } = DatePicker;
    const [date, setDate] = useState();
    const onChange = (value, dateString) => {
        setDate(value);
    }
    const setStateAll = () => {
        setLoader(true);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                listId: listId,
                timeEnd: date[1],
                timeStart: date[0],
                maintenance : (content.state === 0) ? false : true,
            })
        };

        fetch(`http://skyrone.cf:6789/droneMaintenance/setStateAll`, requestOptions)
            .then(response => response.json())
            .then(json => {
                setLoader(false);
                handleClose();
                onReload();
            });
    }

    const setBrokenAll = () => {
        setLoader(true);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                listId: listId
            })
        };

        fetch(`http://skyrone.cf:6789/droneState/setBrokenAll`, requestOptions)
            .then(response => response.json())
            .then(json => {
                setLoader(false);
                handleClose();
                onReload();
            });
    }

    const getBackDroneAll = () => {
        setLoader(true);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                listId: listId,
            })
        };

        fetch(`http://skyrone.cf:6789/droneMaintenance/getBackDroneAll`, requestOptions)
            .then(response => response.json())
            .then(json => {
                setLoader(false);
                handleClose();
                onReload();
            });
    }



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const content = {};
    if (state === "Đang Rảnh") {
        content.state = 0
        content.variant = 'secondary';
        content.name = "Đặt lịch sạc";
    } else if (state === "Đang Bay") {
        content.state = 1
        content.variant = 'secondary';
        content.name = "Đánh dấu hỏng";
    } else if (state === "Đang Sạc") {
        content.state = 2
        content.name = "Thu Hồi"
    } else if (state === "Đang Bảo trì") {
        content.state = 3
        content.name = "Thu Hồi"
    }
    else if (state === "Hỏng") {
        content.state = 4
        content.variant = 'secondary';
        content.name = "Đặt lịch bảo trì";
    }

    return (
        <>
            <div>
                <Button onClick={handleShow}>
                    Chỉnh sửa tất cả
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <p>
                            <StateDrone state={state} />
                            <h3>Chỉnh sửa trạng thái cho {listId.length} drone đã chọn</h3>
                        </p>
                    </Modal.Header>
                        {((content.state === 0 || content.state === 4) && !loader) &&(
                                <Modal.Body>
                                <Form.Item
                                    name="timeRange"
                                    label="Đặt thời gian"
                                    labelCol={{ span: 5 }}
                                    rules={[{ type: 'array' }]}
                                >
                                    <RangePicker showTime
                                        onChange={onChange}
                                        format={DATE_TIME_FORMAT} />
                                </Form.Item>
        
                            </Modal.Body>)
                        }
                        {
                            (loader && ( <Spin />))
                        }
                    <Modal.Footer>
                        {((content.state === 2 || content.state === 3) && !loader) &&(
                             (
                                <Button onClick={getBackDroneAll} >
                                    Thu hồi
                                </Button>
                            )
                         )}

                        {((content.state === 0 || content.state === 4) && !loader) &&(
                             (
                                <Button variant = 'warning' onClick={setStateAll}>
                                     {content.name}
                                </Button>
                            )
                         )}

                        {((content.state === 2 || content.state === 0) && !loader) &&(
                             (
                                <Button onClick={setBrokenAll} variant='danger'>
                                    Đánh dấu hỏng
                                 </Button>
                            )
                         )}

                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}