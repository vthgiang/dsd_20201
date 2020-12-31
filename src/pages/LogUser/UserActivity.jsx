import React, {useState} from 'react';
import {
  Table,
  Space,
  Button,
  BackTop,
  Input,
  Col,
  Row,
  Card,
  DatePicker,
  Form,
  Select,
  Popover,
  Modal,
  Tooltip
} from 'antd';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import LogDrone from '../LogDrone';
import LogUser from '../LogUser';
import LogWarn from '../LogWarn';
import LogProblem from '../LogProblem';
import LogIncident from '../LogIncident';
import LogObjMonitor from '../LogObjMonitor';
import LogPayload from '../LogPayLoad';
import LogImage from '../LogImage';
import LogVideo from '../LogVideo';
import {Link} from "react-router-dom";

export default class UserActivity extends React.Component {
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
        title: 'Id người dùng',
        dataIndex: 'targetId',
        key: 'targetId',
        sorter: (a, b) => a.targetId - b.targetId,

      },
      {
        title: 'Mã sự cố',
        dataIndex: 'incidentId',
        key: 'incidentId',
        sorter: (a, b) => a.incidentId - b.incidentId,

      },
      {
        title: 'Mã giải quyết sự cố',
        dataIndex: 'resolveProblemId',
        key: 'resolveProblemId',
        sorter: (a, b) => a.resolveProblemId - b.resolveProblemId,

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
        title: 'Mã miền',
        dataIndex: 'regionId',
        key: 'regionId',
        ...this.getColumnSearchProps('regionId'),
        render: (regionId) => {
          let url = "/log-region?";
          let params;
          if (rangeTime.fromDate != null) {
            params = new URLSearchParams({
              regionId: regionId,
              ...rangeTime
            }).toString()
          } else {
            params = new URLSearchParams({
              regionId: regionId,
            }).toString()
          }
          return (
              <Button type={"primary"}>
                <Link to={url + params}>{regionId}</Link>
              </Button>)
        }
      },
      {
        title: 'Id người thực hiện',
        dataIndex: 'targetId',
        key: 'targetId',
        ...this.getColumnSearchProps('targetId'),
      },
      {
        title: 'Tên người thực hiện',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Metadata',
        dataIndex: 'metadata',
        key: 'metadata',
        ...this.getColumnSearchProps('metadata'),
        ellipsis: {
          showTitle: false,
        },
        render: data => (
            <Tooltip placement="topLeft" title={data}>
              {data}
            </Tooltip>
        ),
      },
      // {
      //   title: 'Action',
      //   dataIndex: 'action',
      //   key: 'action',
      //   render: (text, row) => {

      //     return (<div>
      //       <PopoverShowApp droneName={row.name} droneId={row.targetId} rangeTime={this.props.rangeTime} projectType={this.props.projectType} />
      //     </div>

      //     )

      //   }
      // },
    ];
    return (
        <>
          <Table columns={columns} dataSource={this.props.data} loading={this.props.loading}
                 onChange={this.handleChange} key={this.props.projectType + this.props.rangeTime}/>
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
          {props.actionType === 'log_payload' && 'Xem payload được gắn'}
          {props.actionType === 'log_video' && 'Xem video thu thập được'}
          {props.actionType === 'log_image' && 'Xem ảnh chụp'}
        </Button>
        <Modal width={1000} title={props.droneName + ', mã id ' + props.droneId} visible={isModalVisible}
               onOk={handleOk} onCancel={handleCancel}>
          {clicked && props.actionType === 'log_payload' &&
          <LogPayload droneId={props.droneId} rangeTime={props.rangeTime} projectType={props.projectType}/>}
          {clicked && props.actionType === 'log_video' &&
          <LogVideo droneId={props.droneId} rangeTime={props.rangeTime} projectType={props.projectType}/>}
          {clicked && props.actionType === 'log_image' &&
          <LogImage droneId={props.droneId} rangeTime={props.rangeTime} projectType={props.projectType}/>}
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
          <h4>Chọn hành động do người dùng id {this.props.droneId} thực hiện: </h4>
          <Row style={{width: '400px'}} gutter={[10, 10]}>
            <Col span={12}>
              <ModalShowApp droneId={this.props.droneId} droneName={this.props.droneName} hidePopover={this.hide}
                            actionType='log_problem' rangeTime={this.props.rangeTime}
                            projectType={this.props.projectType}/>
            </Col>
            <Col span={12}>
              <ModalShowApp droneId={this.props.droneId} droneName={this.props.droneName} hidePopover={this.hide}
                            actionType='log_resolve_problem' rangeTime={this.props.rangeTime}
                            projectType={this.props.projectType}/>
            </Col>
            <Col span={12}>
              <ModalShowApp droneId={this.props.droneId} droneName={this.props.droneName} hidePopover={this.hide}
                            actionType='log_warn' rangeTime={this.props.rangeTime}
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