import React from 'react';
import { compose, withProps } from 'recompose';
import 'antd/dist/antd.css';
import { Table, Col, Row, Input, Select, Button, Modal } from 'antd';
import {
  SearchOutlined,
  DeleteOutlined,
  FolderAddOutlined,
} from '@ant-design/icons';
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

class Manage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triangleCoords: [], // chưa 4 diem hien thi tren ban do
      isMarkerShown: false,
      arrayDelete: [],
      listDomain: [],
      openModalAdd: false,
      openModalDelete: false,
      columns: [
        {
          title: 'Mã miền',
          render: (val) => (
            <a
              onClick={() => {
                this.editDomain(val._id);
              }}
            >
              {val.code}
            </a>
          ),
        },
        {
          title: 'Độ ưu tiên',
          render: (val) => {
            if (val.priority == 0) {
              return 'Cao';
            } else if (val.priority == 1) {
              return 'Thấp';
            } else {
              return 'Trung bình';
            }
          },
        },
        {
          title: 'Tên miền',
          render: (val) => <p>{val.name}</p>,
        },
        {
          title: 'Chiều cao tối thiểu',
          render: (val) => <p>{val.minHeight}</p>,
        },

        {
          title: 'Chiều cao tối đa',
          render: (val) => <p>{val.maxHeight}</p>,
        },
        {
          title: 'Mô tả',
          render: (val) => <p>{val.description}</p>,
        },
        {
          title: 'Thời gian cập nhật',
          render: (val) => <p>{val.updatedAt}</p>,
        },
        {
          title: 'Khu vực',
          render: (val) => <p>{this.getNameArea(val.area)}</p>,
        },
        {
          title: '',
          render: (val) => (
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              style={{ marginRight: 10 }}
              onClick={() => this.deleteZone(val)}
            >
              Xóa
            </Button>
          ),
        },
      ],
      listArea: [],
      incident: {},
      create: {
        _id: '',
        data: {
          incidentType: localStorage.getItem('project-type'),
          name: '',
          startPoint: {
            longitude: '',
            latitude: '',
          },
          endPoint: {
            longitude: '',
            latitude: '',
          },
          priority: '',
          description: '',
          code: 'MGS' + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000),
          level: 1,
          maxHeight: '',
          minHeight: '',
        },
      },
      loading: true,
      chooseArea: [],
      zoneByArea: [],
      projectType: [],
      search: {
        name: '',
        priority: '',
        area: '',
      },
      listDomainTmp: [],
    };
    this.onChange = this.onChange.bind(this);
    this.editDomain = this.editDomain.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this.searchName = this.searchName.bind(this);
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = (e) => {
    //get kinh do vi do khi click ban do
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    // check xem co ton tai startPoint va endPoint
    let latStartPoint = this.state.create.data.startPoint.latitude;
    let latEndPoint = this.state.create.data.endPoint.latitude;

    if (!latStartPoint) {
      this.setState((prevState) => {
        let create = Object.assign({}, prevState.create);
        create.data.startPoint.latitude = lat;
        create.data.startPoint.longitude = lng;
        return { create };
      });
    } else if (!latEndPoint) {
      this.setState((prevState) => {
        let create = Object.assign({}, prevState.create);
        create.data.endPoint.latitude = lat;
        create.data.endPoint.longitude = lng;
        return { create };
      });
    } else {
      this.setState((prevState) => {
        let create = Object.assign({}, prevState.create);
        create.data.startPoint.latitude = lat;
        create.data.startPoint.longitude = lng;
        create.data.endPoint.latitude = '';
        create.data.endPoint.longitude = '';
        return { create };
      });
    }
    if (
      this.state.create.data.startPoint.latitude &&
      this.state.create.data.endPoint.latitude
    ) {
      let triangleCoords = [
        {
          lat: this.state.create.data.startPoint.latitude,
          lng: this.state.create.data.startPoint.longitude,
        },
        {
          lat: this.state.create.data.startPoint.latitude,
          lng: this.state.create.data.endPoint.longitude,
        },
        {
          lat: this.state.create.data.endPoint.latitude,
          lng: this.state.create.data.endPoint.longitude,
        },
        {
          lat: this.state.create.data.endPoint.latitude,
          lng: this.state.create.data.startPoint.longitude,
        },
      ];
      this.setState({ triangleCoords });
    }
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  _handleChange(e) {
    let key = e.target.name;
    let value = e.target.value;
    this.setState((prevState) => {
      let create = Object.assign({}, prevState.create);
      create.data[key] = value;
      return { create };
    });
  }

  setStatusModalAdd(openModalAdd) {
    this.setState((prevState) => {
      let create = Object.assign({}, prevState.create);
      create.data['code'] =
        'MGS' + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
      return { create };
    });
    this.setState({ openModalAdd });
  }

  createDomain() {
    this.setStatusModalAdd(false);
    let dataCreate = this.state.create;
    axios
      .post(
        `https://monitoredzoneserver.herokuapp.com/monitoredzone/area`,
        dataCreate,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.data.success) {
          window.location.reload();
        }
      })
      .catch((error) => console.log(error));
  }

  getAllZone() {
    let token = localStorage.getItem('token');
    let projecttype = localStorage.getItem('project-type');
    axios
      .get(
        `https://monitoredzoneserver.herokuapp.com/monitoredzone?pageSize=1000`,
        {
          headers: {
            token: token,
            projecttype: projecttype,
          },
        },
      )
      .then((res) => {
        let loading = false;
        this.setState({ loading });
        const listDomain = res.data.content.zone;
        const listDomainTmp = res.data.content.zone;
        this.setState({ listDomain });
        this.setState({ listDomainTmp });
      })
      .catch((error) => console.log(error));
  }

  deleteZone(zone) {
    let id = zone._id;
    if (window.confirm(`Bạn muốn xóa miền : ${zone.name}? `)) {
      axios
        .delete(`https://monitoredzoneserver.herokuapp.com/monitoredzone/${id}`)
        .then((res) => {
          if (res.data.success) {
            this.getAllZone();
          }
        })
        .catch((error) => console.log(error));
    } else {
    }
  }

  getArea() {
    axios
      .get(`https://monitoredzoneserver.herokuapp.com/area?pageSize=1000`)
      .then((res) => {
        const listArea = res.data.content.monitoredArea;
        this.setState({ listArea });
      })
      .catch((error) => console.log(error));
  }

  getNameArea(id) {
    let area = this.state.listArea.find((area) => area._id === id);
    if (area) {
      return area.name;
    } else {
      return id;
    }
  }

  componentDidMount() {
    this.delayedShowMarker();
    this.getIncident();
    this.getArea();
    this.getAllZone();
  }

  onChange(e) {
    let val = e.target['data-key'];
    let status = e.target.checked;
    let arrayDelete = [...this.state.arrayDelete];
    if (status) {
      let index = arrayDelete.findIndex((elm) => elm === val);
      if (index === -1) {
        arrayDelete.push(val);
        this.setState({ arrayDelete: arrayDelete });
      }
    } else {
      let index = arrayDelete.findIndex((elm) => elm === val);
      if (index !== -1) {
        arrayDelete.splice(index, 1);
        this.setState({ arrayDelete: arrayDelete });
      }
    }
  }

  async editDomain(id) {
    let domain = this.state.listDomain.find((domain) => domain._id === id);
    domain.nameArea = this.getNameArea(domain.area);
    domain.description = domain.description ? domain.description : '';
    let getMonitoredObjectByZone = await this.getMonitoredObjectByZone(id);
    let objectByZone = getMonitoredObjectByZone.filter((elm) => {
      if (elm.lat && elm.lng) {
        return elm;
      }
    });

    this.props.history.push({
      pathname: '/surveillance-domain-manage/edit',
      state: {
        domain: domain,
        objectByZone: objectByZone,
        id: id,
      },
    });
  }

  async getMonitoredObjectByZone(zoneId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://dsd05-monitored-object.herokuapp.com/monitored-object/get-object-by-zone?monitoredZone=${zoneId}`,
        )
        .then((res) => {
          const objectByZone = res.data.content;
          resolve(objectByZone);
        })
        .catch((error) => console.log(error));
    });
  }

  async getZonebyArea(idArea) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://monitoredzoneserver.herokuapp.com/monitoredzone/area/${idArea}`,
        )
        .then((res) => {
          const zoneByArea = res.data.content.zone;
          resolve(zoneByArea);
        })
        .catch((error) => console.log(error));
    });
  }

  toggleActivePriority = (name) => async (value) => {
    this.setState((prevState) => {
      let create = Object.assign({}, prevState.create);
      create.data['priority'] = value;
      return { create };
    });
  };

  searchPriority = (priority) => async (value) => {
    this.setState((prevState) => {
      let search = Object.assign({}, prevState.search);
      search.priority = value;
      return { search };
    });
    let domains;
    if (value && value.length > 0) {
      domains = this.state.listDomain.filter((domain) => {
        return domain.priority == value;
      });
    } else {
      domains = this.state.listDomain;
    }
    this.setState((prevState) => {
      let listDomainTmp;
      listDomainTmp = domains;
      return { listDomainTmp };
    });
  };

  searchArea = (area) => async (value) => {
    this.setState((prevState) => {
      let search = Object.assign({}, prevState.search);
      search.area = value;
      return { search };
    });
    let domains;
    if (value && value.length > 0) {
      domains = this.state.listDomain.filter((domain) => {
        return domain.area == value;
      });
    } else {
      domains = this.state.listDomain;
    }
    this.setState((prevState) => {
      let listDomainTmp;
      listDomainTmp = domains;
      return { listDomainTmp };
    });
  };

  searchName(e) {
    let value = e.target.value;
    this.setState((prevState) => {
      let search = Object.assign({}, prevState.search);
      search.content = value;
      return { search };
    });
  }

  toggleActive = (name) => async (value) => {
    let chooseArea = [];
    this.setState((prevState) => {
      let create = Object.assign({}, prevState.create);
      create._id = value;
      return { create };
    });

    let zoneByArea = await this.getZonebyArea(value);
    let area = this.state.listArea.find((area) => area._id === value);
    if (area) {
      let locationArea = [
        { lat: area.startPoint.latitude, lng: area.startPoint.longitude },
        { lat: area.startPoint.latitude, lng: area.endPoint.longitude },
        { lat: area.endPoint.latitude, lng: area.endPoint.longitude },
        { lat: area.endPoint.latitude, lng: area.startPoint.longitude },
      ];
      chooseArea.push(locationArea);
    }
    if (zoneByArea.length > 0) {
      for (const zone of zoneByArea) {
        let zoneArea = [
          { lat: zone.startPoint.latitude, lng: zone.startPoint.longitude },
          { lat: zone.startPoint.latitude, lng: zone.endPoint.longitude },
          { lat: zone.endPoint.latitude, lng: zone.endPoint.longitude },
          { lat: zone.endPoint.latitude, lng: zone.startPoint.longitude },
        ];
        chooseArea.push(zoneArea);
      }
    }
    this.setState({ chooseArea });
  };

  getIncident() {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://distributed.de-lalcool.com/api/projectType`, {
          headers: {
            token: 'd4266a83f48daac7868f73724ae1810d',
          },
        })
        .then((res) => {
          let projectType = res.data.result;
          let incidentType = localStorage.getItem('project-type');
          let incident = projectType.find((obj) => obj.code === incidentType);
          this.setState({ projectType });
          this.setState({ incident });
        })
        .catch((error) => console.log(error));
    });
  }

  render() {
    return (
      <div className="main">
        <div className="filter">
          <Row>
            <Col span={4}>
              <Input
                name="content"
                onChange={this.searchName}
                style={{ width: 150 }}
                placeholder="Search"
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={4}>
              <Select
                name="priority"
                placeholder="Độ ưu tiên"
                style={{ width: 150 }}
                onChange={this.searchPriority('Active!')}
              >
                <Option>Tất cả</Option>
                <Option value="0">Cao </Option>
                <Option value="1">Thấp</Option>
                <Option value="2">Trung bình</Option>
              </Select>
            </Col>
            <Col span={5}>
              <Select
                name="area"
                placeholder="Khu vực"
                style={{ width: 200 }}
                onChange={this.searchArea('Active!')}
              >
                <Option>Tất cả</Option>
                {this.state.listArea.map((area) => {
                  return <Option value={area._id}>{area.name}</Option>;
                })}
              </Select>
            </Col>
            <Col span={6}>
              <Button
                type="primary"
                icon={<FolderAddOutlined />}
                onClick={() => this.setStatusModalAdd(true)}
              >
                Thêm mới
              </Button>
              <Modal
                title="Thêm mới miền giám sát"
                visible={this.state.openModalAdd}
                onOk={() => this.createDomain()}
                onCancel={() => this.setStatusModalAdd(false)}
                okText="Lưu"
                cancelText="Hủy"
                centered
              >
                <table className="table table-hover table-responsive table-borderless">
                  <tr>
                    <th style={{ width: '50%' }}>Loại sự cố</th>
                    <td>{this.state.incident && this.state.incident.name}</td>
                  </tr>
                  <tr>
                    <th style={{ width: '50%' }}>Khu vực giám sát</th>
                    <td>
                      <Select
                        name="_id"
                        placeholder="Khu vực"
                        style={{ width: 200 }}
                        onChange={this.toggleActive('Active!')}
                      >
                        {this.state.listArea.map((area) => {
                          return <Option value={area._id}>{area.name}</Option>;
                        })}
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <th style={{ width: '50%' }}>Tên miền giám sát</th>
                    <td>
                      <Input
                        name="name"
                        style={{ width: 200 }}
                        placeholder="Nhập tên miền giám sát"
                        onChange={this._handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th style={{ width: '50%' }}>Mã miền giám sát</th>
                    <td>
                      <Input
                        name="code"
                        style={{ width: 200 }}
                        placeholder="Nhập mã miền giám sát"
                        value={this.state.create.data.code}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th style={{ width: '50%' }}>Độ ưu tiên</th>
                    <td>
                      <Select
                        name="priority"
                        placeholder="Độ ưu tiên"
                        style={{ width: 200 }}
                        onChange={this.toggleActivePriority('Active!')}
                      >
                        <Option value="0">Cao </Option>
                        <Option value="1">Thấp</Option>
                        <Option value="2">Trung bình</Option>
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <th style={{ width: '50%' }}>Chiều cao tối thiểu</th>
                    <td>
                      <Input
                        name="minHeight"
                        style={{ width: 200 }}
                        placeholder="Nhập chiều cao tối thiểu"
                        onChange={this._handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th style={{ width: '50%' }}>Chiều cao tối đa</th>
                    <td>
                      <Input
                        name="maxHeight"
                        style={{ width: 200 }}
                        placeholder="Nhập chiều cao tối đa"
                        onChange={this._handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th style={{ width: '50%' }}>Mô tả</th>
                    <td>
                      <Input
                        name="description"
                        style={{ width: 200 }}
                        placeholder="Nhập mô tả"
                        onChange={this._handleChange}
                      />
                    </td>
                  </tr>
                </table>
                <br />
                <div>
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
        <br />
        <div className="content">
          {this.state.loading ? (
            <div style={{ 'text-align': 'center', lineHeight: '30' }}>
              <Space size="middle">
                <Spin tip="Loading..." size="large" />
              </Space>
            </div>
          ) : (
            <Table
              columns={this.state.columns}
              dataSource={this.state.listDomainTmp}
              rowKey="key"
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Manage);
