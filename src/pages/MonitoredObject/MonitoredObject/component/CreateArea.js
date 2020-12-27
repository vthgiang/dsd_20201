import React, { useState } from 'react';
import { compose, withProps } from 'recompose';
import 'antd/dist/antd.css';
import { Table, Col, Row, Input, Select, Button, Modal } from 'antd';
import { Spin, Space } from 'antd';
import { withRouter } from 'react-router';
import axios from 'axios';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Polygon,
} from 'react-google-maps';

const { Option } = Select;

const MyMapComponent = compose(
    withProps({
        googleMapURL:
            'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA15qz81pHiNfVEV3eeniSNhAu64SsJKgU',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
)((props) => (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 21.0245, lng: 105.84117 }}>
        {props.chooseArea.map((area, index) => {
            return (
                <Polygon
                    path={area}
                    key={index}
                    editable={true}
                    onClick={props.onMarkerClick}
                    options={{
                        strokeColor: '#FF0000',
                        strokeWeight: 1,
                    }}
                ></Polygon>
            );
        })}
        <Polygon
            path={props.triangleCoords}
            onClick={props.onMarkerClick}
            key={1}
            editable={true}
            options={{
                strokeColor: '#0000FF',
                strokeWeight: 1,
            }}
        />
    </GoogleMap>
));

