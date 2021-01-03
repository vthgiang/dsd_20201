import React from 'react';
import { Table, Space, Button, BackTop, Input, Col, Card, DatePicker, Form, Select,Tooltip } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';

export default class UAVActivity extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    filteredInfo: null,
    sortedInfo: null,
    defaultFilteredValue: [],
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
        key: 'rightOutlined',
        render: (value, record) => {
          if (this.state.defaultFilteredValue.length == 0) {
            return (
              <Tooltip title={"Click để xem các log liên quan đến " + record.name}>
                  <Button type="text">
                    <RightOutlined />
                  </Button>
                  
              </Tooltip>
            )
          } else {
            return (
              <Tooltip title={"Click để bỏ chọn " + record.name}>
                  <Button type="text">
                  <DownOutlined />
                  </Button>
                  
              </Tooltip>
            )
          }
          
        }
    
      },
      {
        title: 'Tên kết nối UAV',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
    
      },
      {
        title: 'Id kết nối UAV',
        dataIndex: 'entityId',
        key: 'entityId',
        sorter: (a, b) => a.entityId - b.entityId,
        onFilter: (value, record) => {
          return record.key == value
        },
        defaultFilteredValue: this.state.defaultFilteredValue
    
      },
      {
        title: 'Id miền giám sát',
        dataIndex: 'regionId',
        key: 'regionId',
        sorter: (a, b) => a.regionId - b.regionId,
    
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
        <Table columns={columns} dataSource={this.props.data} loading={this.props.loading} onChange={this.handleChange}  key={this.props.projectType + this.props.rangeTime + this.state.defaultFilteredValue}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                console.log("roowclikckkkkkkkkkkkkkkk")
                console.log(record)
                console.log(rowIndex)
                if (this.state.defaultFilteredValue.length == 0) {
                  this.setState({defaultFilteredValue: [record.key]})
                  this.props.setFilteredObject(record);
                } else {
                  this.setState({defaultFilteredValue: []})
                  this.props.setFilteredObject(null);
                }
                
              }, // click row
              onDoubleClick: event => {}, // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}
        />
      </>
    );
  }
}
