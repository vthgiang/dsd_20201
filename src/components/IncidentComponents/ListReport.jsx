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
import URL_API from "./url";

const ListReport = () => {
    const [dataIncidents, setDataIncidents] = useState([]);
    const [contentModal, setContentModal] = useState(null);
    const [visibleModal, setVisibleModal] = useState(false);
    const { pathname } = useLocation();
    const codeIncidents = {
        fire: "222222",
        dike: "111111",
        tree: "333333",
        highVoltageGrid: "000000",
    };
    useEffect(() => {
        const currentType = `${pathname.split(/[/,/]+/)[1]}`;
        const codeType = codeIncidents[currentType];
        axios({
            method: "get",
            url: URL_API + "/report/listing",
            params: { id: codeType },
        })
            .then(function (response) {
                //handle success
                setDataIncidents(response.data.data[0].tasks);
            })
            .catch(function (err) {
                //handle error
                console.log(err);
            });
    }, []);

    const data = [
        {
            "id": 1,
            "employee_id": 100,
            "task_id": 1,
            "content": "Đã xử lý xong sự cố. Xin hãy xác nhận",
            "status": "doing",
            "type": "000000",
            "created_at": null,
            "updated_at": null
        },
        {
            "id": 2,
            "employee_id": 100,
            "task_id": 2,
            "content": "Đã xử lý xong sự cố. Hãy kiểm tra",
            "status": "done",
            "type": "000000",
            "created_at": null,
            "updated_at": null
        }
    ]


    const columns = [
        {
            title: "Mã nhân viên",
            dataIndex: "employee_id",
        },
        {
            title: "Mã công việc",
            dataIndex: "task_id",
        },
        {
            title: "Nội dung xử lý sự cố",
            dataIndex: "content",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (text, record) => (
                record.status == "waiting" ?
                    <div style={{ flexDirection: 'row', display: "flex", alignItems: 'center' }}>
                        <div style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 5 }}>
                        </div>
                        <p style={{ marginLeft: 10, fontSize: 18, marginTop: 10 }}> {record.status}</p>

                    </div>
                    : record.status == "doing" ?
                        <div style={{ flexDirection: 'row', display: "flex", alignItems: 'center' }}>
                            <div style={{ width: 10, height: 10, backgroundColor: 'orange', borderRadius: 5 }}>
                            </div>
                            <p style={{ marginLeft: 10, fontSize: 18, marginTop: 10 }}> {record.status}</p>

                        </div>
                        : <div style={{ flexDirection: 'row', display: "flex", alignItems: 'center' }}>
                            <div style={{ width: 10, height: 10, backgroundColor: 'greenyellow', borderRadius: 5 }}>
                            </div>
                            <p style={{ marginLeft: 10, fontSize: 18, marginTop: 10 }}> {'done'}</p>

                        </div>
            )
        },
        {
            title: "Loại sự cố",
            dataIndex: "type",
            render: (text, record) => (
                record.type == "000000" ?
                    <p>Xử lý sự cố lưới điện</p>
                    : record.type == "111111" ?
                        <p>Xử lý sự cố đê điều</p>
                        : record.type == "222222" ?
                            <p>Xử lý sự cố cây trồng</p>
                            : <p>Xử lý sự cố cháy rừng</p>
            )
        },
        {
            title: "Khởi tạo",
            dataIndex: "created_at",
        },
        {
            title: "Cập nhật lần cuối",
            dataIndex: "updated_at",
        },
    ];

    const getListReport = () => {
        console.log(process.env.REACT_APP_DOMAIN_API);
    };

    const handleOk = () => {
        setVisibleModal(false);
    };
    const handleCancel = () => {
        setVisibleModal(false);
    };
    return (
        <div>
            <div class="header" onClick={() => { }}>
                Danh sách báo cáo kết quả xử lý sự cố
            </div>
            <div>
                <Table columns={columns} dataSource={data} size="middle" />
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

export default ListReport;
