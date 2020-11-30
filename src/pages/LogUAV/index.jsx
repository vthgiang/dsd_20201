import { Table, Input, Button, Space,BackTop,DatePicker,Form,Col,Card,Radio} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons'
import React from 'react';
var axios = require('axios');
const { RangePicker } = DatePicker;

class ConnectUAVActivity extends React.Component {
  
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
    let { sortedInfo} = this.state;
    sortedInfo = sortedInfo || {};
   
    const columns = [
      {
        title: 'ID',
        dataIndex: 'entityId',
        key: 'entityId',
        sorter: (a, b) => a.entityId - b.entityId,
        sortOrder: sortedInfo.columnKey === 'entityId' && sortedInfo.order,
      },
      {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Hành động',
        dataIndex: 'type',
        key: 'type',
        ...this.getColumnSearchProps('type'),
      },
      {
        title: 'Mô tả',
        key: 'description',
        dataIndex: 'description',
        ...this.getColumnSearchProps('description'),
      },
      {
        title: 'Thời gian',
        key: 'timestamp',
        dataIndex: 'timestamp',
        sorter: (a, b) => a.timestamp - b.name.timstamp,
        sortOrder: sortedInfo.columnKey === 'timstamp' && sortedInfo.order,
      },
      {
        title: 'Trạng thái',
        key: 'state',
        dataIndex: 'state',
        ...this.getColumnSearchProps('state'),
      }
    ];
    return (
      <>
      <Table columns={columns} dataSource={this.props.data} loading={this.props.loading} onChange={this.handleChange} />
      </>
          );
  }
}
class ConnectUAV extends React.Component {
  
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
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
 
    const columns = [
      {
        title: 'ID',
        dataIndex: 'entityId',
        key: 'entityId',
        sorter: (a, b) => a.entityId - b.entityId,
        sortOrder: sortedInfo.columnKey === 'entityId' && sortedInfo.order,
      },
      {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Hành động',
        dataIndex: 'type',
        key: 'type',
        ...this.getColumnSearchProps('type'),
      },
      {
        title: 'Mô tả',
        key: 'description',
        dataIndex: 'description',
        ...this.getColumnSearchProps('description'),
      },
      {
        title: 'Thời gian',
        key: 'timestamp',
        dataIndex: 'timestamp',
        sorter: (a, b) => a.timestamp- b.timestamp,
        sortOrder: sortedInfo.columnKey === 'timestamp' && sortedInfo.order,
      },
     
    ];
    return (
      <>
        <Table columns={columns} dataSource={this.props.data} loading={this.props.loading} onChange={this.handleChange}/>
      </>
    );
  }
}
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tableShow: '',
      fromDate: '',
      toDate: '',
      logData: null,
      logActivityData: null,
      isLoadedLogData: false,
      isLoadedLogActivityData: false,
    };
    this.onTableShowChange = this.onTableShowChange.bind(this);
    this.onRangePickerChange = this.onRangePickerChange.bind(this);
    this.setLogData = this.setLogData.bind(this);
    this.setLogActivityData = this.setLogActivityData.bind(this);
  }

  onTableShowChange(tableShow){
    this.setState({tableShow: tableShow});
  }

  setLogData(fromDate, toDate) {
    let url = null;
    if (fromDate && toDate) {
      url = 'https://it4883logging.herokuapp.com/api/uav-connect?minDate=' + fromDate +'&maxDate=' + toDate +'&username=G12&password=123';
    } else {
      url = 'https://it4883logging.herokuapp.com/api/uav-connect?username=G12&password=123';
    }
     
    let config = {
      method: 'get',
      url: url,
      headers: {}
    };

    axios(config)
      .then((response) => {
        let connectData = response.data.map((connect, index) => ({
          key: index,
          entityId: connect.entityId,
          name:connect.name,
          description: connect.description,
          timestamp:connect.timestamp,
          type:connect.type,
          state:connect.state,
        }));
        connectData.forEach((connectData) => {
          for(let key in connectData) {
            console.log(connectData[key])
            if (connectData[key] == null) connectData[key] ='';
          }
        });
        this.setState({ logData: connectData, isLoadedLogData: true });
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setLogActivityData(fromDate, toDate) {
    let url = null;
    if (fromDate && toDate) {
      url = 'https://it4883logging.herokuapp.com/api/activity/uav-connect?minDate=' + fromDate +'&maxDate=' + toDate +'&username=G12&password=123';
    } else {
      url = 'https://it4883logging.herokuapp.com/api/activity/uav-connect?username=G12&password=123';
    }
     
    let config = {
      method: 'get',
      url: url,
      headers: {}
    };
    axios(config)
      .then((response) => {
        let connectActivityData = response.data.map((connect, index) => ({
          key: index,
          entityId: connect.entityId,
          name: connect.name,
          type: connect.type,
          description: connect.description,
          timestamp: connect.timestamp,
          state:connect.state,
        }));
        connectActivityData.forEach((connectData) => {
          for(let key in connectData) {
            if (connectData[key] == null) connectData[key] ='';
          }
        });
        this.setState({ logActivityData: connectActivityData, isLoadedLogActivityData: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRangePickerChange(dates, dateStrings) {
    this.setState({isLoadedLogData: false, isLoadedLogActivityData:false});
    let fromDate = "";
    let toDate = "";

    if (dates) {
      fromDate = dates[0].format('YYYY-MM-DDThh:mm:ss');
      toDate = dates[1].format('YYYY-MM-DDThh:mm:ss');
    }

    this.setLogData(fromDate, toDate);
    this.setLogActivityData(fromDate, toDate);
    
  }

  componentDidMount(){
    this.setLogData(null, null);
    this.setLogActivityData(null, null);
  }
  render() {
    return (
      <>
       <Col  style={{marginRight:'4%',marginTop:20}}>
            <Card
            hoverable
          style={{ width: '100',marginLeft:40 }}
          cover={
            <img
            style={{height:400}}
              alt="example"
              src="https://store.hp.com/app/assets/images/uploads/prod/how-to-operate-drone-camera-hero1563465531828438.jpg"
            />
          }
        >
 <h1>
          Chọn thời gian bạn muốn kiểm tra lịch sử kết nối UAV
        </h1>
        <br/>
        <Form rules={[{ required: true, message: 'Bạn chưa chọn thời gian!' }]}>
              <Space direction="vertical" size={12}>
                <RangePicker format='DD/MM/YYYY' onChange={(dates, dateStrings) => this.onRangePickerChange(dates, dateStrings)} />
              </Space >
            </Form>
            <br />

            <Radio.Group buttonStyle="solid" onChange={(e) => {this.onTableShowChange(e.target.value)}} style={{marginBottom:'20px'}}>
              <Radio.Button value="log">Log</Radio.Button>
              <Radio.Button value="logActivity">LogActivity</Radio.Button>
            </Radio.Group>
            <br />
            
            <div style={{ display: this.state.tableShow === 'log' ? "block" : "none" }}>
              <ConnectUAV data={this.state.logData} loading={!this.state.isLoadedLogData}/>
            </div>
            <div style={{ display: this.state.tableShow === 'logActivity' ? "block" : "none" }}>
              <ConnectUAVActivity data={this.state.logActivityData} loading={!this.state.isLoadedLogActivityData}/>
            </div>
            
      </Card>
      </Col>
      
      </>
    );
  }
}
function LogUAV(){
  return(
    <>
<App />
<BackTop/>
</>
  );
  }
  export default LogUAV;