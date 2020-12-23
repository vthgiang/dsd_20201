import React from 'react';
import { compose, withProps } from "recompose"
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import CustomMarker from "./CustomMaker";
import { Input, Select, Tabs, Button, Checkbox, Table, Modal } from 'antd';
import { GoogleMap, withGoogleMap, withScriptjs, Polygon, Polyline, Marker } from "react-google-maps";
import axios from "axios";
import moment from 'moment';
const { TabPane } = Tabs
const { Option } = Select;

function callback(key) {
  console.log(key);
}

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA15qz81pHiNfVEV3eeniSNhAu64SsJKgU",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 21.0245, lng: 105.84117 }}
    onClick={props.onMarkerClick}
  >
    <Polygon
      path={props.triangleCoords}
      key={1}
      editable={true}
      options={{
        strokeColor: "#0000FF",
        strokeWeight: 1,
      }}
    />
    {props.objectByZone.map(marker => {
      return (
        <Marker onClick={props.showDetailMaker}
          label={marker.name}
          position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }} />
      )
    })}
  </GoogleMap>
)


const MyMapComponent1 = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA15qz81pHiNfVEV3eeniSNhAu64SsJKgU",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>

  <GoogleMap
    key={props.forceUpdate}
    defaultZoom={8}
    defaultCenter={{ lat: 21.0245, lng: 105.84117 }}
  >
    <Polygon
      key={props.forceUpdate}
      path={props.triangleCoords}
      // key={1}
      editable={true}
      options={{
        strokeColor: "#0000FF",
        strokeWeight: 1,
      }}
    />

    <Polyline
      path={props.pathCoordinates}
      geodesic={true}
      key={props.forceUpdate}
      options={{
        strokeColor: "#ff2527",
        strokeOpacity: 0.75,
        strokeWeight: 2,
        icons: [
          {
            offset: "0",
            repeat: "20px"
          }
        ]
      }}
    />
    <Marker position={{ lat: parseFloat(props.pathCoordinates[0].lat), lng: parseFloat(props.pathCoordinates[0].lng) }} />

  </GoogleMap>
)

class ManageEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      triangleCoords: [],
      olddomain: {
        ...this.props.location.state.domain
      },
      newdomain: {
        ...this.props.location.state.domain
      },
      id: this.props.location.state.id,
      objectByZone: this.props.location.state.objectByZone,
      columnsDrone: [
        {
          title: 'Tên đường bay',
          dataIndex: 'name',
          key: 'name',
        },

        {
          title: 'Chiều cao trung bình',
          render: val => <p>{val.averageHeight}</p>
        },
        {
          title: 'Chi tiết',
          render: val => (
            <Button type="primary" style={{ marginRight: 10 }}
              onClick={() => this.showDetail(val)}>
              Chi tiết
            </Button>
          )
        }
      ],
      detailMaker: {},
      openModalshow: false,
      listDrone: [],
      openModalAdd: false,
      openModalDelete: false,
      pathCoordinates: [],
      forceUpdate: 0,
    }
    this.myRef = React.createRef();
    this._handleChange = this._handleChange.bind(this);
  }

  componentDidMount() {
    if (this.state.newdomain.startPoint.latitude && this.state.newdomain.endPoint.latitude) {
      let triangleCoords = [
        { lat: this.state.newdomain.startPoint.latitude, lng: this.state.newdomain.startPoint.longitude },
        { lat: this.state.newdomain.startPoint.latitude, lng: this.state.newdomain.endPoint.longitude },
        { lat: this.state.newdomain.endPoint.latitude, lng: this.state.newdomain.endPoint.longitude },
        { lat: this.state.newdomain.endPoint.latitude, lng: this.state.newdomain.startPoint.longitude },
      ];
      this.setState({ triangleCoords });
    }
    this.getAllBySupervisedArea(this.state.id);
  }

  showDetail(val) {
    this.setModalshow(true);
    let pathCoordinates = [];
    if (val.flightPoints.length > 0) {
      for (const point of val.flightPoints) {
        let tmp = {
          lat: point.locationLat,
          lng: point.locationLng
        }
        pathCoordinates.push(tmp);
      }
      this.setState({ pathCoordinates });
    }

    let forceUpdate = this.state.forceUpdate + 1;
    this.setState({ forceUpdate });
  }


  setModalshow(openModalshow) {
    this.setState({ openModalshow });
    if (!openModalshow) {
      window.location.reload();
    }
  }

  diff(obj1, obj2) {
    let difference = Object.keys(obj1).filter(k => obj1[k] !== obj2[k]);
    return difference.length === 0;
  }

  _handleChange(e) {
    let key = e.target.name;
    let value = e.target.value;
    this.setState(prevState => {
      let newdomain = Object.assign({}, prevState.newdomain);
      newdomain[key] = value;
      return { newdomain };
    })
  }


  toggleActivePriority = name => async (value) => {
    this.setState(prevState => {
      let newdomain = Object.assign({}, prevState.newdomain);
      newdomain['priority'] = value;
      return { newdomain };
    });
  }

  setStatusModalAdd(openModalAdd) {
    this.setState({ openModalAdd });
  }

  setStatusModalDelete(openModalDelete) {
    this.setState({ openModalDelete });
  }

  showDetailMaker = (e) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    let obj = this.state.objectByZone.find(obj => {
      return obj.lat == lat && obj.lng == lng;
    });
    let detailMaker = obj ? obj : {};
    this.setState({ detailMaker });
  }

  setDefault = () => {
    let detailMaker = {};
    this.setState({ detailMaker });
  };

  handleMarkerClick = (e) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    let latStartPoint = this.state.newdomain.startPoint.latitude;
    let latEndPoint = this.state.newdomain.endPoint.latitude;
    if (!latStartPoint) {
      this.setState(prevState => {
        let newdomain = Object.assign({}, prevState.newdomain);
        newdomain.startPoint.latitude = lat;
        newdomain.startPoint.longitude = lng;
        return { newdomain };
      });
    } else if (!latEndPoint) {
      this.setState(prevState => {
        let newdomain = Object.assign({}, prevState.newdomain);
        newdomain.endPoint.latitude = lat;
        newdomain.endPoint.longitude = lng;
        return { newdomain };
      });
    } else {
      this.setState(prevState => {
        let newdomain = Object.assign({}, prevState.newdomain);
        newdomain.startPoint.latitude = lat;
        newdomain.startPoint.longitude = lng;
        newdomain.endPoint.latitude = '';
        newdomain.endPoint.longitude = '';
        return { newdomain };
      });
    }
    if (this.state.newdomain.startPoint.latitude && this.state.newdomain.endPoint.latitude) {
      let triangleCoords = [
        { lat: this.state.newdomain.startPoint.latitude, lng: this.state.newdomain.startPoint.longitude },
        { lat: this.state.newdomain.startPoint.latitude, lng: this.state.newdomain.endPoint.longitude },
        { lat: this.state.newdomain.endPoint.latitude, lng: this.state.newdomain.endPoint.longitude },
        { lat: this.state.newdomain.endPoint.latitude, lng: this.state.newdomain.startPoint.longitude },
      ];
      this.setState({ triangleCoords });
    } else {
      let triangleCoords = [];
      this.setState({ triangleCoords });
    }
  }


  save() {
    let dataEdit = {
      "startPoint": this.state.newdomain.startPoint,
      "endPoint": this.state.newdomain.endPoint,
      "priority": this.state.newdomain.priority,
      "description": this.state.newdomain.description,
      "code": this.state.newdomain.code,
    }
    let idZone = this.state.newdomain._id;
    axios.put(`https://monitoredzoneserver.herokuapp.com/monitoredzone/${idZone}`, dataEdit, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.props.history.push({
          pathname: '/surveillance-domain-manage',
        });
      })
      .catch(error => console.log(error));
  }

  getAllBySupervisedArea(idZone) {
    axios.get(`http://skyrone.cf:6789/flightPath/getAllBySupervisedArea/${idZone}`)
      .then(res => {
        const listDrone = res.data;
        this.setState({ listDrone });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="main">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Cấu hình miền giám sát" key="1">
            <div className="content">
              <table className="table table-hover table-responsive table-borderless">
                <tr>
                  <th style={{ width: '50%' }}>Khu vực giám sát</th>
                  <td>
                    <Input name="key" style={{ width: 200 }} placeholder="Nhập"
                      value={this.state.newdomain.nameArea}
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '50%' }}>Tên miền giám sát</th>
                  <td>
                    <Input name="key" style={{ width: 200 }} placeholder="Nhập"
                      value={this.state.newdomain.name}
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '50%' }}>Mã miền giám sát</th>
                  <td>
                    <Input name="code" style={{ width: 200 }} placeholder="Nhập"
                      value={this.state.newdomain.code}
                      onChange={this._handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '50%' }}>Chiều cao tối đa</th>
                  <td>
                    {this.state.newdomain.maxHeight} (mét)
                                    </td>
                </tr>
                <tr>
                  <th style={{ width: '50%' }}>Chiều cao tối thiểu</th>
                  <td>
                    {this.state.newdomain.minHeight} (mét)
                                    </td>
                </tr>
                <tr>
                  <th style={{ width: '50%' }}>Số lần xảy ra sự cố</th>
                  <td>
                    {
                      this.state.newdomain.times
                    }
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '50%' }}>Thời gian cập nhật</th>
                  <td>
                    {
                      this.state.newdomain.updatedAt
                    }
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '50%' }}>Độ ưu tiên</th>
                  <td>
                    <Select defaultValue={this.state.newdomain.priority + ''} name="priority" placeholder="Độ ưu tiên" style={{ width: 200 }}
                      onChange={this.toggleActivePriority("Active!")}>
                      <Option value="0">Cao </Option>
                      <Option value="1">Thấp</Option>
                      <Option value="2">Trung bình</Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '50%' }}>Mô tả</th>
                  <td>
                    <Input name="description" style={{ width: 200 }} placeholder="Nhập"
                      value={this.state.newdomain.description} onChange={this._handleChange} />
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div style={{ width: "70vh" }}>
              <MyMapComponent
                onMarkerClick={this.handleMarkerClick}
                handleMouseExit={this.handleMouseExit}
                triangleCoords={this.state.triangleCoords}
                objectByZone={this.state.objectByZone}
                showDetailMaker={this.showDetailMaker}
              />
            </div>
            <br />
            <div className="action center">
              <div className="save">
                {
                  !this.diff(this.state.olddomain, this.state.newdomain) &&
                  <Button type="primary" onClick={() => this.save()}>Lưu</Button>
                }
                {
                  (this.diff(this.state.olddomain, this.state.newdomain)) &&
                  <Button disabled>Lưu</Button>
                }
              </div>

            </div>
          </TabPane>
          <TabPane tab="Danh sách hành trình bay" key="2" id="list">
            <div className="content">
              <Table columns={this.state.columnsDrone} dataSource={this.state.listDrone} rowKey="key" />
            </div>
          </TabPane>
        </Tabs>
        <Modal

          title="Hiển thị đường bay"
          visible={this.state.openModalshow}
          onOk={() => this.setModalshow(false)}
          onCancel={() => this.setModalshow(false)}
        >
          <div>
            <MyMapComponent1
              key={this.state.forceUpdate}
              triangleCoords={this.state.triangleCoords}
              pathCoordinates={this.state.pathCoordinates}
              forceUpdate={this.state.forceUpdate}
            />
          </div>
          <br />
          <p>Chú thích</p>
          <p className="pin">

          </p><span>Điểm bắt đầu đường bay</span>
        </Modal>
        <Modal
          title="Chi tiết"
          visible={Object.keys(this.state.detailMaker).length > 0}
          onOk={() => this.setDefault()}
          onCancel={() => this.setDefault()}
        >
          <table className="table table-hover table-responsive table-borderless">
            <tr>
              <th style={{ width: '50%' }}>Tên đối tượng</th>
              <td>
                {this.state.detailMaker.name}
              </td>
            </tr>
            <tr>
              <th style={{ width: '50%' }}>Mã đối tượng</th>
              <td>
                {this.state.detailMaker.code}
              </td>
            </tr>
            <tr>
              <th style={{ width: '50%' }}>Trạng thái</th>
              <td>
                {this.state.detailMaker.status == 1 ? 'Đang hoạt động' : 'Không hoạt động'}
              </td>
            </tr>
            <tr>
              <th style={{ width: '50%' }}>Ngày cập nhật</th>
              <td>
                {this.state.detailMaker.updatedAt}
              </td>
            </tr>

            <tr>
              <th style={{ width: '50%' }}>Mô tả</th>
              <td>
                {this.state.detailMaker.description}
              </td>
            </tr>
            <tr>
              <th style={{ width: '50%' }}>Kinh độ</th>
              <td>
                {this.state.detailMaker.lng}
              </td>
            </tr>
            <tr>
              <th style={{ width: '50%' }}>Vĩ độ</th>
              <td>
                {this.state.detailMaker.lat}
              </td>
            </tr>
          </table>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ManageEdit);
