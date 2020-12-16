import React, { Fragment, useCallback, useEffect, useState } from "react";
import StyleListUser from "./index.style";
<<<<<<< HEAD
import {
    Table,
    Tag,
    Space,
    Modal,
    notification,
} from "antd";
import { getListUsers, deleteUser, getAllDepartments } from "../../store/services";
=======
import { Table, Tag, Space, Modal, notification } from "antd";
import { getListUsers, deleteUser } from "../../store/services";
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
import ModalUser from "./ModalUser";
import { useSelector } from "react-redux";
import { formatPhone } from "../../Utils/helper";
import Filter from "./Filter";

const ListUser = () => {
    const [visible, setVisible] = useState(false);
    const [filter, setFilter] = useState({ page_size: 20, page_id: 0 });
    const [listUser, setListUser] = useState([]);
    const [meta, setMeta] = useState([]);
    const [userId, setUserId] = useState("");
    const user = useSelector((state) => state.user.user);
<<<<<<< HEAD
=======
    const [mode, setMode] = useState("");
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e

    const fetchListUser = useCallback(async () => {
        const res = await getListUsers(filter);
        if (res.status === "successful") {
            setMeta(res.meta);
            setListUser(res.result);
        } else {
            setMeta({ page_size: 20, page_id: 0 });
            setListUser([]);
            notification.error({
                message: "Lỗi",
<<<<<<< HEAD
                description:
                    res.message && res.message !== ""
                        ? res.message
                        : "Có lỗi. Vui lòng thử lại!",
=======
                description: res.message && res.message !== "" ? res.message : "Có lỗi. Vui lòng thử lại!",
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
            });
        }
    }, [filter, user]);

    useEffect(() => {
        fetchListUser();
    }, [fetchListUser]);

    useEffect(() => {
        if (!visible) {
            setUserId("");
        }
    }, [visible]);

    const handleDelete = async (user) => {
        Modal.confirm({
            title: "Xác nhận?",
            content: "Bạn có thực sự muốn xóa người dùng này",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk() {
                const res = new Promise((resolve, reject) => {
                    resolve(deleteUser(user.id));
                }).catch(() => console.log("Oops errors!"));
                Promise.resolve(res).then((e) => {
                    if (e.status == "successful") {
                        notification.success({
                            message: "Thành công",
                            description: "Xóa người dùng thành công",
                        });
                        fetchListUser();
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
<<<<<<< HEAD
            render: (text, record, index) => <a>{index + 1}</a>,
=======
            render: (text, record, index) => <a onClick={() => handleView(record)}>{index + 1}</a>,
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
        },
        {
            title: "Tên",
            dataIndex: "full_name",
            key: "full_name",
<<<<<<< HEAD
            render: (text) => <a>{text}</a>,
=======
            render: (text, record) => <a onClick={() => handleView(record)}>{text}</a>,
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "20%",
            render: (text) => <p style={{ wordBreak: "break-word" }}>{text}</p>,
        },
        {
            title: "Sdt",
            dataIndex: "phone",
            key: "phone",
            width: "10%",
            render: (text) => <p>{formatPhone(text)}</p>,
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            width: "30%",
            render: (text) => <p style={{ wordBreak: "break-word" }}>{text}</p>,
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: (status) => (
<<<<<<< HEAD
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
=======
                <Tag color={status == "ACTIVE" ? "success" : status == "PENDING" ? "geekblue" : "red"} key={status}>
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
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
<<<<<<< HEAD
                            : "cyan"
                    }
                    key={role}
                >
=======
                            : role == "INCIDENT_STAFF"
                            ? "cyan"
                            : "magenta"
                    }
                    key={role}>
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
                    {role}
                </Tag>
            ),
        },
        {
            title: "Phòng ban",
            key: "department",
            dataIndex: "department",
<<<<<<< HEAD
            render: (department) => (
                <div>{department ? department.name : ""}</div>
            ),
        },
        (user.role == "SUPER_ADMIN" ? {
            title: "Dự án",
            key: "type",
            dataIndex: "type",
            width: "10%",
            render: (type) => (
                <Tag
                    color={
                        type == "CHAY_RUNG"
                            ? "red"
                            : type == "DE_DIEU"
                            ? "cyan"
                            : type == "CAY_TRONG"
                            ? "green"
                            : "purple"
                    }
                    key={type}
                >
                    {type}
                </Tag>
            ),
        } : {}),
=======
            render: (department) => <div>{department ? department.name : ""}</div>,
        },
        user.role == "SUPER_ADMIN"
            ? {
                  title: "Dự án",
                  key: "type",
                  dataIndex: "type",
                  width: "10%",
                  render: (type) => (
                      <Tag color={type == "CHAY_RUNG" ? "red" : type == "DE_DIEU" ? "cyan" : type == "CAY_TRONG" ? "green" : type == "LUOI_DIEN" ? "processing" : "purple"} key={type}>
                          {type}
                      </Tag>
                  ),
              }
            : {},
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <Fragment>
<<<<<<< HEAD
                    <Space size="middle" style={{ marginRight: 10 }}>
                        <a onClick={() => handleEdit(record)}>Sửa</a>
                    </Space>
                    <Space size="middle">
=======
                    <Space size='middle' style={{ marginRight: 10 }}>
                        <a onClick={() => handleEdit(record)}>Sửa</a>
                    </Space>
                    <Space size='middle'>
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
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
<<<<<<< HEAD
=======
        setMode("update");
        setUserId(record.id);
    };

    const handleView = (record) => {
        setVisible(true);
        setMode("detail");
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
        setUserId(record.id);
    };

    return (
        <StyleListUser>
<<<<<<< HEAD
            <Filter setFilter={setFilter} setVisible={setVisible} filter={filter}/>
            <Table
                rowKey="id"
=======
            <Filter setFilter={setFilter} setVisible={setVisible} filter={filter} setMode={setMode} />
            <Table
                rowKey='id'
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
                columns={columns}
                pagination={{
                    total: meta.total_count,
                    pageSize: meta.page_size,
                    onChange: changePagination,
                }}
                dataSource={listUser}
            />
<<<<<<< HEAD
            <ModalUser
                visible={visible}
                userId={userId}
                setVisible={setVisible}
                fetchListUser={fetchListUser}
            />
=======
            <ModalUser visible={visible} userId={userId} setVisible={setVisible} fetchListUser={fetchListUser} mode={mode} setMode={setMode} />
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
        </StyleListUser>
    );
};
export default ListUser;
