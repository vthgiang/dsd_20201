import React, { useEffect, useState, useRef } from 'react';
import { Table, Space, Button, BackTop, Input, Col, Card, DatePicker, Form, Select, Collapse, Steps, Divider } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import LogDrone from './LogDrone';
import LogProblem from './LogProblem';
import LogIncident from './LogIncident';
import LogUser from './LogUser';
import LogObjMonitor from './LogObjMonitor';
import LogUAV from './LogUAV';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useParams } from "react-router-dom";

var axios = require('axios');
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Panel } = Collapse;
const { Step } = Steps;

function App(props) {
  const user = useSelector(state => state.user.user);

  const tokenDeDieu = 'a8e141fe1a01dc16787a454e168b3f06';
  const tokenCayTrong = 'f5134fcb341b492ea9776485fbd62890';
  const tokenChayRung = '1fa6b94047ba20d998b44ff1a2c78bba';
  const tokenLuoiDien = '3698155aecdf0782cdb3a55fe63a5df4';
  console.log("user.........................")
  console.log(user)

  const [projectType, setProjectType] = useState(props.projectType ? props.projectType : user.type === 'ALL_PROJECT' ? 'de_dieu' : user.type.toLowerCase());
  const [logActivityData, setLogActivityData] = useState(null);
  const [isLoadedLogActivityData, setIsLoadedLogActivity] = useState(false);
  const [rangeTime, setRangeTime] = useState(props.rangeTime ? props.rangeTime : { fromDate: '', toDate: '' })
  const [areaList, setAreaList] = useState(null);
  const [zoneList, setZoneList] = useState(null);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [zoneLoading, setZoneLoading] = useState(false);
  const [disabledStep, setDisabledStep] = useState(2);
  const [selectedCollapseKeys, setSelectedCollapseKeys] = useState(null);

  // 0 : projectType
  // 1 : areaList
  // 2 : zoneList
  // 3 : areaList
  // 4 : areaList
  const resetStatefromOrder = (order) => {

  }


  useEffect(() => {
    //fetchData();
    fetchAreaList();
    fetchZoneListByAreaId();
    setSelectedCollapseKeys([])
  }, [selectedAreaId, projectType]);

  const fetchData = () => {
    setIsLoadedLogActivity(false);
    let url = 'http://14.248.5.197:5012/api/drones?';
    let fromDate = rangeTime.fromDate;
    let toDate = rangeTime.toDate;

    if (fromDate) url += '&minDate=' + fromDate;
    if (toDate) url += '&maxDate=' + toDate;
    url += '&projectType=' + projectType;
    if (props.regionId) url = url + "&regionId=" + props.regionId;

    let config = {
      method: 'get',
      url: url,
      headers: {}
    };

    axios(config)
      .then((response) => {
        let logActivityData = response.data.map((data, index) => ({
          key: index,
          ...data
        }));
        logActivityData.forEach((logData) => {
          for (let key in logData) {
            if (logData[key] == null) logData[key] = '';
          }
        });
        setLogActivityData(logActivityData);
        setIsLoadedLogActivity(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const fetchAreaList = () => {
    let url = 'https://monitoredzoneserver.herokuapp.com/area?page=0';

    let config = {
      method: 'get',
      url: url,
      headers: {
        "token": user.api_token,
        "Content-Type": 'application/json',
      }
    };

    axios(config)
      .then((response) => {
        console.log("arealist............")
        let areaList = response.data.content.monitoredArea.map((data) => ({
          code: data.code,
          id: data._id,
          name: data.name,
          monitoredZone: data.monitoredZone,
        }));
        console.log(areaList);
        setAreaList(areaList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const fetchZoneListByAreaId = () => {
    if (selectedAreaId == null) return;
    console.log(projectType)
    let projectTypeFetch = projectType.toUpperCase();
    let token = null;
    if (projectTypeFetch === "CAY_TRONG") token = tokenCayTrong;
    if (projectTypeFetch === "LUOI_DIEN") token = tokenLuoiDien;
    if (projectTypeFetch === "CHAY_RUNG") token = tokenChayRung;
    if (projectTypeFetch === "DE_DIEU") token = tokenDeDieu;
    setZoneLoading(true);
    let url = 'https://monitoredzoneserver.herokuapp.com/monitoredzone/area/' + selectedAreaId;

    let config = {
      method: 'get',
      url: url,
      headers: {
        "token": token,
        "projectType": projectType,
      }
    };

    axios(config)
      .then((response) => {
        console.log("zonelist............")
        let zoneList = response.data.content.zone.map((data) => ({
          code: data.code,
          id: data._id,
          name: data.name,
          projectType: data.incidentType,
        }));
        console.log(zoneList);
        setZoneList(zoneList);
        setZoneLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onRangePickerChange = (dates, dateStrings) => {
    if (dates) {
      setRangeTime({ fromDate: dates[0].format('YYYY-MM-DDT00:00:00'), toDate: dates[1].format('YYYY-MM-DDT23:59:59') });
    } else {
      setRangeTime({ fromDate: '', toDate: '' });
    }
  }

  const onProjectTypeChange = (projectType) => {
    setProjectType(projectType);
  }

  return (
    <>
      <Col style={{ marginRight: '4%', marginTop: 20, height: 1500 }}>
        <h2>
          Log nghiệp vụ
          </h2>
        <StepLog projectType={projectType} onProjectTypeChange={onProjectTypeChange} rangeTime={rangeTime} onRangePickerChange={onRangePickerChange}
          areaList={areaList}
          zoneList={zoneList}
          setSelectedAreaId={setSelectedAreaId}
          setSelectedZoneId={setSelectedZoneId}
          selectedZoneId={selectedZoneId}
          zoneLoading={zoneLoading}
          disabledStep={disabledStep}
          setDisabledStep={setDisabledStep}
          selectedCollapseKeys={selectedCollapseKeys}
          setSelectedCollapseKeys={setSelectedCollapseKeys}
        />

        <br />
      </Col>
      <BackTop />
    </>
  );
}
export default App;

class StepLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }


  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };

  render() {
    const { current } = this.state;
    let selectedZoneName = null;
    if (this.props.zoneList && this.props.selectedZoneId) {
      selectedZoneName = this.props.zoneList.find(data => data.id == this.props.selectedZoneId)?.name
    }
    console.log("zoneListtttt..............t")
    console.log(selectedZoneName)
    return (
      <>
        <Steps current={current} onChange={this.onChange} direction="vertical">
          <Step title="Chọn loại dự án" description={
            <Select defaultValue={this.props.projectType} style={{ width: 120 }} onChange={(value) => {
              this.props.onProjectTypeChange(value);
              this.props.setDisabledStep(2)
              this.setState({current: 1})
            }}>
              <Option value="de_dieu">Đê điều</Option>
              <Option value="luoi_dien">Lưới điện</Option>
              <Option value="chay_rung">Cháy rừng</Option>
              <Option value="cay_trong">Cây trồng</Option>
            </Select>
          } />
          <Step
            disabled={1 >= this.props.disabledStep}
            title="Chọn Khu vực giám sát" description={
              <Select
                disabled={1 >= this.props.disabledStep}
                showSearch
                style={{ width: 200 }}
                placeholder="Chọn 1 khu vực"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(value) => {this.props.setSelectedAreaId(value); this.props.setDisabledStep(3); this.setState({current: 2})}}
              >
                {
                  this.props.areaList !== null && this.props.areaList.map((data) =>
                    <Option key={data.id} value={data.id}>{data.name}</Option>
                  )
                }
              </Select>
            } />
          <Step title="Chọn miền giám sát"
            disabled={2 >= this.props.disabledStep}
            description={
              <Select
                disabled={2 >= this.props.disabledStep}
                loading={this.props.zoneLoading}
                disabled={this.props.zoneLoading}
                showSearch
                style={{ width: 200 }}
                placeholder="Chọn 1 miền giám sát"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(value) => {this.props.setSelectedZoneId(value);this.props.setDisabledStep(5); this.setState({current: 3}); this.props.setSelectedCollapseKeys([])}}
              >
                {
                  this.props.zoneList !== null && this.props.zoneList.map((data) =>
                    <Option key={data.id} value={data.id}>{data.name}</Option>
                  )
                }
              </Select>
            } />


          <Step
            disabled={3 >= this.props.disabledStep}
            title="Chọn khoảng thời gian cần xem log" description={
              <RangePicker
                disabled={3 >= this.props.disabledStep}
                defaultValue={this.props.rangeTime.fromDate ? [moment(this.props.rangeTime.fromDate, 'YYYY-MM-DDTHH:mm:ss'), moment(this.props.rangeTime.toDate, 'YYYY-MM-DDTHH:mm:ss')] : null}
                format='MM/DD/YYYY'
                onChange={(dates, dateStrings) => {this.props.onRangePickerChange(dates, dateStrings); this.props.setDisabledStep(5); this.props.setSelectedCollapseKeys(null)}}
                onOpenChange={() =>  {this.props.setDisabledStep(5); this.setState({current: 4})}}
              />
            } />
          <Step
            disabled={4 >= this.props.disabledStep}
            title={"Xem các log của dự án tại miền giám sát " + selectedZoneName}
            description={
              <CollapseLog
                disabled={4 >= this.props.disabledStep}
                projectType={this.props.projectType}
                rangeTime={this.props.rangeTime}
                selectedZoneId={this.props.selectedZoneId}
                selectedCollapseKeys={this.props.selectedCollapseKeys}
                setSelectedCollapseKeys={this.props.setSelectedCollapseKeys}
              />
            } />
        </Steps>
      </>
    );
  }
}

class CollapseLog extends React.Component {
  constructor(props) {
    super(props);
  }
  callback = (key) => {
    console.log(key);
  }

  render() {
    let selectedKeys = this.props.selectedCollapseKeys;
    return (

      <Collapse onChange={(keys) => this.props.setSelectedCollapseKeys(keys)}  defaultActiveKey={selectedKeys}>
        <Panel header="Xem các đợt giám sát" key="1" disabled={this.props.disabled}>
          {selectedKeys != null && selectedKeys.find((element) => element === "1") != undefined && <LogUAV projectType={this.props.projectType} rangeTime={this.props.rangeTime} regionId={this.props.selectedZoneId} />}
        </Panel>
        <Panel header="Xem các người dùng hoạt động" key="2" disabled={this.props.disabled}>
          {selectedKeys != null && selectedKeys.find((element) => element === "2") != undefined && <LogUser projectType={this.props.projectType} rangeTime={this.props.rangeTime} regionId={this.props.selectedZoneId} />}
        </Panel>
        <Panel header="Xem các sự cố xảy ra" key="3" disabled={this.props.disabled}>
          {selectedKeys != null && selectedKeys.find((element) => element === "3") != undefined && <LogProblem projectType={this.props.projectType} rangeTime={this.props.rangeTime} regionId={this.props.selectedZoneId} />}
        </Panel>
        <Panel header="Xem các sự cố được giải quyết" key="4" disabled={this.props.disabled}>
          {selectedKeys != null && selectedKeys.find((element) => element === "4") != undefined && <LogIncident projectType={this.props.projectType} rangeTime={this.props.rangeTime} regionId={this.props.selectedZoneId} />}
        </Panel>
        <Panel header="Xem các đối tượng giám sát" key="5" disabled={this.props.disabled}>
          {selectedKeys != null && selectedKeys.find((element) => element === "5") != undefined && <LogObjMonitor projectType={this.props.projectType} rangeTime={this.props.rangeTime} regionId={this.props.selectedZoneId} />}
        </Panel>
      </Collapse>

    )
  }


}
