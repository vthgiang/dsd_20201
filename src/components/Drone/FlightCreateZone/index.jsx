import { Button, Select, Input, Row, Col, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getRole } from '../Common/info';
import { useParams, withRouter } from 'react-router-dom';
import { getAreaById } from '../../../apis/area';
import { MapComponent } from '../DroneModals/AddFlightPathModal/ModalAddZone/MapComponent';
import { Form } from 'react-bootstrap';

const {Option} = Select;

function FlightCreateZone(props) {
    const {history} = props;
    const { areaId } = useParams();
    const [err, setErr] = useState('');
    const [err2, setErr2] = useState('');
    const [area, setArea] = useState(null);
    const [create, setCreate] = useState({
        _id: '',
        data: {
            incidentType: localStorage.getItem('project-type'),
            name: "",
            startPoint: {
                longitude: '',
                latitude: ''
            },
            endPoint: {
                longitude: '',
                latitude: ''
            },
            priority: '',
            description: "",
            code: "ZONE" + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000),
            level: 1,
            maxHeight: "",
            minHeight: "",
        }
    })

    // const showModal = () => {
    //     setShow(true);
    // }
    // const hideModal = () => {
    //     setShow(false);
    // }
    
    // coppy
    const [triangleCoords, setTriangleCoords] = useState([]);
    const [isMarkerShown, setIsMarkerShown] = useState(false);
    const createDomain = () => {
        if(!create.data.name || !create.data.minHeight || !create.data.maxHeight || 
            !create.data.startPoint.latitude || !create.data.endPoint.latitude) return setErr2('Bạn chưa nhập đủ thông tin');
        console.log('qua kiểm tra');
        // hideModal();

        axios.post(`https://monitoredzoneserver.herokuapp.com/monitoredzone/area`, {...create, _id: areaId}, {
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
                projecttype: localStorage.getItem("project-type"),
            }
        })
            .then(res => {
                console.log(res);
                if (res.data.success) {
                    alert('OK');
                    history.push('/flight-path');
                    // window.location.reload();
                }else alert('not Ok')
            })
            .catch(error => {
                alert('err not Ok');
                console.log(error)
            });
    }
    const _handleChange = (e) => {
        e.persist();
        setCreate(prevState => ({
            ...prevState,
            data: {
           //     ...create.data,
                ...prevState.data,
                [e.target.name]: e.target.value
            }
        }))
    }
    const toggleActivePriority = name => async (value) => {
        setCreate(prevState => ({
            ...prevState,
            data: {
            //    ...create.data,
                ...prevState.data,
                priority: value
            }
        }))
    }
    const delayedShowMarker = () => {
        setTimeout(() => {
            setIsMarkerShown(true);
        }, 3000)
    }

    const handleMarkerClick = (e) => {
        //get kinh do vi do khi click ban do
        let lat = e.latLng.lat();
        let lng = e.latLng.lng();
        // check xem co ton tai startPoint va endPoint
        let latStartPoint = create.data.startPoint.latitude;
        let latEndPoint = create.data.endPoint.latitude;

        let isSecondClick = false;
        
        if (!latStartPoint) {
            setCreate(prevState => {
                let newCreate = JSON.parse(JSON.stringify(prevState));
                newCreate.data.startPoint.latitude = lat;
                newCreate.data.startPoint.longitude = lng;
                return newCreate;
            });
        } else if (!latEndPoint) {
            setCreate(prevState => {
                let newCreate = JSON.parse(JSON.stringify(prevState));
                newCreate.data.endPoint.latitude = lat;
                newCreate.data.endPoint.longitude = lng;
                return newCreate;
            });
            isSecondClick = true;
        } else {
            setCreate(prevState => {
                let newCreate = JSON.parse(JSON.stringify(prevState));
                newCreate.data.startPoint.latitude = lat;
                newCreate.data.startPoint.longitude = lng;
                newCreate.data.endPoint.latitude = '';
                newCreate.data.endPoint.longitude = '';
                return newCreate;
            });
        }
        if (isSecondClick) {
            let triangleCoords = [
                {lat: create.data.startPoint.latitude, lng: create.data.startPoint.longitude},
                {lat: create.data.startPoint.latitude, lng: lng},
                {lat: lat, lng: lng},
                {lat: lat, lng: create.data.startPoint.longitude},
            ];
            setTriangleCoords(triangleCoords);
        }
        setIsMarkerShown(false);
        delayedShowMarker();
    }

    useEffect(()=>{
        if(!areaId) return setErr('Có lỗi xảy ra');
        getAreaById(areaId)
            .then(data => {
                if(!data) return setErr('Có lỗi xảy ra');
                setArea(data);
            })
            .catch(err => {
                setErr('Có lỗi xảy ra');
                console.log(err);
            });
    }, [])

    return (
    <Row>
        { !area && err && <p>{err}</p>}
        { !area ? <Spin/> : 
        <Col offset={4} span={12}>
        <table className="table table-hover table-responsive table-borderless">
            <tr>
                <th style={{width: '50%'}}>Khu vực giám sát</th>
                <td>
                    <Select name="_id" value={area._id} placeholder="Khu vực" style={{width: 200}}
                            // onChange={toggleActive("Active!")}
                    >
                        <Option value={area._id}>{area.name}</Option>
                    </Select>
                </td>
            </tr>
            <tr>
                <th style={{width: '50%'}}>Tên miền giám sát</th>
                <td>
                    <Input name="name" style={{width: 200}} placeholder="Nhập tên miền giám sát"
                        value={create.data.name} onChange={_handleChange}/>
                </td>
            </tr>
            <tr>
                <th style={{width: '50%'}}>Mã miền giám sát</th>
                <td>
                    <Input name="code" style={{width: 200}} placeholder="Nhập mã miền giám sát"
                            value={create.data.code} onChange={_handleChange}
                    />
                </td>
            </tr>
            <tr>
                <th style={{width: '50%'}}>Độ ưu tiên</th>
                <td>
                    <Select name="priority" placeholder="Độ ưu tiên" style={{width: 200}}
                        value={create.data.priority}
                        onChange={toggleActivePriority("Active!")}>
                        <Option value="0">Cao </Option>
                        <Option value="1">Thấp</Option>
                        <Option value="2">Trung bình</Option>
                    </Select>
                </td>
            </tr>
            <tr>
                <th style={{width: '50%'}}>Chiều cao tối thiểu</th>
                <td>
                    <Input name="minHeight" style={{width: 200}}
                            placeholder="Nhập chiều cao tối thiểu"
                            value={create.data.minHeight}
                            onChange={_handleChange}/>
                </td>
            </tr>
            <tr>
                <th style={{width: '50%'}}>Chiều cao tối đa</th>
                <td>
                    <Input name="maxHeight" style={{width: 200}}
                            placeholder="Nhập chiều cao tối đa"
                            value={create.data.maxHeight}
                            onChange={_handleChange}/>
                </td>
            </tr>
            <tr>
                <th style={{width: '50%'}}>Mô tả</th>
                <td>
                    <Input name="description" style={{width: 200}} placeholder="Nhập mô tả"
                        value={create.data.description}
                            onChange={_handleChange}/>
                </td>
            </tr>
        </table>
        <br/>
        <div>
            <MapComponent
                onMarkerClick={handleMarkerClick}
                triangleCoords={triangleCoords}
                area={area}
            />
        </div>
        <br/>

        {err2 !== '' && (<Form.Group controlId="errorMessage">
                    <Form.Text className="text-muted">
                        <span className='error-message'>{err2}</span>
                    </Form.Text>
        </Form.Group>)}

        <div style={{textAlign: 'center'}}>
        <Button type="primary" onClick={createDomain}>Thêm miền</Button>
        </div>
        </Col>
        }
    </Row>
    );
}

export default withRouter(FlightCreateZone);