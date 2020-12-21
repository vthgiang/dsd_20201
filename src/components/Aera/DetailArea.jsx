import React from 'react';
import {compose, withProps} from "recompose"
import 'antd/dist/antd.css';
import {Table, Checkbox, Col, Row, Input, Select, Button, Modal, Tabs} from 'antd';
import {Spin, Space} from 'antd';
import {SearchOutlined, DeleteOutlined, FolderAddOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import { withGoogleMap, withScriptjs, GoogleMap, Polygon} from "react-google-maps";
import axios from 'axios';
import { render } from 'react-dom';

const {TabPane} = Tabs
const {Option} = Select

function callback(key) {
    console.log(key);
}

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
        defaultZoom={12}
        defaultCenter={{lat: 21.0245, lng: 105.84117}}
        onClick={props.onMarkerClick}
        
    >
        {props.showDomain.map((domain, index) => {
            return (
                <Polygon
                    path={domain}
                    key={index}
                    editable={true}
                    onClick={props.onMarkerClick}
                    options={{
                        strokeColor: "#00FF00",
                        strokeWeight: 0.5,
                    }}
                >
                </Polygon>
            );
        })}
        <Polygon
            path={props.triangleCoords}
            key={1}
            editable={true}
            options={{
                strokeColor: "#0000FF",
                strokeWeight: 1,
            }}
        />
    </GoogleMap>

    
)

class DetailDomain extends React.Component {

