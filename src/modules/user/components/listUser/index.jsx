import React, { Fragment, useCallback, useEffect, useState } from "react";
import StyleListUser from "./index.style";
import {
    Table,
    Tag,
    Space,
    Col,
    Input,
    Row,
    Select,
    Button,
    Modal,
    Form,
    DatePicker,
    notification,
} from "antd";
import { getListUsers } from "../../store/services";
import { roles, statuses } from "../../config/UserConfig";
import ModalUser from "./ModalUser";
import { useSelector } from "react-redux";
import { UserAddOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const ListUser = () => {
    const [visible, setVisible] = useState(false);
    const [filter, setFilter] = useState({ page_size: 20, page_id: 0 });
    const [listUser, setListUser] = useState([]);
    const [meta, setMeta] = useState([]);
    const [userId, setUserId] = useState("");
    const user = useSelector((state) => state.user.user);

    const fetchListUser = useCallback(async () => {
        const res = await getListUsers(filter, user.type);
        setMeta(res.meta);
        setListUser(res.result);
    }, [filter, user]);

    useEffect(() => {
        fetchListUser();
    }, [fetchListUser]);

    useEffect(() => {
        if (!visible) {
            setUserId("");
        }
    }, [visible]);

    const handleDelete = () => {
        Modal.confirm({
            title: "Xác nhận?",
            content: "Bạn có thực sự muốn xóa người dùng này",
            onOk() {
                notification.success({
                    message: "Thành công",
                    description: "Xóa người dùng thành công",
                });
            },
            onCancel() {
            },
        });
    };

    const columns = [
        {
            title: "#",
            render: (text, record, index) => <a>{index + 1}</a>,
        },
        {
            title: "Tên",
            dataIndex: "full_name",
            key: "full_name",
            render: (text) => <a>{text}</a>,
        },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Sdt", dataIndex: "phone", key: "phone" },
        { title: "Địa chỉ", dataIndex: "address", key: "address", width: "30%" },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: (status) => (
                <Tag
                    color={
                        status == "ACTIVE"
                            ? "success"
                            : status == "PENDING"
                            ? "geekblue"
                            : "red"
                    }
                    key={status}
                >
                    {status}
                </Tag>
            ),
        },
        {
            title: "Chức vụ",
            key: "role",
            dataIndex: "role",
            render: (role) => (
                <Tag
                    color={
                        role == "ADMIN"
                            ? "success"
                            : role == "SUPERVISOR"
                            ? "geekblue"
                            : role == "MANAGER"
                            ? "orange"
                            : role == "DRONE_STAFF"
                            ? "purple"
                            : "cyan"
                    }
                    key={role}
                >
                    {role}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Fragment>
                    <Space size="middle" style={{ marginRight: 10 }}>
                        <a onClick={() => handleEdit(record, "user")}>Edit</a>
                    </Space>
                    <Space size="middle">
                        <a onClick={handleDelete}>Delete</a>
                    </Space>
                </Fragment>
            ),
            width: "10%",
        },
    ];

    const renderSelectStatus = (type) => (
        <Select
            className="select-box"
            value={filter.status}
            onChange={(value) => setFilter({ ...filter, status: value })}
            defaultValue="Chưa xác định"
            style={{ width: "75%", marginLeft: 10 }}
        >
            {statuses.map((status, index) => {
                return (
                    <Option key={index} value={status.code}>
                        {status.name}
                    </Option>
                );
            })}
        </Select>
    );

    const renderSelectRole = (type) => (
        <Select
            className="select-box"
            value={filter.role}
            onChange={(value) => setFilter({ ...filter, role: value })}
            defaultValue="Chưa xác định"
            style={{ width: "75%", marginLeft: 10 }}
        >
            {roles.map((status, index) => {
                return (
                    <Option key={index} value={status.code}>
                        {status.name}
                    </Option>
                );
            })}
        </Select>
    );

    const changePagination = (value, pageSize) => {
        setFilter({ ...filter, page_id: value - 1, page_size: pageSize });
    };

    const handleEdit = (record, type) => {
        setVisible(true);
        setUserId(record.id);
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
        <StyleListUser>
            <Row gutter={[16, 16]}>
                <Col span={12}>List Users</Col>
                <Col flex="right" span={2} offset={10}>
                    <Button
                        block
                        type="primary"
                        onClick={() => setVisible(true)}
                        style={{ width: 120 }}
                    >
                        <UserAddOutlined />
                        New User
                    </Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Search
                        placeholder="Tìm kiếm"
                        onChange={(e) =>
                            setFilter({ ...filter, search: e.target.value })
                        }
                    />
                </Col>
                <Col span={7}>
                    <label htmlFor="">Trạng thái</label>
                    {renderSelectStatus("filter")}
                </Col>
                <Col span={7}>
                    <label htmlFor="">Chức vụ</label>
                    {renderSelectRole("filter")}
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                </Col>
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
                dataSource={listUser}
                
            />
            <ModalUser
                visible={visible}
                userId={userId}
                setVisible={setVisible}
                fetchListUser={fetchListUser}
            />
        </StyleListUser>
    );
};
export default ListUser;
