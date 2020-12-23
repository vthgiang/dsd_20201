import React from 'react';
import { Table, Space, Button, BackTop, Input, Col, Card, DatePicker, Form, Select, Tree, Row } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DownOutlined, SmileOutlined, MehOutlined,FrownFilled,FrownOutlined} from '@ant-design/icons';
import { useSelector } from "react-redux";
import LogUser from '../LogUser';
import LogDrone from '../LogDrone';
import LogWarn from '../LogWarn';
import LogProblem from '../LogProblem';
import LogVideo from '../LogVideo';
import LogPayLoad from '../LogPayLoad';
import LogImage from '../LogImage';
import LogIncident from '../LogIncident';
import LogObjMonitor from '../LogObjMonitor';
import LogRegion from '../LogRegion';
import LogStatistic from '../LogStatistic';
import LogUAV from '../LogUAV';

var axios = require('axios');
const { RangePicker } = DatePicker;
const { Option } = Select;



class TreeProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectType: 'cay_trong',
      logType: 'log_region',

    };
  }
  onSelect = (selectedKeys, info) => {
    let selectedKey = selectedKeys[0];
    if (selectedKey && selectedKey.length >= 7) {
      let projectType = null;
      let logType = null;
      let logTypeKey = selectedKey.substr(6);
      let projectTypeKey = selectedKey.slice(0, 5);
      
      if (projectTypeKey === "0-0-0") projectType="cay_trong";
      if (projectTypeKey === "0-0-1") projectType="luoi_dien";
      if (projectTypeKey === "0-0-2") projectType="de_dieu";
      if (projectTypeKey === "0-0-3") projectType="chay_rung";

      if (logTypeKey === "0") logType = "log_drone";
      if (logTypeKey === "1") logType = "log_payload";
      if (logTypeKey === "2") logType = "log_user";
      if (logTypeKey === "3") logType = "log_image";
      if (logTypeKey === "4") logType = "log_video";
      if (logTypeKey === "5") logType = "log_problem";
      if (logTypeKey === "6") logType = "log_obj_monitor";
      if (logTypeKey === "7") logType = "log_warn";
      if (logTypeKey === "8") logType = "log_incident";
      if (logTypeKey === "9") logType = "log_region";
      if (logTypeKey === "10") logType = "log_statistic";
      if (logTypeKey === "11") logType = "log_uav";
            
      this.setState({projectType: projectType, logType: logType});
    }
    console.log('selected', selectedKeys, info);
  };

  render() {
    const treeData=[
      {
        title: 'Dự án',
        key: '0-0',
        children: [
          {
            title: 'Cây trồng',
            key: '0-0-0',
            children: [
              {
                title: 'Log drone',
                key: '0-0-0-0',
                icon: <i style={{color: "#555555"}} class="fas fa-drone-alt"></i>,
              },
              {
                title: 'Log payload',
                key: '0-0-0-1',
                icon: <i style={{color: "#555555"}} class="fas fa-layer-group"></i>,
              },
              {
                title: 'Log User',
                key: '0-0-0-2',
                icon: <i style={{color: "#555555"}} class="fas fa-user-circle"></i>,
              },
              {
                title: 'Log image',
                key: '0-0-0-3',
                icon: <i style={{color: "#555555"}} class="fas fa-images"></i>,
              },
              {
                title: 'Log video',
                key: '0-0-0-4',
                icon: <i style={{color: "#555555"}} class="fas fa-film"></i>,
              },
              {
                title: 'Log sự cố',
                key: '0-0-0-5',
                icon: <i style={{color: "#555555"}} class="fas fa-toolbox"></i>,
              },
              {
                title: 'Log đối tượng giám sát',
                key: '0-0-0-6',
                icon: <i style={{color: "#555555"}} class="fas fa-binoculars"></i>,
              },
              {
                title: 'Log cảnh báo',
                key: '0-0-0-7',
                icon: <i style={{color: "#555555"}} class="far fa-bell"></i>,
              },
              {
                title: 'Log xử lý sự cố',
                key: '0-0-0-8',
                icon: <i style={{color: "#555555"}} class="fas fa-toolbox"></i>,
              },
              {
                title: 'Log miền giám sát',
                key: '0-0-0-9',
                icon: <i style={{color: "#555555"}} class="fas fa-crop-alt"></i>,
              },
              {
                title: 'Log báo cáo thống kê',
                key: '0-0-0-10',
                icon: <i style={{color: "#555555"}} class="fa fa-file-chart-line"></i>,
              },
              {
                title: 'Log kết nối uav',
                key: '0-0-0-11',
                icon: <i style={{color: "#555555"}} class="fal fa-drone"></i>,
              },
            ],
          },
          {
            title: 'Lưới điện',
            key: '0-0-1',
            children: [
              {
                title: 'Log drone',
                key: '0-0-1-0',
                icon: <i style={{color: "#555555"}} class="fas fa-drone-alt"></i>,
              },
              {
                title: 'Log payload',
                key: '0-0-1-1',
                icon: <i style={{color: "#555555"}} class="fas fa-layer-group"></i>,
              },
              {
                title: 'Log User',
                key: '0-0-1-2',
                icon: <i style={{color: "#555555"}} class="fas fa-user-circle"></i>,
              },
              {
                title: 'Log image',
                key: '0-0-1-3',
                icon: <i style={{color: "#555555"}} class="fas fa-images"></i>,
              },
              {
                title: 'Log video',
                key: '0-0-1-4',
                icon: <i style={{color: "#555555"}} class="fas fa-film"></i>,
              },
              {
                title: 'Log sự cố',
                key: '0-0-1-5',
                icon: <i style={{color: "#555555"}} class="fas fa-toolbox"></i>,
              },
              {
                title: 'Log đối tượng giám sát',
                key: '0-0-1-6',
                icon: <i style={{color: "#555555"}} class="fas fa-binoculars"></i>,
              },
              {
                title: 'Log cảnh báo',
                key: '0-0-1-7',
                icon: <i style={{color: "#555555"}} class="far fa-bell"></i>,
              },
              {
                title: 'Log xử lý sự cố',
                key: '0-0-1-8',
                icon: <i style={{color: "#555555"}} class="fas fa-toolbox"></i>,
              },
              {
                title: 'Log miền giám sát',
                key: '0-0-1-9',
                icon: <i style={{color: "#555555"}} class="fas fa-crop-alt"></i>,
              },
              {
                title: 'Log báo cáo thống kê',
                key: '0-0-1-10',
                icon: <i style={{color: "#555555"}} class="fa fa-file-chart-line"></i>,
              },
              {
                title: 'Log kết nối uav',
                key: '0-0-1-11',
                icon: <i style={{color: "#555555"}} class="fal fa-drone"></i>,
              },
            ],
          },
          {
            title: 'Đê điều',
            key: '0-0-2',
            children: [
              {
                title: 'Log drone',
                key: '0-0-2-0',
                icon: <i style={{color: "#555555"}} class="fas fa-drone-alt"></i>,
              },
              {
                title: 'Log payload',
                key: '0-0-2-1',
                icon: <i style={{color: "#555555"}} class="fas fa-layer-group"></i>,
              },
              {
                title: 'Log User',
                key: '0-0-2-2',
                icon: <i style={{color: "#555555"}} class="fas fa-user-circle"></i>,
              },
              {
                title: 'Log image',
                key: '0-0-2-3',
                icon: <i style={{color: "#555555"}} class="fas fa-images"></i>,
              },
              {
                title: 'Log video',
                key: '0-0-2-4',
                icon: <i style={{color: "#555555"}} class="fas fa-film"></i>,
              },
              {
                title: 'Log sự cố',
                key: '0-0-2-5',
                icon: <i style={{color: "#555555"}} class="fas fa-toolbox"></i>,
              },
              {
                title: 'Log đối tượng giám sát',
                key: '0-0-2-6',
                icon: <i style={{color: "#555555"}} class="fas fa-binoculars"></i>,
              },
              {
                title: 'Log cảnh báo',
                key: '0-0-2-7',
                icon: <i style={{color: "#555555"}} class="far fa-bell"></i>,
              },
              {
                title: 'Log xử lý sự cố',
                key: '0-0-2-8',
                icon: <i style={{color: "#555555"}} class="fas fa-toolbox"></i>,
              },
              {
                title: 'Log miền giám sát',
                key: '0-0-2-9',
                icon: <i style={{color: "#555555"}} class="fas fa-crop-alt"></i>,
              },
              {
                title: 'Log báo cáo thống kê',
                key: '0-0-2-10',
                icon: <i style={{color: "#555555"}} class="fa fa-file-chart-line"></i>,
              },
              {
                title: 'Log kết nối uav',
                key: '0-0-2-11',
                icon: <i style={{color: "#555555"}} class="fal fa-drone"></i>,
              },
            ],
          },
          {
            title: 'Cháy rừng',
            key: '0-0-3',
            children: [
              {
                title: 'Log drone',
                key: '0-0-3-0',
                icon: <i style={{color: "#555555"}} class="fas fa-drone-alt"></i>,
              },
              {
                title: 'Log payload',
                key: '0-0-3-1',
                icon: <i style={{color: "#555555"}} class="fas fa-layer-group"></i>,
              },
              {
                title: 'Log User',
                key: '0-0-3-2',
                icon: <i style={{color: "#555555"}} class="fas fa-user-circle"></i>,
              },
              {
                title: 'Log image',
                key: '0-0-3-3',
                icon: <i style={{color: "#555555"}} class="fas fa-images"></i>,
              },
              {
                title: 'Log video',
                key: '0-0-3-4',
                icon: <i style={{color: "#555555"}} class="fas fa-film"></i>,
              },
              {
                title: 'Log sự cố',
                key: '0-0-3-5',
                icon: <i style={{color: "#555555"}} class="fas fa-toolbox"></i>,
              },
              {
                title: 'Log đối tượng giám sát',
                key: '0-0-3-6',
                icon: <i style={{color: "#555555"}} class="fas fa-binoculars"></i>,
              },
              {
                title: 'Log cảnh báo',
                key: '0-0-3-7',
                icon: <i style={{color: "#555555"}} class="far fa-bell"></i>,
              },
              {
                title: 'Log xử lý sự cố',
                key: '0-0-3-8',
                icon: <i style={{color: "#555555"}} class="fas fa-toolbox"></i>,
              },
              {
                title: 'Log miền giám sát',
                key: '0-0-3-9',
                icon: <i style={{color: "#555555"}} class="fas fa-crop-alt"></i>,
              },
              {
                title: 'Log báo cáo thống kê',
                key: '0-0-3-10',
                icon: <i style={{color: "#555555"}} class="fa fa-file-chart-line"></i>,
              },
              {
                title: 'Log kết nối uav',
                key: '0-0-3-11',
                icon: <i style={{color: "#555555"}} class="fal fa-drone"></i>,
              },
            ],
          },
        ],
      },
    ]
    
    return (
      <Row gutter={15}>
        <Col span={5} style={{ borderRight: '2px solid', borderRightColor: "#dddddd" }}>
          <div>
            <h2>Log dự án</h2>
            <Tree
              showIcon
              defaultExpandAll
              defaultSelectedKeys={['0-0-0-9']}
              switcherIcon={<DownOutlined />}
              treeData={treeData}
              onSelect={this.onSelect}
            />
          </div>

        </Col>
        <Col span={19}>
          {this.state.logType === 'log_drone' && <LogDrone projectType={this.state.projectType} /> }
          {this.state.logType === 'log_payload' && <LogPayLoad projectType={this.state.projectType}  /> }
          {this.state.logType === 'log_user' && <LogUser projectType={this.state.projectType}  /> }
          {this.state.logType === 'log_image' && <LogImage projectType={this.state.projectType}  /> }
          {this.state.logType === 'log_video' && <LogVideo projectType={this.state.projectType}  /> }
          {this.state.logType === 'log_incident' && <LogIncident projectType={this.state.projectType}  /> }
          {this.state.logType === 'log_obj_monitor' && <LogObjMonitor projectType={this.state.projectType}  /> }
          {this.state.logType === 'log_warn' && <LogWarn projectType={this.state.projectType}  /> }
          {this.state.logType === 'log_problem' && <LogProblem projectType={this.state.projectType}  /> }
          {this.state.logType === 'log_region' && <LogRegion projectType={this.state.projectType}  /> }
          {this.state.logType === 'log_statistic' && <LogStatistic projectType={this.state.projectType}  /> }
          {this.state.logType === 'log_uav' && <LogUAV projectType={this.state.projectType}  /> }
        </Col>
      </Row>
    )
  }

}

function LogTreeProject() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  //if (user.role === "SUPER_ADMIN") {
  return (
    <>
      <TreeProject />
      <BackTop />
    </>
  );
  // } else {
  //   return (<div>Không có quyền xem</div>);
  // }
}

export default LogTreeProject;