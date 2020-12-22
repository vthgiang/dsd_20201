import React, { Fragment, useCallback, useEffect, useState } from "react";
import StyleListUser from "./index.style";
import { Table, Tag, Space, Modal, notification } from "antd";
import { getListUsers, deleteUser, getAllRoles } from "../../store/services";
import ModalUser from "./ModalUser";
import { useSelector } from "react-redux";
import { formatPhone } from "../../Utils/helper";
import Filter from "./Filter";
import { getAllDepartments } from "../../store/services";

const ListUser = () => {
    const [visible, setVisible] = useState(false);
    const [filter, setFilter] = useState({ page_size: 20, page_id: 0 });
    const [listUser, setListUser] = useState([]);
    const [meta, setMeta] = useState([]);
    const [userId, setUserId] = useState("");
    const user = useSelector((state) => state.user.user);
    const [mode, setMode] = useState("");

    const [listDepartments, setListDepartments] = useState([]);

    const fetchDepartments = async () => {
        const res = await getAllDepartments();
        setListDepartments(res.result);
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const [listRoles, setListRoles] = useState([]);

    const fetchRoles = async () => {
        const res = await getAllRoles();
        setListRoles(res.result);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

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
                description: res.message && res.message !== "" ? res.message : "Có lỗi. Vui lòng thử lại!",
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
            render: (text, record, index) => <a onClick={() => handleView(record)}>{index + 1}</a>,
        },
        {
            title: "Tên",
            dataIndex: "full_name",
            key: "full_name",
            render: (text, record) => <a onClick={() => handleView(record)}>{text}</a>,
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
                <Tag color={status == "ACTIVE" ? "success" : status == "PENDING" ? "geekblue" : "red"} key={status}>
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
                            : role == "INCIDENT_STAFF"
                            ? "cyan"
                            : "magenta"
                    }
                    key={role}>
                    {role}
                </Tag>
            ),
        },
        {
            title: "Phòng ban",
            key: "department",
            dataIndex: "department",
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
        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <Fragment>
                    <Space size='middle' style={{ marginRight: 10 }}>
                        <a onClick={() => handleEdit(record)}>Sửa</a>
                    </Space>
                    <Space size='middle'>
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
        setMode("update");
        setUserId(record.id);
    };

    const handleView = (record) => {
        setVisible(true);
        setMode("detail");
        setUserId(record.id);
    };

    return (
        <StyleListUser>
            <Filter setFilter={setFilter} setVisible={setVisible} filter={filter} setMode={setMode} listDepartments={listDepartments} listRoles={listRoles} />
            <Table
                rowKey='id'
                columns={columns}
                pagination={{
                    total: meta.total_count,
                    pageSize: meta.page_size,
                    onChange: changePagination,
                }}
                dataSource={listUser}
            />
            <ModalUser visible={visible} userId={userId} setVisible={setVisible} fetchListUser={fetchListUser} mode={mode} setMode={setMode} listDepartments={listDepartments} listRoles={listRoles} />
        </StyleListUser>
    );
};
export default ListUser;
