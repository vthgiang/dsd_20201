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

const ListSupports = () => {
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
            url: process.env.REACT_APP_DOMAIN_API + "/report/listing",
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
            "employee_id": 102,
            "incident_id": 4,
            "content": "Chúng tôi cần thêm 2 người",
            "status": "waiting",
            "type": "222222",
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
            title: "Mã sự cố",
            dataIndex: "incident_id",
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

    const getListSupport  = () => {
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
                Danh sách yêu cầu giúp đỡ
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

export default ListSupports;
