import React, {useEffect, useState, useRef} from 'react';
import {Table, Space, Button, BackTop, Input, Col, Card, DatePicker, Form, Select} from 'antd';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import RegionActivity from './RegionActivity';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from 'react-router-dom';
import {buildQuery, createRangeTime, filterLog} from "../../services/utils"

var axios = require('axios');
const {RangePicker} = DatePicker;
const {Option} = Select;

function App(props) {
  const query = new URLSearchParams(props.location.search);
  console.log("handle log region: ", query.toString());
  const user = useSelector(state => state.user.user);
  const [filter, setFilter] = useState({entityId: query.get("regionId")});
  const [projectType, setProjectType] = useState(user.type === 'ALL_PROJECT' ? 'de_dieu' : user.type.toLowerCase());
  const [logActivityData, setLogActivityData] = useState(null);
  const [isLoadedLogActivityData, setIsLoadedLogActivity] = useState(false);
  const [rangeTime, setRangeTime] = useState(createRangeTime(
      query.get("fromDate"), query.get("toDate"), props.rangeTime
  ));
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, [projectType, rangeTime]);

  const fetchData = () => {
    setIsLoadedLogActivity(false);
    let url = 'http://14.248.5.197:5012/api/monitor-region';
    let fromDate = rangeTime.fromDate;
    let toDate = rangeTime.toDate;
    let params = {
      projectType: projectType,
      fromDate: fromDate ? fromDate : undefined,
      toDate: toDate ? toDate : undefined
    };

    axios.get(url, {params: params})
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

  const onRangePickerChange = (dates, dateStrings) => {
    if (dates) {
      setRangeTime({fromDate: dates[0].format('YYYY-MM-DDT00:00:00'), toDate: dates[1].format('YYYY-MM-DDT23:59:59')});
    } else {
      setRangeTime({fromDate: '', toDate: ''});
    }
  }

  const onProjectTypeChange = (projectType) => {
    setProjectType(projectType);
  }

  const handleChoose = function (value) {
    history.push(buildQuery("/log-region", {
      regionId: value
    }));
    if (value) {
      setFilter({
        entityId: value.toString()
      })
    } else {
      setFilter({
        entityId: null
      })
    }
  }


  let logIndex = [];
  return (
      <>
        <Col style={{marginRight: '4%', marginTop: 20}}>
          <h2>
            Lịch sử log miền hoạt động
          </h2>
          <br/>
          <Form layout="inline">
            <Form.Item
                label="Chọn khoảng thời gian">
              <RangePicker format='MM/DD/YYYY'
                           onChange={(dates, dateStrings) => onRangePickerChange(dates, dateStrings)}/>

            </Form.Item>
            {user.role === 'SUPER_ADMIN' ?
                <Form.Item label="Chọn loại dự án">
                  <Select defaultValue={projectType} style={{width: 120}} onChange={(value) => {
                    onProjectTypeChange(value);
                  }}>
                    <Option value="de_dieu">Đê điều</Option>
                    <Option value="luoi_dien">Lưới điện</Option>
                    <Option value="chay_rung">Cháy rừng</Option>
                    <Option value="cay_trong">Cây trồng</Option>
                  </Select>
                </Form.Item>
                : <></>
            }
            {logActivityData && <Form.Item label="Region">
              <Select style={{width: 170}} onChange={handleChoose} value={filter.entityId}>
                <Option value={null}>All Region</Option>
                {logActivityData.map(function (log) {
                  if (logIndex.indexOf(log.entityId) === -1) {
                    logIndex.push(log.entityId)
                    return (<Option value={log.entityId}>{log.name}</Option>)
                  }
                })}
              </Select>
            </Form.Item>}
          </Form>
          {filter.entityId != null && filter.entityId !== "null" && <Form style={{marginTop: "15px"}}>
            <Button><Link to={buildQuery(
                "/log-user", {regionId: filter.entityId}
            )}>User</Link></Button>
            <Button type={"ghost"}><Link to={buildQuery(
                "/log-objmonitor", {regionId: filter.entityId}
            )}>Monitor Object</Link></Button>
            <Button><Link to={buildQuery(
                "/log-problem", {regionId: filter.entityId}
            )}>Sự cố</Link></Button>
            <Button><Link to={buildQuery(
                "/log-incident", {regionId: filter.entityId}
            )}>Xử lý sự cố</Link></Button>
          </Form>}
          <br/>
          <RegionActivity
              data={filterLog(logActivityData, filter)}
              loading={!isLoadedLogActivityData}
              rangeTime={rangeTime}
              projectType={projectType}
          />
        </Col>
        <BackTop/>
      </>
  );
}

export default App;