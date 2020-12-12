import React from 'react';
import {compose, withProps} from "recompose"
import 'antd/dist/antd.css';
import {Table, Checkbox, Col, Row, Input, Select, Button, Modal} from 'antd';
import {Spin, Space} from 'antd';
import {SearchOutlined, DeleteOutlined, FolderAddOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router'
import { withGoogleMap, withScriptjs, GoogleMap, Polygon} from "react-google-maps";
import axios from 'axios';

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA15qz81pHiNfVEV3eeniSNhAu64SsJKgU",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{lat: 21.0245, lng: 105.84117}}
        onClick={props.onMarkerClick}
    >
        {props.chooseArea.map((area, index) => {
            return (
                <Polygon
                    path={area}
                    key={index}
                    editable={true}
                    onClick={props.onMarkerClick}
                    options={{
                        strokeColor: "#FF0000",
                        strokeWeight: 1,
                    }}
                >
                </Polygon>
            );
        })}
        <Polygon
            path={props.triangleCoords}
            onClick={props.onMarkerClick}
            key={1}
            editable={true}
            options={{
                strokeColor: "#0000FF",
                strokeWeight: 1,
            }}
        />
    </GoogleMap>
)

class ManageArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            triangleCoords: [],
            isMarkerShown: false,
            arrayDelete: [],
            listArea: [
            ],
            openModalAdd: false,
            columns: [
                {
                    title: 'Mã khu vực',
                    dataIndex: 'code',
                    key: 'key',
                    render: text => <a onClick={() => {
                        this.editArea(text)
                    }}>{text}</a>
                },
                {
                    title: 'Tên khu vực',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Mô tả',
                    dataIndex: 'description',
                    key: 'description',
                },
                {
                    title: 'Số miền trong khu vực',
                    key: 'total',
                    dataIndex: 'total',
                },
                {
                    title: 'Số lần đã xảy ra sự cố',
                    dataIndex: 'times',
                    key: 'times',
                },
                {
                    title: '',
                    render: val => (
                        <Button type="primary" danger icon={<DeleteOutlined/>} style={{marginRight: 10}}
                                onClick={() => this.deleteArea(val)}>
                            Xóa
                        </Button>
                    )
                }
            ],
            create: {
                startPoint: {
                    latitude: '',
                    longitude: '',
                },
                endPoint: {
                    latitude: '',
                    longitude: '',
                },
                name: 'Nui NamDL',
                code: 'namDL',
                maxHeight: 100,
                minHeight: 10,
                priority: 0,
                level: 0,
                times: 0,
                description: '',
            },
            loading: true,
            chooseArea: [],
            zoneByArea: [],
        };
        this.onChange = this.onChange.bind(this);
        this.editArea = this.editArea.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({isMarkerShown: true})
        }, 3000)
    }
    
    handleMarkerClick = (e) => {
        let lat = e.latLng.lat();
        let lng = e.latLng.lng();
        let latStartPoint = this.state.create.startPoint.latitude;
        let latEndPoint = this.state.create.endPoint.latitude;
        if (!latStartPoint) {
            this.setState(prevState => {
                let create = Object.assign({}, prevState.create);
                create.startPoint.latitude = lat;
                create.startPoint.longitude = lng;
                return {create};
            });
        } else if (!latEndPoint) {
            this.setState(prevState => {
                let create = Object.assign({}, prevState.create);
                create.endPoint.latitude = lat;
                create.endPoint.longitude = lng;
                return {create};
            });
        } else {
            this.setState(prevState => {
                let create = Object.assign({}, prevState.create);
                create.startPoint.latitude = lat;
                create.startPoint.longitude = lng;
                create.endPoint.latitude = '';
                create.endPoint.longitude = '';
                return {create};
            });
        }
        if (this.state.create.startPoint.latitude && this.state.create.endPoint.latitude) {
            let triangleCoords = [
                {lat: this.state.create.startPoint.latitude, lng: this.state.create.startPoint.longitude},
                {lat: this.state.create.startPoint.latitude, lng: this.state.create.endPoint.longitude},
                {lat: this.state.create.endPoint.latitude, lng: this.state.create.endPoint.longitude},
                {lat: this.state.create.endPoint.latitude, lng: this.state.create.startPoint.longitude},
            ];
            this.setState({triangleCoords});
        }
        this.setState({isMarkerShown: false});
        this.delayedShowMarker();
    }
    
    _handleChange(e) {
        let key = e.target.name;
        let value = e.target.value;
        this.setState(prevState => {
            let create = Object.assign({}, prevState.create);
            create[key] = value;
            return { create };
        })
    }
    setStatusModalAdd(openModalAdd) {
         this.setState({openModalAdd});
     }
    getAllArea() {
        axios.get(`https://monitoredzoneserver.herokuapp.com/area?pageSize=1000`)
          .then(res => {
            let loading = false;
            this.setState({loading});
            const list = res.data.content.monitoredArea;
            let listArea = [];
            let i = 0;
            for ( i = 0; i < list.length; i++){
              let Object = {
                  code: '',
                  name: '',
                  total: 0,
                  _id: '',
                  description: '',
                  times: 0
              };
              Object.code = list[i].code;
              Object.name = list[i].name;
              Object._id = list[i]._id;
              Object.total = list[i].monitoredZone.length;
              Object.description = list[i].description;
              Object.times = list[i].times;
              listArea.push(Object);
            }
            this.setState({
                listArea : listArea
            })
          })
          .catch(error => console.log(error));
      }
    createArea() {
        this.setStatusModalAdd(false);
        let data = this.state.create;
        axios.post(`https://monitoredzoneserver.herokuapp.com/area`, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                if (res.data.success) {
                    this.getAllArea();
                }
                console.log('ok');
            })
            .catch(error => console.log(error));
    }
    deleteArea(area) {
        let id = area._id;
        if(window.confirm(`Xóa khu vực này : ${area.name}? `)) {
            axios.delete(`https://monitoredzoneserver.herokuapp.com/area/${id}`)
                .then(res => {
                    if (res.data.success) {
                        this.getAllArea();
                        console.log('da xoa');
                    }
                })
                .catch(error => console.log(error));
        } else {
        
        }
    }
    


    setStatusModalDelete(openModalDelete) {
        this.setState({openModalDelete});
    }
    
    onChange(e) {
        let val = e.target['data-key'];
        let status = e.target.checked;
        let arrayDelete = [...this.state.arrayDelete];
        if (status) {
            let index = arrayDelete.findIndex(elm => elm === val);
            if (index === -1) {
                arrayDelete.push(val);
                this.setState({arrayDelete: arrayDelete});
            }
        } else {
            let index = arrayDelete.findIndex(elm => elm === val);
            if (index !== -1) {
                arrayDelete.splice(index, 1);
                this.setState({arrayDelete: arrayDelete});
            }
        }
    }
    
    editArea(val) {
        let area = this.state.listArea.find(area => area.code === val);
        console.log(typeof(area));
        this.props.history.push({
            pathname: '/surveillance-area-detail',
            state: {
                area: area,
                id: area._id
            }
        });
    }

    componentDidMount() {
        this.getAllArea();
        this.delayedShowMarker();
      }
    
    render() {
        return (
            <div className="main">
                <div className="filter">
                    <Row>
                        <Col span={6}>
                            <Input style={{width: 250}} placeholder="Tìm kiếm" prefix={<SearchOutlined/>}/>
                        </Col>
                        <Col span={6}>
                            <Button type="primary" icon={<FolderAddOutlined/>}
                                    onClick={() => this.setStatusModalAdd(true)}>
                                Thêm mới
                            </Button>
                            <Modal
                                title="Thêm mới khu vực giám sát"
                                visible={this.state.openModalAdd}
                                onOk={() => this.createArea()}
                                onCancel={() => this.setStatusModalAdd(false)}
                                okText="Lưu"
                                cancelText="Hủy"
                                centered
                            >
                                <table className="table table-hover table-responsive table-borderless">
                                    <tr>
                                        <th style={{width: '50%'}}>Mã khu vực giám sát</th>
                                        <td>
                                            <Input name = 'code' style={{width: 200}} onChange={this._handleChange} placeholder="Nhập"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{width: '50%'}}>Tên khu vực giám sát</th>
                                        <td>
                                            <Input name = 'name' style={{width: 200}} onChange={this._handleChange} placeholder="Nhập"/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th style={{width: '50%'}}>Chiều cao tối đa</th>
                                        <td>
                                            <Input name = 'maxHeight' style={{width: 200}} onChange={this._handleChange}  placeholder="Nhập"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{width: '50%'}}>Chiều cao tối thiểu</th>
                                        <td>
                                            <Input name = 'minHeight' style={{width: 200}} onChange={this._handleChange} placeholder="Nhập"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{width: '50%'}}>Độ ưu tiên</th>
                                        <td>
                                            <Input name = 'priority' style={{width: 200}} onChange={this._handleChange} placeholder="Nhập"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{width: '50%'}}>Mô tả</th>
                                        <td>
                                            <Input name = 'description' style={{width: 200}} onChange={this._handleChange} placeholder="Nhập"/>
                                        </td>
                                    </tr>
                                </table>
                                <br></br>
                                <div >
                                    <MyMapComponent
                                        onMarkerClick={this.handleMarkerClick}
                                        triangleCoords={this.state.triangleCoords}
                                        chooseArea={this.state.chooseArea}
                                    />
                                </div>
                            </Modal>
                        </Col>
                    </Row>
                </div>
                <br/>
                <div className="content">   
                {
                        this.state.loading ? (
                            <div style={{'text-align': 'center', 'lineHeight': '30'}}>
                                <Space size="middle">
                                    <Spin tip="Loading..." size="large"/>
                                </Space>
                            </div>
                        ) : (
                            <Table columns={this.state.columns} dataSource={this.state.listArea} rowKey="key"/>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(ManageArea);