    render() {
        return(
            <div style = {{visibility: this.props.show, width: '80vh'}} >
                <h1 style={{fontWeight:'700'}}>Thông tin miền giám sát</h1>
                <table className="table table-hover table-responsive table-borderless">
                <tr>
                    <th style= {{width:'30vh'}}>Mã miền giám sát:</th>
                    <td style= {{width:'40vh'}}>{this.props.selectedDomain.code}</td>
                </tr>
                <tr>
                    <th style= {{width:'30vh'}}>Tên miền giám sát:</th>
                    <td style= {{width:'40vh'}}>{this.props.selectedDomain.name}</td>
                </tr>
                <tr>
                    <th style= {{width:'25vh'}}>Chiều cao tối đa:</th>
                    <td style= {{width:'40vh'}}>{this.props.selectedDomain.maxHeight}</td>
                </tr>
                <tr>
                    <th style= {{width:'25vh'}}>Chiều cao tối thiểu:</th>
                    <td style= {{width:'40vh'}}>{this.props.selectedDomain.minHeight}</td>
                </tr>
                <tr>
                    <th style= {{width:'25vh'}}>Mô tả:</th>
                    <td style= {{width:'55vh'}}>{this.props.selectedDomain.description}</td>
                </tr>
                <tr>
                    <th style= {{width:'25vh'}}>Độ ưu tiên:</th>
                    <td style= {{width:'40vh'}}>{this.props.selectedDomain.priority}</td>
                </tr>
                <tr>
                    <th style= {{width:'25vh'}}>Số lần đã xảy ra sự cố:</th>
                    <td style= {{width:'40vh'}}>{this.props.selectedDomain.times}</td>
                </tr>
                <tr>
                    <th style= {{width:'25vh'}}>Mức độ nguy hiểm:</th>
                    <td style= {{width:'40vh'}}>{this.props.selectedDomain.level}</td>
                </tr>
            </table>
            </div>
        );
    }
}
class DetailArea extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            triangleCoords: [],
            oldarea: {},
            id: this.props.location.state.id,
            newarea: {
                "startPoint": {
                    "longitude": 105.79941430192696,
                    "latitude": 21.050373019230733
                },
                "endPoint": {
                    "latitude": 21.023990392074978,
                    "longitude": 105.83088096859359
                },
                "monitoredZone": [
                    "5fcf79eda122370017d3ae2b",
                    "5fd340adfb276d0017ec7aea"
                ],
                "_id": "5fcf79c4a122370017d3ae2a",
                "name": "Quận Ba Đình, Hà Nội",
                "code": "AREA0231",
                "maxHeight": 280,
                "minHeight": 45,
                "priority": 0,
                "level": 0,
                "times": 0,
                "description": 'Day la khu vuc quan Ba Dinh'
            },
            showDetail: 'hidden',
            selectedDomain: {},
            listDomain: [],
            listDomainToShow: [],
            openModalshow: false,
            showMarkerMouseover: false,
            openModalAdd: false,
            openModalDelete: false,
            pathCoordinates: [],
    
        }
        this._handleChange = this._handleChange.bind(this);
    }
    
    componentDidMount() {
        this.setArea(this.state.id);
        setTimeout(300);
        this.getZoneByArea(this.state.id);
    }
    
    diff(obj1, obj2) {
        let difference = Object.keys(obj1).filter(k => obj1[k] !== obj2[k]);
        return difference.length === 0;
    }
    
    _handleChange(e) {
        let key = e.target.name;
        let value = e.target.value;
        this.setState(prevState => {
            let newarea = Object.assign({}, prevState.newarea);
            newarea[key] = value;
            return { newarea };
        })
    }
    handleMarkerClick = (e) => {
        let lat = e.latLng.lat();
        let long = e.latLng.lng();
        let selectedDomain = {};
        if (this.state.listDomain.length > 0) {
            let i =0;
            for (i = 0; i < this.state.listDomain.length; i++) {
                if ( (lat - this.state.listDomain[i].startPoint.latitude)*(lat - this.state.listDomain[i].endPoint.latitude)< 0 && 
                     (long - this.state.listDomain[i].startPoint.longitude)*(long - this.state.listDomain[i].endPoint.longitude)< 0
                ) {
                    selectedDomain = Object.assign({}, this.state.listDomain[i]); break;
                }
            }
        }
        this.setState({selectedDomain});
        this.setState({
            showDetail: 'visible'
        })
        console.log(this.state.selectedDomain.name);
    }

    onMarkerMouseover = () => {
        let showMarkerMouseover = true;
        this.setState({ showMarkerMouseover });
        this.setState({
            showDetail: 'hidden'
        })
    }
    handleMouseExit = () => {
        let showMarkerMouseover = false;
        this.setState({ showMarkerMouseover });
    }
    
    setStatusModalAdd(openModalAdd) {
        this.setState({openModalAdd});
    }
    
    setStatusModalDelete(openModalDelete) {
        this.setState({openModalDelete});
    }
    showDomain() {
        if (this.state.newarea.startPoint.latitude && this.state.newarea.endPoint.latitude) {
            let triangleCoords = [
                {lat: this.state.newarea.startPoint.latitude, lng: this.state.newarea.startPoint.longitude},
                {lat: this.state.newarea.startPoint.latitude, lng: this.state.newarea.endPoint.longitude},
                {lat: this.state.newarea.endPoint.latitude, lng: this.state.newarea.endPoint.longitude},
                {lat: this.state.newarea.endPoint.latitude, lng: this.state.newarea.startPoint.longitude},
            ];
            this.setState({triangleCoords});
        }
    }
    setArea(id) {
        axios.get(`https://monitoredzoneserver.herokuapp.com/area/areainfo/${id}`)
            .then(res => {
                    const area = res.data.content.area;
                    let newarea = {};
                    newarea = Object.assign({}, area);
                    this.setState({newarea});
                }
            )
            .catch(error => console.log(error));
    }
    getZoneByArea(id) {
        let listDomainToShow = [];
        let Area = this.state.newarea;
        let area = [
            {lat: Area.startPoint.latitude, lng: Area.startPoint.longitude},
            {lat: Area.startPoint.latitude, lng: Area.endPoint.longitude},
            {lat: Area.endPoint.latitude, lng: Area.endPoint.longitude},
            {lat: Area.endPoint.latitude, lng: Area.startPoint.longitude}
        ];
        listDomainToShow.push(area);
        axios.get(`https://monitoredzoneserver.herokuapp.com/monitoredzone/area/${id}`)
            .then(res => {
                const list = res.data.content.zone;
                let listDomain =[];
                let i = 0;
                for ( i = 0; i < list.length; i++){
                    let c = Object.assign({}, list[i]);
                    listDomain.push(c);
                    let domain = [
                        {lat: c.startPoint.latitude, lng: c.startPoint.longitude},
                        {lat: c.startPoint.latitude, lng: c.endPoint.longitude},
                        {lat: c.endPoint.latitude, lng: c.endPoint.longitude},
                        {lat: c.endPoint.latitude, lng: c.startPoint.longitude}
                    ];
                    listDomainToShow.push(domain);
                }
                this.setState({listDomain});
                this.setState({listDomainToShow});
            })
            .catch(error => console.log(error));
    }

    
    render() {
        return (
            <div className="main">
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Thông tin khu vực giám sát" key="1">
                        <div className="content">
                            <table className="table table-hover table-responsive table-borderless" >
                                <tr>
                                    <th style= {{width:'20%'}}>Mã khu vực giám sát:</th>
                                    <td style= {{width:'20%'}}>
                                        {this.state.newarea.code}
                                    </td>
                                    <td style= {{width:'20%', fontWeight: '700'}}>
                                        Tên khu vực giám sát:
                                    </td>
                                    <td style= {{width:'20%'}}>
                                    <   Input name="name" style={{width: 200}} placeholder="Nhập"
                                               value={this.state.newarea.name} onChange={this._handleChange}/> 
                                    </td>
                                </tr>
                                <tr>
                                    <th style= {{width:'20%'}}>Chiều cao tối đa:</th>
                                    <td style= {{width:'20%'}}>
                                        <Input name="maxH" style={{width: 200}} placeholder="Nhập"
                                               value={this.state.newarea.maxHeight} onChange={this._handleChange}/>    
                                    </td>
                                    <td style= {{width:'20%', fontWeight: '700'}}>Chiều cao tối thiểu:</td>
                                    <td style= {{width:'20%'}}>
                                        <Input name="minH" style={{width: 200}} placeholder="Nhập"
                                               value={this.state.newarea.minHeight} onChange={this._handleChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th style= {{width:'20%'}}>Mô tả:</th>
                                    <td colSpan ="3">
                                    <   Input name="description" style={{width: 200}} placeholder="Nhập"
                                               value={this.state.newarea.description} onChange={this._handleChange}/>  
                                    </td>
                                </tr>
                                <tr>
                                    <th style= {{width:'20%', fontWeight: '700'}}>Độ ưu tiên:</th>
                                    <td style= {{width:'20%'}}>
                                        <Input name="priority" style={{width: 200}} placeholder="Nhập"
                                               value={this.state.newarea.priority} onChange={this._handleChange}/>
                                    </td>
                                    <td style= {{width:'20%', fontWeight: '700'}}>Số lần đã xảy ra sự cố:</td>
                                    <td style= {{width:'20%'}}>
                                        {this.state.newarea.times}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Mức độ nguy hiểm:</th>
                                    <td colSpan = "3">
                                        <Input name="level" style={{width: 200}} placeholder="Nhập"
                                               value={this.state.newarea.level} onChange={this._handleChange}/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <br/>
                        <div>
                        <span style={{width: "80vh", float: "Left"}}>
                            <MyMapComponent
                                onMarkerClick={this.handleMarkerClick}
                                onMarkerMouseover={this.onMarkerMouseover}
                                handleMouseExit={this.handleMouseExit}
                                triangleCoords={this.state.triangleCoords}
                                showDomain={this.state.listDomainToShow}
                                showMarkerMouseover={this.state.showMarkerMouseover}
                            />
                        </span>
                        <span className="domain" style={{float: "Left", paddingLeft: '5%'}}>
                            <DetailDomain 
                                selectedDomain ={this.state.selectedDomain}
                                show = {this.state.showDetail}
                            />
                        </span>
                        </div>
                        <div className="action center" style={{clear: "Left"}}>
                            <br/>
                            <div className="save">
                                {
                                    !this.diff(this.state.oldarea, this.state.newarea) && <Button type="primary">Lưu</Button>
                                }
                                {
                                    (this.diff(this.state.oldarea, this.state.newarea)) && <Button disabled>Lưu</Button>
                                }
                            </div>
                            
                        </div>
                    </TabPane>
                    <TabPane tab=" " key="2">                        
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default withRouter(DetailArea);
