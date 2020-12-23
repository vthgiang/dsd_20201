import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  ConfigProvider,
  Spin,
  Select,
  Checkbox,
  Calendar,
  DatePicker,
  message,
} from 'antd';
import '../Styles/StyleSettingSchedule.css';
import axios from 'axios';
import moment from 'moment';
import URL_API from './url';
const { Option } = Select;
const SettingSchedule = () => {
  const [dataSettingSchedule, setDataSettingSchedule] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);
  const [loadingTable, setLoadingTable] = useState(true);
  const [creatingNewItem, setCreatingNewItem] = useState(false);
  const [edittingItem, setEdittingItem] = useState(false);
  const [idItemEditing, setIdItemEditing] = useState(null);

  const [valueDateEdit, setValueDateEdit] = useState(null);
  const [checkboxSaturdayEdit, setCheckboxSaturdayEdit] = useState(false);
  const [checkboxSundayEdit, setCheckboxSundayEdit] = useState(false);
  const [listDayoffEdit, setListDayoffEdit] = useState([]);

  const API_TOKEN = '4c901bcdba9f440a2a7c31c0bcbd78ec';
  const CURRENT_TYPE = 'LUOI_DIEN';
  const childrenDay = [];
  for (let i = 1; i <= 31; i++) {
    childrenDay.push(<Option key={i}>{i}</Option>);
  }
  const customFormat = (value) => {
    return `Tháng ${value.format('MM/YYYY')}`;
  };
  const getDataSetting = () => {
    axios({
      method: 'get',
      url: URL_API + '/schedule-setting/listing',
      // url: URL_API + "/report/listing",
      headers: {
        'api-token': API_TOKEN,
        'project-type': CURRENT_TYPE,
      },
    })
      .then(function (response) {
        // console.log(response);
        //handle success
        // setDataIncidents(response.data[0].tasks);
        response.data.map((item) => {
          if (item.off_days) {
            let listOffDays = item.off_days.split(',');
            item.off_days = listOffDays;
          }
        });
        setDataSettingSchedule([]);
        setTimeout(() => {
          setDataSettingSchedule(response.data);
        }, 100);
        setLoadingTable(false);
      })
      .catch(function (err) {
        //handle error
        console.log(err);
        setLoadingTable(false);
      });
  };
  const submitEditItem = (item) => {
    axios({
      method: 'put',
      url: URL_API + '/schedule-setting/update',
      // url: URL_API + "/report/listing",
      headers: {
        'api-token': API_TOKEN,
        'project-type': CURRENT_TYPE,
      },
      params: {
        id: item.id,
        off_saturday: item.off_saturday,
        off_sunday: item.off_sunday,
        off_days: item.off_days,
      },
    })
      .then(function (response) {
        getDataSetting();
      })
      .catch(function (err) {
        //handle error
        console.log(err);
        setLoadingTable(false);
      });
  };
  const removeItem = () => {
    // setLoadingTable(true);
    // axios({
    //   method: "put",
    //   url: URL_API + "/schedule-setting/update",
    //   // url: URL_API + "/report/listing",
    //   headers: {
    //     "api-token": API_TOKEN,
    //     "project-type": CURRENT_TYPE,
    //   },
    //   params: {
    //     id: item.id,
    //     off_saturday: item.off_saturday,
    //     off_sunday: item.off_sunday,
    //     off_days: item.off_days,
    //   },
    // })
    //   .then(function (response) {
    //     getDataSetting();
    //   })
    //   .catch(function (err) {
    //     //handle error
    //     console.log(err);
    //     setLoadingTable(false);
    //   });
  };
  const createNewItem = () => {
    let month = valueDateEdit.split('/')[0];
    let year = valueDateEdit.split('/')[1];
    setLoadingTable(true);
    axios({
      method: 'post',
      url: URL_API + '/schedule-setting/set',
      // url: URL_API + "/report/listing",
      headers: {
        'api-token': API_TOKEN,
        'project-type': CURRENT_TYPE,
      },
      data: {
        month: month,
        year: year,
        off_saturday: checkboxSaturdayEdit ? 1 : 0,
        off_sunday: checkboxSundayEdit ? 1 : 0,
        off_days: listDayoffEdit.toString(),
      },
    })
      .then(function (response) {
        getDataSetting();
        setCreatingNewItem(false);
      })
      .catch(function (err) {
        //handle error
        console.log(err);
        message.error(err.response.data.error.message);
        setLoadingTable(false);
      });
  };
  useEffect(() => {
    getDataSetting();
  }, []);
  const refDatePickerEdit = React.createRef();
  const refCheckBoxSaturday = React.createRef();
  const refCheckBoxSunday = React.createRef();
  const refSelectDayOff = React.createRef();
  const EditableCell = (itemBeforeEdit, onChange) => {
    return (
      <div className="itemSettingSelected">
        <div style={{ display: 'none' }}>Đang sửa bản ghi</div>
        <span>
          <DatePicker
            ref={refDatePickerEdit}
            defaultValue={moment(valueDateEdit, 'MM/YYYY')}
            onChange={(date, dateString) => {
              setValueDateEdit(moment(date).format('MM/YYYY'));
            }}
            picker="month"
            format={customFormat}
          />
        </span>
        <span style={{ marginLeft: 20 }}>
          <Checkbox
            ref={refCheckBoxSaturday}
            checked={checkboxSaturdayEdit}
            onChange={() => {
              setCheckboxSaturdayEdit(!checkboxSaturdayEdit);
            }}
          >
            Nghỉ thứ 7
          </Checkbox>
          <Checkbox
            ref={refCheckBoxSunday}
            checked={checkboxSundayEdit}
            onChange={() => {
              setCheckboxSundayEdit(!checkboxSundayEdit);
            }}
          >
            Nghỉ chủ nhật
          </Checkbox>
        </span>
        <span style={{ marginLeft: 20 }}>
          <Select
            ref={refSelectDayOff}
            size="small"
            mode="multiple"
            onChange={(value) => {
              setListDayoffEdit(value);
            }}
            style={{ width: 200 }}
            placeholder={'Ngày nghỉ trong tuần'}
            defaultValue={listDayoffEdit ? listDayoffEdit : null}
          >
            {childrenDay}
          </Select>
        </span>
      </div>
    );
  };
  const starteditingItem = (idItem) => {
    const newData = dataSettingSchedule;
    const target = dataSettingSchedule.find((item) => idItem === item.id);
    const preTarget = newData.find((item) => idItemEditing === item.id);
    if (preTarget) {
      preTarget.isEditing = false;
    }
    if (target) {
      target.isEditing = true;
      setIdItemEditing(idItem);
      setDataSettingSchedule(newData);
      setValueDateEdit(target.month + '/' + target.year);
      setCheckboxSaturdayEdit(target.off_saturday);
      setCheckboxSundayEdit(target.off_sunday);
      setListDayoffEdit(target.off_days);
    }
  };
  const editItemSetting = (idItem) => {
    setIdItemEditing(null);
    setItemSelected(null);
    // setDataSettingSchedule(dataSettingSchedule);
    let itemEdited = {
      id: idItem,
      off_saturday: checkboxSaturdayEdit ? 1 : 0,
      off_sunday: checkboxSundayEdit ? 1 : 0,
      off_days: listDayoffEdit.toString(),
    };
    setLoadingTable(true);
    submitEditItem(itemEdited);
  };
  const setItemSetting = () => {};
  const columns = [
    {
      title: null,
      dataIndex: 'name',
      render: (valueRow, item) => {
        return item.id && item.isEditing == true ? (
          EditableCell(item)
        ) : item.id ? ( //select an item preset
          <div
            className="itemSetting"
            onClick={() => {
              setItemSelected(item.id);
            }}
          >
            <span>
              <DatePicker
                defaultValue={moment(item.month + '/' + item.year, 'MM/YYYY')}
                onChange={null}
                picker="month"
                format={customFormat}
                disabled
              />
            </span>
            <span style={{ marginLeft: 20 }}>
              <Checkbox checked={item.off_sunday} onChange={null} disabled>
                Nghỉ thứ 7
              </Checkbox>
              <Checkbox checked={item.off_saturday} onChange={null} disabled>
                Nghỉ chủ nhật
              </Checkbox>
            </span>
            <span style={{ marginLeft: 20 }}>
              <Select
                size="small"
                mode="multiple"
                // onChange={{}}
                style={{ width: 200 }}
                placeholder={'Ngày nghỉ trong tuần'}
                defaultValue={item.off_days ? item.off_days : null}
                disabled
              >
                {childrenDay}
              </Select>
            </span>
            <span
              className="actionButtonItem"
              style={
                item.selected == true
                  ? { float: 'right', marginRight: 5 }
                  : { display: 'none' }
              }
              onClick={() => {
                removeItem();
              }}
            >
              Xóa
            </span>
            <span style={item.selected == true ? {} : { display: 'none' }}>
              <span style={{ float: 'right', marginRight: 5 }}> | </span>
              <span
                className="actionButtonItem"
                style={{ float: 'right', marginRight: 5 }}
                onClick={() => {
                  starteditingItem(item.id);
                }}
              >
                Sửa
              </span>
            </span>
          </div>
        ) : (
          //create new preset
          <div className="itemSetting">
            <span>
              <DatePicker
                onChange={(date, dateString) => {
                  setValueDateEdit(moment(date).format('MM/YYYY'));
                }}
                picker="month"
                format={customFormat}
              />
            </span>
            <span style={{ marginLeft: 20 }}>
              <Checkbox
                checked={checkboxSaturdayEdit}
                onChange={() => {
                  setCheckboxSaturdayEdit(!checkboxSaturdayEdit);
                }}
              >
                Nghỉ thứ 7
              </Checkbox>
              <Checkbox
                checked={checkboxSundayEdit}
                onChange={() => {
                  setCheckboxSundayEdit(!checkboxSundayEdit);
                }}
              >
                Nghỉ chủ nhật
              </Checkbox>
            </span>
            <span style={{ marginLeft: 20 }}>
              <Select
                size="small"
                mode="multiple"
                onChange={(value) => {
                  setListDayoffEdit(value);
                }}
                style={{ width: 200 }}
                placeholder={'Ngày nghỉ trong tuần'}
              >
                {childrenDay}
              </Select>
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Cấu hình lịch làm việc</h1>
      <div className="listSettingSchedule">
        <Spin spinning={loadingTable} tip="Loading...">
          <Table
            rowKey={(record) => record.id}
            dataSource={dataSettingSchedule}
            pagination={false}
            onRow={(item) => {
              return {
                rowKey: item.id,
                // onClick: () => {
                //   this.gotoPresetPTZCamera(preset.token);
                //   // console.log(preset);
                // },
              };
            }}
            rowClassName={(item) => {
              if (item.id == itemSelected) {
                item.selected = true;
                return 'choosenItem';
              } else {
                item.selected = false;
                return null;
              }
            }}
            columns={columns}
          >
            {/* <Column title={null} dataIndex="name" key="name" /> */}
          </Table>
          <div className="button-save">
            <Button
              type="primary"
              style={{ float: 'right', right: 30, width: 100 }}
              disabled={creatingNewItem || idItemEditing ? false : true}
              onClick={() => {
                if (idItemEditing) {
                  editItemSetting(idItemEditing);
                } else {
                  createNewItem();
                }
              }}
            >
              Lưu
            </Button>
            {creatingNewItem || idItemEditing ? (
              <Button
                type="primary"
                style={{ float: 'right', right: 45, width: 100 }}
                disabled={creatingNewItem || idItemEditing ? false : true}
                onClick={() => {
                  // if (idItemTokenEditing == null) {
                  //   dataPresets.pop();
                  //   filterDataPresets.pop();
                  // }
                  // let newData = [...dataPresets];
                  // newData.map((preset) => {
                  //   preset.isEditing = false;
                  // });
                  // let newDataFilter = [...filterDataPresets];
                  // newDataFilter.map((preset) => {
                  //   preset.isEditing = false;
                  // });
                  // this.setState({
                  //   dataPresets: newData,
                  //   filterDataPresets: newDataFilter,
                  //   creatingNewPreset: false,
                  //   itemSelected: null,
                  //   presetTokenEditing: null,
                  // });
                  dataSettingSchedule.map((item) => {
                    item.isEditing = false;
                  });
                  setIdItemEditing(null);
                  setItemSelected(null);
                  if (idItemEditing == null) {
                    setLoadingTable(true);
                    getDataSetting();
                  } else {
                    setDataSettingSchedule(dataSettingSchedule);
                  }
                }}
              >
                Hủy
              </Button>
            ) : (
              <Button
                type="primary"
                style={{ float: 'right', right: 45, width: 100 }}
                disabled={creatingNewItem || idItemEditing ? true : false}
                onClick={() => {
                  dataSettingSchedule.map((item) => {
                    item.isEditing = false;
                  });
                  setIdItemEditing(null);
                  setItemSelected(null);
                  setDataSettingSchedule(dataSettingSchedule);
                  setCreatingNewItem(true);
                  let newItem = {
                    id: null,
                  };
                  setDataSettingSchedule([...dataSettingSchedule, newItem]);
                  // this.setState({
                  //   dataPresets: [...dataPresets, newPreset],
                  //   filterDataPresets: [...filterDataPresets, newPreset],
                  //   creatingNewPreset: true,
                  //   presetTokenEditing: null,
                  //   invalidValueInput: false,
                  //   itemSelected: null,
                  // });
                }}
              >
                Thêm
              </Button>
            )}
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default SettingSchedule;
