import { Form, Input, Modal, Row, notification, Select, DatePicker } from "antd";
import { getPermission, createPermission, updatePermission } from "../../store/services";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
const { Option } = Select;

const ModalPermission = ({ permissionId, setVisible, visible, fetchListPermission, mode, setMode }) => {
    const [permission, setPermission] = useState({});
    const [message, setMessage] = useState({});
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (!visible) {
            setPermission({
                type: "Chưa xác định",
            });
        }
    }, [visible]);

    useEffect(() => {
        if (mode == "create") {
            setTitle("Thêm mới quyền");
        } else if (mode == "update") {
            setTitle("Cập nhật quyền");
        } else {
            setTitle("Thông tin quyền");
        }
    }, [mode]);

    const fetchPermission = useCallback(async () => {
        try {
            const res = await getPermission(permissionId);
            if (res.status === "successful") {
                setPermission(res.result);
            }
        } catch (error) {}
    }, [permissionId]);

    useEffect(() => {
        if (permissionId) {
            fetchPermission();
        } else {
            setPermission({});
        }
    }, [fetchPermission, setPermission]);

    const handleSave = async () => {
        var res = {};
        if (!validateData()) {
            return;
        }
        const dataRole = buildUserData();
        var description = "";
        if (permissionId && permissionId != "") {
            dataRole.id = permissionId;
            res = await updatePermission(dataRole);
            description = "Cập nhật thành công!";
        } else {
            res = await createPermission(dataRole);
            description = "Tạo mới thành công!";
        }
        if (res.status === "successful") {
            fetchListPermission();
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
        if (typeof permission.name === "undefined" || permission.name === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập tên!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        if (typeof permission.description === "undefined" || permission.description === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập mô tả!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        if (typeof permission.resource === "undefined" || permission.resource === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập tài nguyên!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        return retval;
    });

    const buildUserData = () => {
        var data = {};
        var columns = ["name", "description", "resource"];
        columns.forEach((element) => {
            if (permission[element] && permission[element] != "") {
                data[element] = permission[element];
            }
        });
        return data;
    };

    const handleCloseModal = () => {
        setPermission({});
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
                        <label htmlFor=''>
                            Tên <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            disabled={mode == "detail"}
                            className='input-box'
                            placeholder='Tên'
                            value={permission?.name}
                            onChange={(e) =>
                                setPermission({
                                    ...permission,
                                    name: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item name='username' style={{ width: "45%" }}>
                        <label htmlFor=''>
                            Mô tả <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            disabled={mode == "detail"}
                            className='input-box'
                            type='text'
                            placeholder='Mô tả'
                            value={permission?.description}
                            onChange={(e) =>
                                setPermission({
                                    ...permission,
                                    description: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                </Row>
                <Row gutter={[16, 16]}>
                    <Form.Item name='permission' style={{ width: "45%", marginRight: 10 }}>
                        <label htmlFor=''>Mã quyền </label>
                        <Input
                            disabled={mode == "detail"}
                            className='input-box'
                            type='text'
                            placeholder='Tài nguyên'
                            value={permission?.resource}
                            onChange={(e) =>
                                setPermission({
                                    ...permission,
                                    resource: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    {mode == "detail" && (
                        <Form.Item name='permission' style={{ width: "45%" }}>
                            <label htmlFor=''>Ngày tạo </label>
                            <DatePicker disabled={mode == "detail"} value={permission.created_at ? moment(permission?.created_at, "YYYY-MM-DD") : ""} style={{ width: "100%" }} format={"YYYY-MM-DD"} />
                        </Form.Item>
                    )}
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalPermission;
