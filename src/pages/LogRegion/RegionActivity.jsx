import React, {useState} from 'react';
import {Table, Space, Button, BackTop, Input, Col, Row, Card, DatePicker, Form, Select, Popover, Modal} from 'antd';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import LogDrone from '../LogDrone';
import LogUser from '../LogUser';
import LogWarn from '../LogWarn';
import LogProblem from '../LogProblem';
import LogIncident from '../LogIncident';
import LogObjMonitor from '../LogObjMonitor';
import {Link} from "react-router-dom";

export default class RegionActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchedColumn: '',
      filteredInfo: null,
      sortedInfo: null,
    };
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', JSON.stringify(filters), filters);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({filteredInfo: null});
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
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
        <div style={{padding: 8}}>
          <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{width: 188, marginBottom: 8, display: 'block'}}
          />
          <Space>
            <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined/>}
                size="small"
                style={{width: 90}}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
              Reset
            </Button>
          </Space>
        </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
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
                highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
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
    console.log("handleSearch", selectedKeys, dataIndex);
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({searchText: ''});
  };

  render() {
    let rangeTime = this.props.rangeTime;
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
        ...this.getColumnSearchProps('entityId'),

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
        sorter: (a, b) => new Date(a.timestamp) >= new Date(b.timestamp) ? 1 : -1
      },
      {
        title: 'AuthorId',
        dataIndex: 'authorId',
        key: 'authorId',
        render: authorId => {
          let url = "/log-user?";
          let params;
          if (rangeTime.fromDate != null) {
            params = new URLSearchParams({
              userId: authorId,
              ...rangeTime
            }).toString()
          }
          else {
            params = new URLSearchParams({
              userId: authorId,
            }).toString()
          }
          return (
              <Button>
                <Link to={url + params}>{authorId}</Link>
              </Button>)
        },
      },
      // {
      //   title: 'Action',
      //   dataIndex: 'action',
      //   key: 'action',
      //   render: (text, row) => {
      //
      //     return (<div>
      //           <PopoverShowApp regionName={row.name} regionId={row.entityId} rangeTime={this.props.rangeTime}
      //                           projectType={this.props.projectType}/>
      //         </div>
      //
      //     )
      //
      //   }
      // },
    ];
    return (
        <>
          <Table
              columns={columns}
              dataSource={this.props.data}
              loading={this.props.loading}
              onChange={this.handleChange}
              key={this.props.projectType + this.props.rangeTime}/>
        </>
    );
  }
}

const ModalShowApp = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  const showModal = () => {
    setClicked(true);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setClicked(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setClicked(false);
    setIsModalVisible(false);
  };

  return (
      <>
        <Button type="primary" ghost onClick={() => {
          showModal();
          props.hidePopover()
        }}>
          {props.actionType === 'log_drone' && 'Xem các drone'}
          {props.actionType === 'log_user' && 'Xem các user'}
          {props.actionType === 'log_problem' && 'Xem các sự cố xảy ra'}
          {props.actionType === 'log_obj_monitor' && 'Xem các đối tượng giám sát'}
          {props.actionType === 'log_warn' && 'Xem các cảnh báo'}
          {props.actionType === 'log_problem_resolve' && 'Xem sự cố được giải quyết'}
        </Button>
        <Modal width={1000} title={'Miền hoạt động ' + props.regionName} visible={isModalVisible} onOk={handleOk}
               onCancel={handleCancel}>
          {clicked && props.actionType === 'log_drone' &&
          <LogDrone regionId={props.regionId} rangeTime={props.rangeTime} projectType={props.projectType}/>}
          {clicked && props.actionType === 'log_user' &&
          <LogUser regionId={props.regionId} rangeTime={props.rangeTime} projectType={props.projectType}/>}
          {clicked && props.actionType === 'log_problem' &&
          <LogIncident regionId={props.regionId} rangeTime={props.rangeTime} projectType={props.projectType}/>}
          {clicked && props.actionType === 'log_obj_monitor' &&
          <LogObjMonitor regionId={props.regionId} rangeTime={props.rangeTime} projectType={props.projectType}/>}
          {clicked && props.actionType === 'log_warn' &&
          <LogWarn regionId={props.regionId} rangeTime={props.rangeTime} projectType={props.projectType}/>}
          {clicked && props.actionType === 'log_problem_resolve' &&
          <LogProblem regionId={props.regionId} rangeTime={props.rangeTime} projectType={props.projectType}/>}

        </Modal>
      </>
  );
};

class PopoverShowApp extends React.Component {
  constructor(props) {
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
    this.setState({visible});
  };

  render() {
    const content = (
        <div>
          <h4>Chọn hành động trên miền hoạt động {this.props.regionName}: </h4>
          <Row style={{width: '400px'}} gutter={[10, 10]}>
            <Col span={12}>
              <ModalShowApp regionId={this.props.regionId} regionName={this.props.regionName} hidePopover={this.hide}
                            actionType='log_drone' rangeTime={this.props.rangeTime}
                            projectType={this.props.projectType}/>
            </Col>
            <Col span={12}>
              <ModalShowApp regionId={this.props.regionId} regionName={this.props.regionName} hidePopover={this.hide}
                            actionType='log_user' rangeTime={this.props.rangeTime}
                            projectType={this.props.projectType}/>

            </Col>
            <Col span={12}>
              <ModalShowApp regionId={this.props.regionId} regionName={this.props.regionName} hidePopover={this.hide}
                            actionType='log_problem' rangeTime={this.props.rangeTime}
                            projectType={this.props.projectType}/>

            </Col>
            <Col span={12}>
              <ModalShowApp regionId={this.props.regionId} regionName={this.props.regionName} hidePopover={this.hide}
                            actionType='log_obj_monitor' rangeTime={this.props.rangeTime}
                            projectType={this.props.projectType}/>

            </Col>
            <Col span={12}>
              <ModalShowApp regionId={this.props.regionId} regionName={this.props.regionName} hidePopover={this.hide}
                            actionType='log_warn' rangeTime={this.props.rangeTime}
                            projectType={this.props.projectType}/>

            </Col>
            <Col span={12}>
              <ModalShowApp regionId={this.props.regionId} regionName={this.props.regionName} hidePopover={this.hide}
                            actionType='log_problem_resolve' rangeTime={this.props.rangeTime}
                            projectType={this.props.projectType}/>

            </Col>
          </Row>


        </div>
    )
    return (
        <Popover
            style={{width: 500}}
            content={content}

            trigger="hover"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
        >
          <Button type="primary">Action</Button>
        </Popover>
    );
  }
}
