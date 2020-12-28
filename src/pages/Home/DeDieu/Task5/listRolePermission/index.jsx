import React, { Fragment, useCallback, useEffect, useState } from "react";
import StyleListPermission from "./index.style";
import { Table, Space, Modal, notification, Tag } from "antd";
import { getAllPermissions, getAllRoles, getListRolePermissions } from "../../../../../modules/user/store/services";
import ModalRolePermission from "./ModalRolePermission";
import moment from "moment";
import Filter from "./Filter";

const ListRolePermission = () => {
    const [visible, setVisible] = useState(false);
    const [filter, setFilter] = useState({ page_size: 20, page_id: 0 });
    const [listRolePermission, setListRolePermission] = useState([]);
    const [meta, setMeta] = useState([]);
    const [rolePermissionId, setRolePermissionId] = useState("");
    const [mode, setMode] = useState("");
    const [listRoles, setListRoles] = useState([]);
    const [listPermissions, setListPermissions] = useState([]);

    const fetchRoles = async () => {
        const res = await getAllRoles();
        setListRoles(res.result);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchPermissions = async () => {
        const res = await getAllPermissions();
        setListPermissions(res.result);
    };

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchListRolePermission = useCallback(async () => {
        const res = await getListRolePermissions(filter);
        if (res.status === "successful") {
            setMeta(res.meta);
            setListRolePermission(res.result);
        } else {
            setMeta({ page_size: 20, page_id: 0 });
            setListRolePermission([]);
            notification.error({
                message: "Lỗi",
                description: res.message && res.message !== "" ? res.message : "Có lỗi. Vui lòng thử lại!",
            });
        }
    }, [filter]);

    useEffect(() => {
        fetchListRolePermission();
    }, [fetchListRolePermission]);

    useEffect(() => {
        if (!visible) {
            setRolePermissionId("");
        }
    }, [visible]);

    const columns = [
        {
            title: "#",
            render: (text, record, index) => <a onClick={() => handleView(record)}>{index + 1}</a>,
        },
        {
            title: "Chức vụ",
            dataIndex: "role",
            key: "role",
            render: (role) => <div>{role ? role.code : ""}</div>,
        },
        {
            title: "Quyền",
            dataIndex: "permission",
            key: "permission",
            render: (permission) => <div>{permission ? permission.resource : ""}</div>,
        },
        {
            title: "Truy cập",
            dataIndex: "access",
            key: "access",
            render: (type) => (
                <Tag color={type == "ACTIVE" ? "green" : "purple"} key={type}>
                    {type}
                </Tag>
            ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "created_at",
            key: "created_at",
            render: (text) => <p>{moment(text).format("mm:hh DD-MM-YYYY")}</p>,
        },
        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <Fragment>
                    <Space size='middle' style={{ marginRight: 10 }}>
                        <a onClick={() => handleEdit(record)}>Sửa</a>
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
        setRolePermissionId(record.id);
    };

    const handleView = (record) => {
        setVisible(true);
        setMode("detail");
        setRolePermissionId(record.id);
    };

    return (
        <StyleListPermission>
            <Filter setFilter={setFilter} setVisible={setVisible} filter={filter} setMode={setMode} listPermissions={listPermissions} listRoles={listRoles} />
            <Table
                rowKey='id'
                columns={columns}
                pagination={{
                    total: meta.total_count,
                    pageSize: meta.page_size,
                    onChange: changePagination,
                }}
                dataSource={listRolePermission}
            />
            <ModalRolePermission
                mode={mode}
                setMode={setMode}
                visible={visible}
                rolePermissionId={rolePermissionId}
                setVisible={setVisible}
                fetchListRolePermission={fetchListRolePermission}
                listRoles={listRoles}
                listPermissions={listPermissions}
            />
        </StyleListPermission>
    );
};
export default ListRolePermission;
