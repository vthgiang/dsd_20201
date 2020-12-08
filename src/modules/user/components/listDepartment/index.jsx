import React, { Fragment, useCallback, useEffect, useState } from "react";
import StyleListDepartment from "./index.style";
import {
    Table,
    Space,
    Col,
    Input,
    Row,
    Button,
    Modal,
    notification,
    message,
} from "antd";
import { getListDepartments, deleteDepartment } from "../../store/services";
import ModalDepartment from "./ModalDepartment";
import { useSelector } from "react-redux";
import { FolderAddOutlined } from "@ant-design/icons";

const { Search } = Input;

const ListDepartment = () => {
    const [visible, setVisible] = useState(false);
    const [filter, setFilter] = useState({ page_size: 20, page_id: 0 });
    const [listDepartment, setListDepartment] = useState([]);
    const [meta, setMeta] = useState([]);
    const [departmentId, setDepartmentId] = useState("");
    const user = useSelector((state) => state.user.user);

    const fetchListDepartment = useCallback(async () => {
        const res = await getListDepartments(filter);
        if (res.status === "successful") {
            setMeta(res.meta);
            setListDepartment(res.result);
        } else {
            setMeta({ page_size: 20, page_id: 0 });
            setListDepartment([]);
            notification.error({
                message: "Lỗi",
                description:
                    res.message && res.message !== ""
                        ? res.message
                        : "Có lỗi. Vui lòng thử lại!",
            });
        }
    }, [filter, user]);

    useEffect(() => {
        fetchListDepartment();
    }, [fetchListDepartment]);

    useEffect(() => {
        if (!visible) {
            setDepartmentId("");
        }
    }, [visible]);

    const handleDelete = async (user) => {
        Modal.confirm({
            title: "Xác nhận?",
            content: "Bạn có thực sự muốn xóa phòng ban này",
            onOk() {
                const res = new Promise((resolve, reject) => {
                    resolve(deleteDepartment(user.id));
                }).catch(() => console.log("Oops errors!"));
                Promise.resolve(res).then((e) => {
                    if (e.status == "successful") {
                        notification.success({
                            message: "Thành công",
                            description: "Xóa phòng ban thành công",
                        });
                        fetchListDepartment();
                    } else {
                        notification.error({
                            message: "Lỗi",
                            description: e.message,
                        });
                    }
                });
            },
            onCancel() {},
        });
    };

    const columns = [
        {
            title: "#",
            render: (text, record, index) => <a>{index + 1}</a>,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        { title: "Description", dataIndex: "description", key: "description" },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Fragment>
                    <Space size="middle" style={{ marginRight: 10 }}>
                        <a onClick={() => handleEdit(record)}>Sửa</a>
                    </Space>
                    <Space size="middle">
                        <a onClick={() => handleDelete(record)}>Xóa</a>
                    </Space>
                </Fragment>
            ),
            width: "10%",
        },
    ];

    const changePagination = (value, pageSize) => {
        setFilter({ ...filter, page_id: value - 1, page_size: pageSize });
    };

    const handleEdit = (record) => {
        setVisible(true);
        setDepartmentId(record.id);
    };

    const handlResetFilter = () => {
        setFilter({
            page_id: 0,
            page_size: 20,
            role: "Chưa xác định",
            status: "Chưa xác định",
        });
    };

    return (
        <StyleListDepartment>
            <Row gutter={[16, 16]}>
                <Col span={12}>Danh sách người dùng</Col>
                <Col flex="right" span={2} offset={10}>
                    <Button
                        block
                        type="primary"
                        onClick={() => setVisible(true)}
                        style={{ width: 200, float: "right" }}
                    >
                        <FolderAddOutlined />
                        Thêm phòng ban
                    </Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Search
                        placeholder="Tìm kiếm"
                        onChange={(e) =>
                            setFilter({
                                ...filter,
                                search: e.target.value,
                                page_id: 0,
                            })
                        }
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={8}></Col>
            </Row>
            <Row>
                <Col span={2} style={{ display: "flex", margin: "0 auto" }}>
                    <Button
                        type="primary"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={handlResetFilter}
                    >
                        Reset
                    </Button>
                </Col>
            </Row>
            <Table
                rowKey="id"
                columns={columns}
                pagination={{
                    total: meta.total_count,
                    pageSize: meta.page_size,
                    onChange: changePagination,
                }}
                dataSource={listDepartment}
            />
            <ModalDepartment
                visible={visible}
                departmentId={departmentId}
                setVisible={setVisible}
                fetchListDepartment={fetchListDepartment}
            />
        </StyleListDepartment>
    );
};
export default ListDepartment;