function CreateArea({ setStatusModalAdd, openModalAdd, create, setCreate, listArea, setDataZoneArea, dataZoneArea }) {
    const [triangleCoords, setTriangleCoords] = useState([]);
    const [isMarkerShown, setIsMarkerShown] = useState(false);
    const [chooseArea, setChooseArea] = useState([]);
    const createDomain = () => {
        setStatusModalAdd(false);
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
        e.persist();
        setCreate(prevState => ({
            ...prevState,
            data: {
                ...create.data,
                [e.target.name]: e.target.value
            }
        }))
    }
    const toggleActivePriority = name => async (value) => {
        setCreate(prevState => ({
            ...prevState,
            data: {
                ...create.data,
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

        if (!latStartPoint) {
            setCreate((prev) => ({
                ...prev,
                data: {
                    ...create.data,
                    startPoint: {
                        latitude: lat,
                        longitude: lng
                    }
                }
            }))
        } else if (!latEndPoint) {
            setCreate((prev) => ({
                ...prev,
                data: {
                    ...create.data,
                    endPoint: {
                        latitude: lat,
                        longitude: lng
                    }
                }
            }))
        } else {
            setCreate((prev) => ({
                ...prev,
                data: {
                    ...create.data,
                    startPoint: {
                        latitude: lat,
                        longitude: lng
                    },
                    endPoint: {
                        latitude: '',
                        longitude: ''
                    }
                }
            }))
        }
        if (create.data.startPoint.latitude && create.data.endPoint.latitude) {
            setTriangleCoords([
                { lat: create.data.startPoint.latitude, lng: create.data.startPoint.longitude },
                { lat: create.data.startPoint.latitude, lng: create.data.endPoint.longitude },
                { lat: create.data.endPoint.latitude, lng: create.data.endPoint.longitude },
                { lat: create.data.endPoint.latitude, lng: create.data.startPoint.longitude },
            ])
        }
        setIsMarkerShown(false);
        delayedShowMarker();
    }
    const getZonebyArea = async (idArea) => {
        await axios
            .get(
                `https://monitoredzoneserver.herokuapp.com/monitoredzone/area/${idArea}`,
                {
                    headers: {
                        token: localStorage.getItem("token"),
                        projectType: localStorage.getItem("project-type"),
                    },
                }
            )
            .then((res) => {
                setDataZoneArea(res.data.content.zone);
            })
            .catch((error) => console.log(error));
    };
    const toggleActive = name => async (value) => {
        let chooseArea = [];
        setCreate((prev) => ({
            ...prev,
            _id: value
        }))
        getZonebyArea(value);
        let area = listArea.find((area) => area._id === value);
        if (area) {
            let locationArea = [
                { lat: area.startPoint.latitude, lng: area.startPoint.longitude },
                { lat: area.startPoint.latitude, lng: area.endPoint.longitude },
                { lat: area.endPoint.latitude, lng: area.endPoint.longitude },
                { lat: area.endPoint.latitude, lng: area.startPoint.longitude },
            ];
            chooseArea.push(locationArea);
        }
        if (dataZoneArea.length > 0) {
            for (const zone of dataZoneArea) {
                let zoneArea = [
                    { lat: zone.startPoint.latitude, lng: zone.startPoint.longitude },
                    { lat: zone.startPoint.latitude, lng: zone.endPoint.longitude },
                    { lat: zone.endPoint.latitude, lng: zone.endPoint.longitude },
                    { lat: zone.endPoint.latitude, lng: zone.startPoint.longitude },
                ];
                chooseArea.push(zoneArea);

            }
        }
        setChooseArea(chooseArea);
    }
    const onHandleClose = () => {
        setStatusModalAdd(false)
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
    }

    return (
        <Modal
            title="Thêm mới miền giám sát"
            visible={openModalAdd}
            onOk={() => createDomain()}
            onCancel={() => onHandleClose()}
            okText="Lưu"
            cancelText="Hủy"
            centered
        >
            <table className="table table-hover table-responsive table-borderless">
                <tr>
                    <th style={{ width: '50%' }}>Khu vực giám sát</th>
                    <td>
                        <Select name="_id" placeholder="Khu vực" style={{ width: 200 }}
                            onChange={toggleActive("Active!")}>
                            {listArea.map(area => {
                                return <Option value={area._id}>{area.name}</Option>
                            })}
                        </Select>
                    </td>
                </tr>
                <tr>
                    <th style={{ width: '50%' }}>Tên miền giám sát</th>
                    <td>
                        <Input name="name" style={{ width: 200 }} placeholder="Nhập tên miền giám sát" value={create.data.name}
                            onChange={_handleChange} />
                    </td>
                </tr>
                <tr>
                    <th style={{ width: '50%' }}>Mã miền giám sát</th>
                    <td>
                        <Input name="code" style={{ width: 200 }} placeholder="Nhập mã miền giám sát" value={create.data.code}
                            onChange={_handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <th style={{ width: '50%' }}>Độ ưu tiên</th>
                    <td>
                        <Select name="priority" placeholder="Độ ưu tiên" style={{ width: 200 }} value={create.data.priority}
                            onChange={toggleActivePriority("Active!")}>
                            <Option value="0">Cao </Option>
                            <Option value="1">Thấp</Option>
                            <Option value="2">Trung bình</Option>
                        </Select>
                    </td>
                </tr>
                <tr>
                    <th style={{ width: '50%' }}>Chiều cao tối thiểu</th>
                    <td>
                        <Input name="minHeight" style={{ width: 200 }}
                            placeholder="Nhập chiều cao tối thiểu"
                            value={create.data.minHeight}
                            onChange={_handleChange} />
                    </td>
                </tr>
                <tr>
                    <th style={{ width: '50%' }}>Chiều cao tối đa</th>
                    <td>
                        <Input name="maxHeight" style={{ width: 200 }}
                            placeholder="Nhập chiều cao tối đa"
                            value={create.data.maxHeight}
                            onChange={_handleChange} />
                    </td>
                </tr>
                <tr>
                    <th style={{ width: '50%' }}>Mô tả</th>
                    <td>
                        <Input name="description" style={{ width: 200 }} placeholder="Nhập mô tả"
                            value={create.data.description}
                            onChange={_handleChange} />
                    </td>
                </tr>
            </table>
            <br />
            <div>
                <MyMapComponent
                    onMarkerClick={handleMarkerClick}
                    triangleCoords={triangleCoords}
                    chooseArea={chooseArea}
                />
            </div>
        </Modal>

    );
}

export default withRouter(CreateArea);
