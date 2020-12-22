import React, {useState} from 'react';
import { Table, Space, Button, BackTop, Input, Col, Card, DatePicker, Form, Select, Popover, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import LogDrone from '../LogDrone';
import LogUser from '../LogUser';
import LogWarn from '../LogWarn';
import LogProblem from '../LogProblem';
import LogIncident from '../LogIncident';
import LogObjMonitor from '../LogObjMonitor';

export default class RegionActivity extends React.Component {
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
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, row) => {
          
          return(<div>
            <PopoverShowApp regionName={row.name} regionId={row.entityId} />
          </div>
            
          )
          
        }
      },
    ];
    return (
      <>
        <Table columns={columns} dataSource={this.props.data} loading={this.props.loading} onChange={this.handleChange} />
      </>
    );
  }
}

const ModalShowApp = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick= {() =>{showModal(); props.hidePopover()}}>
        {props.actionType === 'log_drone' && 'Xem các drone'}
        {props.actionType === 'log_user' && 'Xem các user'}
        {props.actionType === 'log_problem' && 'Xem các sự cố xảy ra'}
        {props.actionType === 'log_obj_monitor' && 'Xem các đối tượng giám sát'}
        {props.actionType === 'log_warn' && 'Xem các cảnh báo'}
        {props.actionType === 'log_problem_resolve' && 'Xem sự cố được giải quyết'}
      </Button>
      <Modal width={1000} title={'Miền hoạt động ' + props.regionName} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {props.actionType === 'log_drone' && <LogDrone regionId={props.regionId} />}
        {props.actionType === 'log_user' && <LogUser regionId={props.regionId} /> }
        {props.actionType === 'log_problem' && <LogIncident regionId={props.regionId} /> }
        {props.actionType === 'log_obj_monitor' && <LogObjMonitor regionId={props.regionId} /> }
        {props.actionType === 'log_warn' && <LogWarn regionId={props.regionId} /> }
        {props.actionType === 'log_problem_resolve' && <LogProblem regionId={props.regionId} /> }
        
      </Modal>
    </>
  );
};

class PopoverShowApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    };
  }
  hide = () => {
    this.setState({
      visible: false,
    });
  };
  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    const content = (
      <div>
        <h4>Chọn hành động trên miền hoạt động {this.props.name}: </h4>
        <Space direction="vertical">
          <ModalShowApp regionId={this.props.regionId} regionName={this.props.regionName} hidePopover={this.hide} actionType='log_drone' />
          <ModalShowApp regionId={this.props.regionId} regionName={this.props.regionName} hidePopover={this.hide} actionType='log_user' />
          <ModalShowApp regionId={this.props.regionId} regionName={this.props.regionName} hidePopover={this.hide} actionType='log_problem' />
          <ModalShowApp regionId={this.props.regionId} regionName={this.props.regionName} hidePopover={this.hide} actionType='log_obj_monitor' />
          <ModalShowApp regionId={this.props.regionId} regionName={this.props.regionName} hidePopover={this.hide} actionType='log_warn' />
          <ModalShowApp regionId={this.props.regionId} regionName={this.props.regionName} hidePopover={this.hide} actionType='log_problem_resolve' />
        </Space>
        
      </div>
    )
    return (
      <Popover
        style={{ width: 500 }}
        content={ <div>{content} <a onClick={this.hide}>Close</a></div>}
        title={"Miền hoạt động " + this.props.regionName}
        trigger="hover"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Button type="primary">Action</Button>
      </Popover>
    );
  }
}
