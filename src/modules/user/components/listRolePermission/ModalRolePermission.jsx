import { Form, Input, Modal, Row, notification, Select, DatePicker } from "antd";
import { getRolePermission, updateRolePermission } from "../../store/services";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
const { Option } = Select;
export const accesses = [
    {
        name: "Truy cập",
        code: "ACTIVE",
    },
    {
        name: "Vô hiệu hóa",
        code: "INACTIVE",
    },
];

const ModalRolePermission = ({ rolePermissionId, setVisible, visible, fetchListRolePermission, mode, setMode, listPermissions, listRoles }) => {
    const [rolePermission, setRolePermission] = useState({});
    const [message, setMessage] = useState({});
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (!visible) {
            setRolePermission({
                type: "Chưa xác định",
            });
        }
    }, [visible]);

    useEffect(() => {
        if (mode == "update") {
            setTitle("Cập nhật");
        } else {
            setTitle("Thông tin chi tiết");
        }
    }, [mode]);

    const fetchRolePermission = useCallback(async () => {
        try {
            const res = await getRolePermission(rolePermissionId);
            if (res.status === "successful") {
                setRolePermission(res.result);
            }
        } catch (error) {}
    }, [rolePermissionId]);

    useEffect(() => {
        if (rolePermissionId) {
            fetchRolePermission();
        } else {
            setRolePermission({});
        }
    }, [fetchRolePermission, setRolePermission]);

    const handleSave = async () => {
        var res = {};
        if (!validateData()) {
            return;
        }
        const dataRolePermission = buildUserData();
        var description = "";
        if (rolePermissionId && rolePermissionId != "") {
            dataRolePermission.id = rolePermissionId;
            res = await updateRolePermission(dataRolePermission);
            description = "Cập nhật thành công!";
        }
        if (res.status === "successful") {
            fetchListRolePermission();
            notification.success({
                message: "Thành công",
                description: description,
            });
            handleCloseModal();
        } else {
            var errorMessage = "";
            if (res.message && res.message != "") {
                errorMessage = res.message;
            } else {
                errorMessage = res.result;
            }
            notification.error({
                message: "",
                description: errorMessage,
            });
        }
    };

    const validateData = useCallback(() => {
        var retval = true;
        if (typeof rolePermission.access === "undefined" || rolePermission.access === "") {
            retval = false;
            setMessage({
                value: "Vui lòng chọn trạng thái truy cập!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        return retval;
    });

    const renderSelectAccess = () => (
        <Select
            disabled={mode == "detail"}
            className='select-box'
            value={rolePermission?.access}
            onChange={(value) => setRolePermission({ ...rolePermission, access: value })}
            defaultValue='Chưa xác định'
            style={{ width: "100%" }}>
            {accesses.map((access, index) => {
                return (
                    <Option key={index} value={access.code}>
                        {access.name}
                    </Option>
                );
            })}
        </Select>
    );

    const renderSelectRole = () => (
        <Select
            disabled={true}
            className='select-box'
            value={rolePermission ? rolePermission.role_id : "Chưa xác định"}
            onChange={(value) => setRolePermission({ ...rolePermission, role: value })}
            defaultValue='Chưa xác định'
            style={{ width: "100%" }}>
            <Option key={-1} value='Chưa xác định'>
                Chưa xác định
            </Option>
            {listRoles && listRoles.map((role, index) => {
                return (
                    <Option key={index} value={role.id}>
                        {role.code}
                    </Option>
                );
            })}
        </Select>
    );

    const renderSelectPermission = () => (
        <Select
            disabled={true}
            className='select-box'
            value={rolePermission ? rolePermission.permission_id : "Chưa xác định"}
            onChange={(value) => setRolePermission({ ...rolePermission, permission: value })}
            defaultValue='Chưa xác định'
            style={{ width: "100%" }}>
            <Option key={-1} value='Chưa xác định'>
                Chưa xác định
            </Option>
            {listPermissions && listPermissions.map((permission, index) => {
                return (
                    <Option key={index} value={permission.id}>
                        {permission.resource}
                    </Option>
                );
            })}
        </Select>
    );

    const buildUserData = () => {
        var data = {};
        if (rolePermission.access) {
            data["access"] = rolePermission.access;
        }
        return data;
    };

    const handleCloseModal = () => {
        setRolePermission({});
        setMode("");
        setVisible(false);
    };

    useEffect(() => {
        if (message && message != "") {
            if (message.type == "error") {
                notification.error({
                    message: message.title,
                    description: message.value,
                });
            }
            if (message.type == "warning") {
                notification.warning({
                    message: message.title,
                    description: message.value,
                });
            }
            if (message.type == "success") {
                notification.success({
                    message: message.title,
                    description: message.value,
                });
            }
        }
    }, [message]);

    return (
        <Modal visible={visible} title={title} onOk={handleSave} onCancel={handleCloseModal} okText='Lưu' cancelText='Hủy'>
            <Form>
                <Row gutter={[16, 16]}>
                    <Form.Item name='name' style={{ width: "45%", marginRight: 10 }}>
                        <label htmlFor=''>Chức vụ </label>
                        {renderSelectRole()}
                    </Form.Item>
                    <Form.Item name='permission' style={{ width: "45%" }}>
                        <label htmlFor=''>Quyền </label>
                        {renderSelectPermission()}
                    </Form.Item>
                </Row>
                <Row gutter={[16, 16]}>
                    <Form.Item name='status' style={{ width: "45%", marginRight: 10 }}>
                        <label htmlFor=''>Trạng thái truy cập </label>
                        {renderSelectAccess()}
                    </Form.Item>
                    {mode == "detail" && (
                        <Form.Item name='rolePermission' style={{ width: "45%" }}>
                            <label htmlFor=''>Ngày tạo </label>
                            <DatePicker
                                disabled={mode == "detail"}
                                value={rolePermission.created_at ? moment(rolePermission?.created_at, "YYYY-MM-DD") : ""}
                                style={{ width: "100%" }}
                                format={"YYYY-MM-DD"}
                            />
                        </Form.Item>
                    )}
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalRolePermission;
