import React, {useEffect, useState, useRef} from 'react';
import {Table, Space, Button, BackTop, Input, Col, Card, DatePicker, Form, Select} from 'antd';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import UAVActivity from './UAVActivity';
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment';
import {createRangeTime, filterLog} from "../../services/utils";

var axios = require('axios');
const {RangePicker} = DatePicker;
const {Option} = Select;

function App(props) {
  const query = new URLSearchParams(props.location.search);
  const user = useSelector(state => state.user.user);
  const [filter, setFilter] = useState({
    entityId: query.get("uavConnectId"),
    regionId: query.get("regionId"),
  });
  const [projectType, setProjectType] = useState(props.projectType ? props.projectType : user.type === 'ALL_PROJECT' ? 'de_dieu' : user.type.toLowerCase());
  const [logActivityData, setLogActivityData] = useState(null);
  const [isLoadedLogActivityData, setIsLoadedLogActivity] = useState(false);

  const [rangeTime, setRangeTime] = useState(createRangeTime(
      query.get("fromDate"), query.get("toDate"), props.rangeTime
  ));

  useEffect(() => {
    fetchData();
  }, [projectType, rangeTime]);

  const fetchData = () => {
    setIsLoadedLogActivity(false);
    let url = 'http://14.248.5.197:5012/api/uav-connect?';
    let fromDate = rangeTime.fromDate;
    let toDate = rangeTime.toDate;

    if (fromDate) url += '&minDate=' + fromDate;
    if (toDate) url += '&maxDate=' + toDate;
    url += '&projectType=' + projectType;

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
          })).reverse(); // sort by timestamp
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

  const onProjectTypeChange = (projectType) => {
    setProjectType(projectType);
  }

  return (
      <>
        <Col style={{marginRight: '4%', marginTop: 20}}>

          <h2>
            Log Flight Hub
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

          </Form>
          <br/>
          <UAVActivity data={filterLog(logActivityData, filter)} loading={!isLoadedLogActivityData}
                       rangeTime={rangeTime} projectType={projectType}/>


        </Col>
        <BackTop/>
      </>
  );
}

export default App;