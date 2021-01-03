import { FolderAddOutlined } from '@ant-design/icons';
import { Button, Select, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { getRole } from '../../../Common/info';
import axios from 'axios';
import { MapComponent } from './MapComponent';

const {Option} = Select;

export default function ModalAddZone(props) {
    const { area, show, setShow } = props;
    const [create, setCreate] = useState({
        _id: '',
        data: {
            incidentType: localStorage.getItem('project-type'),
            name: "olalalalal",
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

    const showModal = () => {
        setShow(true);
    }
    const hideModal = () => {
        setShow(false);
    }
    
    // coppy
    const [triangleCoords, setTriangleCoords] = useState([]);
    const [isMarkerShown, setIsMarkerShown] = useState(false);
    const createDomain = () => {
        hideModal();
        axios.post(`https://monitoredzoneserver.herokuapp.com/monitoredzone/area`, create, {
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
                projectType: localStorage.getItem("project-type"),
            }
        })
        .then(res => {
            if (res.data.success) {
                setCreate({
                    _id: "",
                    data: {
                        incidentType: localStorage.getItem("project-type"),
                        name: "",
                        startPoint: {
                            longitude: "",
                            latitude: "",
                        },
                        endPoint: {
                            longitude: "",
                            latitude: "",
                        },
                        priority: "",
                        description: "",
                        code: "ZONE" + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000),
                        level: 1,
                        maxHeight: "",
                        minHeight: "",
                    },
                })
                window.location.reload();
            }
        })
        .catch(error => console.log(error));
    }
    const _handleChange = (e) => {
    //    e.persist();
        // console.log(e);
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
        // if (create.data.startPoint.latitude && create.data.endPoint.latitude) {
        //     let triangleCoords = [
        //         {lat: create.data.startPoint.latitude, lng: create.data.startPoint.longitude},
        //         {lat: create.data.startPoint.latitude, lng: create.data.endPoint.longitude},
        //         {lat: create.data.endPoint.latitude, lng: create.data.endPoint.longitude},
        //         {lat: create.data.endPoint.latitude, lng: create.data.startPoint.longitude},
        //     ];
        //     setTriangleCoords(triangleCoords);
        // }
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
    // const getZonebyArea = async (idArea) => {
    //     await axios
    //         .get(
    //             `https://monitoredzoneserver.herokuapp.com/monitoredzone/area/${idArea}`,
    //             {
    //                 headers: {
    //                     token: localStorage.getItem("token"),
    //                     projectType: localStorage.getItem("project-type"),
    //                 },
    //             }
    //         )
    //         .then((res) => {
    //             setDataZoneArea(res.data.content.zone);
    //         })
    //         .catch((error) => console.log(error));
    // };
    // const toggleActive = name => async (value) => {
    //     let chooseArea = [];
    //     setCreate((prev) => ({
    //         ...prev,
    //         _id: value
    //     }))
    //     getZonebyArea(value);
    //     let area = listArea.find((area) => area._id === value);
    //     if (area) {
    //         let locationArea = [
    //             { lat: area.startPoint.latitude, lng: area.startPoint.longitude },
    //             { lat: area.startPoint.latitude, lng: area.endPoint.longitude },
    //             { lat: area.endPoint.latitude, lng: area.endPoint.longitude },
    //             { lat: area.endPoint.latitude, lng: area.startPoint.longitude },
    //         ];
    //         chooseArea.push(locationArea);
    //     }
    //     if (dataZoneArea.length > 0) {
    //         for (const zone of dataZoneArea) {
    //             let zoneArea = [
    //                 { lat: zone.startPoint.latitude, lng: zone.startPoint.longitude },
    //                 { lat: zone.startPoint.latitude, lng: zone.endPoint.longitude },
    //                 { lat: zone.endPoint.latitude, lng: zone.endPoint.longitude },
    //                 { lat: zone.endPoint.latitude, lng: zone.startPoint.longitude },
    //             ];
    //             chooseArea.push(zoneArea);

    //         }
    //     }
    //     setChooseArea(chooseArea);
    // }
    // const onHandleClose = () => {
    //     setStatusModalAdd(false)
    //     setCreate({
    //         _id: "",
    //         data: {
    //             incidentType: localStorage.getItem("project-type"),
    //             name: "",
    //             startPoint: {
    //                 longitude: "",
    //                 latitude: "",
    //             },
    //             endPoint: {
    //                 longitude: "",
    //                 latitude: "",
    //             },
    //             priority: "",
    //             description: "",
    //             code: "ZONE" + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000),
    //             level: 1,
    //             maxHeight: "",
    //             minHeight: "",
    //         },
    //     })
    // }
//end coppy

    // useEffect( ()=> {
    //     delayedShowMarker();
    // }, []);

    // const role = getRole();
    return (
        <Modal
            title="Thêm mới miền giám sát"
            visible={show} 
            onOk={() => createDomain()} //
            onCancel={hideModal}
            okText="Lưu"
            cancelText="Hủy"
            centered
            zIndex={6666}
        >
            {/* {console.log('modal add zone render')} */}
            <table className="table table-hover table-responsive table-borderless">
                {/* <tr>
                    <th style={{width: '50%'}}>Loại sự cố</th>
                    <td>
                        {"name"} // loai su so === title tren cung
                    </td>
                </tr> */}
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
        </Modal>
    );
}