import React from 'react';
import { Table, Space, Button, BackTop, Input, Col, Card, DatePicker, Form, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
var axios = require('axios');
const { RangePicker } = DatePicker;
const {Option} = Select;

class DroneActivity extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    filteredInfo: null,
    sortedInfo: null,
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'time',
      },
    });
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    
    const columns = [
      {
        title: 'Tên miền giám sát',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
    
      },
      {
        title: 'Id miền giám sát',
        dataIndex: 'entityId',
        key: 'entityId',
        sorter: (a, b) => a.entityId - b.entityId,
    
      },
      {
        title: 'trạng thái',
        dataIndex: 'state',
        key: 'state',
        sorter: (a, b) => a.state - b.state,
      },
      {
        title: 'Hành động',
        dataIndex: 'type',
        key: 'type',
        ...this.getColumnSearchProps('type'),
        
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
        ...this.getColumnSearchProps('description'),
      },
      {
        title: 'Thời gian',
        dataIndex: 'timestamp',
        key: 'timestamp',
        sorter: (a, b) => new Date(a.timestamp) >= new Date(b.timestamp) ? 1: -1
      },
      {
        title: 'Id người thực hiện',
        dataIndex: 'authorId',
        key: 'authorId',
        ...this.getColumnSearchProps('authorId'),
      },
    ];
    return (
      <>
        <Table columns={columns} dataSource={this.props.data} loading={this.props.loading} onChange={this.handleChange} />
      </>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectType: 'de_dieu',
      fromDate: '',
      toDate: '',
      logActivityData: null,
      isLoadedLogActivityData: false,
    };
    this.onRangePickerChange = this.onRangePickerChange.bind(this);
    this.setLogActivityData = this.setLogActivityData.bind(this);
  }

  onProjectTypeChange = (projectType) => {
    console.log("hahahaha" + projectType)
    this.setState({projectType: projectType});
  }

  setLogActivityData() {
    let url = null;
    let fromDate = this.state.fromDate;
    let toDate = this.state.toDate;
    if (fromDate && toDate) {
      url = 'https://it4883logging.herokuapp.com/api/monitor-region?minDate=' + fromDate +'&maxDate=' + toDate +'&projectType=' + this.state.projectType;
    } else {
      url = 'https://it4883logging.herokuapp.com/api/monitor-region?projectType=' + this.state.projectType;
    }
     
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
          for(let key in logData) {
            if (logData[key] == null) logData[key] ='';
          }
        });
        this.setState({ logActivityData: logActivityData, isLoadedLogActivityData: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRangePickerChange(dates, dateStrings) {
    this.setState({isLoadedLogActivityData:false});
    let fromDate = "";
    let toDate = "";

    if (dates) {
      fromDate = dates[0].format('YYYY-MM-DDThh:mm:ss');
      toDate = dates[1].format('YYYY-MM-DDThh:mm:ss');
    }

    this.setLogActivityData();
    
  }

  componentDidMount(){
    this.setLogActivityData();
  }
  render() {
    return (
      <>
        <Col style={{ marginRight: '4%', marginTop: 20 }}>
          <Card
            hoverable
            style={{ width: '100', marginLeft: 40 }}
            cover={
              <img
                style={{ height: 400 }}
                alt="example"
                src="https://i.pinimg.com/originals/11/9d/e3/119de34b79d90fc7ee2c175525726741.jpg"
              />
            }
          >
            <h2>
              Lịch sử hoạt động của miền giám sát
            </h2>
            <br />
            <Form layout="inline" >
              <Form.Item
                label="Chọn khoảng thời gian"
              >
                <RangePicker format='DD/MM/YYYY' onChange={(dates, dateStrings) => this.onRangePickerChange(dates, dateStrings)} />
              </Form.Item>
              <Form.Item
                label="Chọn loại dự án"
              >
                <Select defaultValue="de_dieu" style={{ width: 120 }} onChange={(value) => {this.setState({isLoadedLogActivityData:false});this.onProjectTypeChange(value); this.setLogActivityData()}}>
                  <Option value="de_dieu">Đê điều</Option>
                  <Option value="luoi_dien">Lưới điện</Option>
                  <Option value="chay_rung">Cháy rừng</Option>
                  <Option value="cay_trong">Cây trồng</Option>
                </Select>
              </Form.Item>
            </Form>
            <br />
              <DroneActivity data={this.state.logActivityData} loading={!this.state.isLoadedLogActivityData}/>
            
          </Card>
        </Col>
      </>
    );
  }
}
function LogDrone() {
  return (
    <>
      <App />
      <BackTop />
    </>
  );
}
export default LogDrone;