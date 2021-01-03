import React, {useEffect, useState, useRef} from 'react';
import {Table, Space, Button, BackTop, Input, Col, Card, DatePicker, Form, Select} from 'antd';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import UserActivity from './UserActivity';
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment';
import {useHistory, useParams} from "react-router-dom";
import {buildQuery, createRangeTime, filterLog} from "../../services/utils";

var axios = require('axios');
const {RangePicker} = DatePicker;
const {Option} = Select;

function App(props) {
  const query = new URLSearchParams(props.location.search);
  console.log("handle log user: ", query.toString());
  const user = useSelector(state => state.user.user);
  const [filter, setFilter] = useState({
    targetId: query.get("userId"),
    problemId: query.get("problemId"),
    regionId: query.get("regionId"),
  });
  const [projectType, setProjectType] = useState(props.projectType ? props.projectType : user.type === 'ALL_PROJECT' ? 'de_dieu' : user.type.toLowerCase());
  const [logActivityData, setLogActivityData] = useState([]);
  const [isLoadedLogActivityData, setIsLoadedLogActivity] = useState(false);
  const [rangeTime, setRangeTime] = useState(createRangeTime(
      query.get("fromDate"), query.get("toDate"), props.rangeTime
  ));

  useEffect(() => {
    fetchData();
  }, [projectType, rangeTime]);

  const fetchData = () => {
    setIsLoadedLogActivity(false);
    let url = 'http://14.248.5.197:5012/api/user';
    let fromDate = rangeTime.fromDate;
    let toDate = rangeTime.toDate;
    let params = {
      projectType: projectType
    };
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;

    axios.get(url, {
      params: params
    })
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
    if (dates) setRangeTime({
      fromDate: dates[0].format('YYYY-MM-DDT00:00:00'),
      toDate: dates[1].format('YYYY-MM-DDT23:59:59')
    });
  }

  const history = useHistory();
  const handleChooseUser = function (value) {
    if (value) {
      setFilter({
        targetId: value.toString(),
        regionId: null
      })
      history.push(buildQuery("/log-user", {
        userId: value
      }));
    } else {
      setFilter({
        targetId: null,
        regionId: null
      })
    }
  }

  const handleChooseRegion = function (value) {
    if (value) {
      setFilter({
        regionId: value.toString(),
        targetId: null,
      })
      history.push(buildQuery("/log-user", {
        regionId: value
      }));
    } else {
      setFilter({
        regionId: null,
        targetId: null,
      })
    }
  }

  const onProjectTypeChange = (projectType) => {
    setProjectType(projectType);
  }

  const logIndex = [];
  const regionId = [];
  logActivityData.forEach(log => {
    if (regionId.indexOf(log.regionId) === -1) {
      regionId.push(log.regionId)
    }
  })
  regionId.sort();

  return (
      <>
        <Col style={{marginRight: '4%', marginTop: 20}}>

          <h2>
            Log lịch sử hoạt động user
          </h2>
          <br/>
          <Form layout="inline">
            <Form.Item
                label="Chọn khoảng thời gian"
            >
              <RangePicker
                  defaultValue={rangeTime.fromDate ? [moment(rangeTime.fromDate, 'YYYY-MM-DDTHH:mm:ss'), moment(rangeTime.toDate, 'YYYY-MM-DDTHH:mm:ss')] : null}
                  format='MM/DD/YYYY'
                  onChange={(dates, dateStrings) => onRangePickerChange(dates, dateStrings)}
              />
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
            {logActivityData &&
            <>
              <Form.Item label="User">
                <Select style={{width: 170}} onChange={handleChooseUser}
                        value={filter.targetId}>
                  <Option value={null}>All User</Option>
                  {logActivityData.map(function (log) {
                    if (logIndex.indexOf(log.targetId) === -1) {
                      logIndex.push(log.targetId)
                      return (<Option value={log.targetId}>{log.name}</Option>)
                    }
                  })}
                </Select>
              </Form.Item>
              <Form.Item label="Region">
                <Select style={{width: 170}} onChange={handleChooseRegion}
                        value={filter.regionId}>
                  <Option value={null}>All Region</Option>
                  {regionId.map(id => (<Option value={id}>{id}</Option>))}
                </Select>
              </Form.Item>
            </>}

          </Form>
          <br/>
          <UserActivity data={filterLog(logActivityData, filter)} loading={!isLoadedLogActivityData}
                        rangeTime={rangeTime}
                        projectType={projectType}/>


        </Col>
        <BackTop/>
      </>
  );
}

export default App;