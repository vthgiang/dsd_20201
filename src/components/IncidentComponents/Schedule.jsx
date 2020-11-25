import React, { useEffect, useState } from "react";
import "./Styles/StyleListIncidents.css";
import { Table, Modal, Button } from "antd";
import { Link, useLocation, useHistory } from "react-router-dom";
import {
    CheckOutlined,
    CloseOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import URL_API from "./url";

const Schedule = () => {
    const [dataWorkings, setDataWorking] = useState([]);
    const [value, onChange] = useState(new Date());
    // const [day, setDay] = useState(0);
    // const [month, setMonth] = useState(0);
    // const [year, setYear] = useState(0);
    const [curentDate, setCurrentDate] = useState(new Date());
    const { pathname } = useLocation();
    const codeIncidents = {
        fire: "222222",
        dike: "111111",
        tree: "333333",
        highVoltageGrid: "000000",
    };
    useEffect(() => {
        console.log(curentDate.getDate(), curentDate.getMonth() + 1, curentDate.getFullYear())
        axios({
            method: "get",
            url: URL_API + "/schedule/detail",
            params: { day: curentDate.getDate(), month: curentDate.getMonth() + 1, year: curentDate.getFullYear() },
        })
            .then(function (response) {
                console.log(response)
                //handle success
                setDataWorking(response.data);
            })
            .catch(function (err) {
                //handle error
                console.log(err);
            });
    }, []);




    const columns = [
        {
            title: "Mã nhân viên",
            dataIndex: "employee_id",
        },
        {
            title: "Tên nhân viên",
            dataIndex: "name",
        },
    ];

    const getListWork = (value, event) => {
        console.log(value)
        setCurrentDate(value)
        axios({
            method: "get",
            url: URL_API + "/schedule/detail",
            params: { day: value.getDate(), month: value.getMonth() + 1, year: value.getFullYear() },
        })
            .then(function (response) {
                console.log(response)
                //handle success
                setDataWorking(response.data);
            })
            .catch(function (err) {
                //handle error
                console.log(err);
            });
    }

    return (
        <div>
            <div>
                Chọn ngày làm việc
            </div>
            <Calendar
                onClickDay={(value, event) => getListWork(value, event)}
                value={value}
            />
            <div class="header" onClick={() => { }}>
                {`Lịch làm việc ngày ${curentDate.getDate()} tháng ${curentDate.getMonth() + 1} năm ${curentDate.getFullYear()}`}
            </div>


            <div>
                <Table columns={columns} dataSource={dataWorkings} size="middle" />
            </div>
            {/* <Modal
                title={null}
                visible={visibleModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>{contentModal}</p>
            </Modal> */}
        </div>
    );
};

export default Schedule;
