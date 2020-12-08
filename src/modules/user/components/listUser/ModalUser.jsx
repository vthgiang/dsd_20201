import {
    Form,
    Input,
    Modal,
    Row,
    Select,
    notification,
    DatePicker,
} from "antd";
import { updateUser, createUser, getUser } from "../../store/services";
import React, { useCallback, useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import { roles, statuses, userHost } from "../../config/UserConfig";
import moment from "moment";

const { Option } = Select;

const ModalUser = ({ userId, setVisible, visible, fetchListUser }) => {
    const [user, setUser] = useState({});
    const [imageUrl, setImageUrl] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!visible) {
            setImageUrl("");
        }
    }, [visible]);

    const fetchUser = useCallback(async () => {
        try {
            const res = await getUser(userId);
            if (res.status === "successful") {
                setUser(res.result);
                if (res.result && res.result.avatar) {
                    setImageUrl(res.result.avatar);
                }
            }
        } catch (error) {}
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchUser();
        } else {
            setUser({});
        }
    }, [fetchUser, userId]);

    const handleSave = async () => {
        var res = {};
        if (!validateData()) {
            return;
        }
        const dataUser = buildUserData();
        var description = "";

        if (userId && userId != "") {
            dataUser.id = userId;
            res = await updateUser(dataUser);
            description = "Cập nhật thành công!";
        } else {
            res = await createUser(dataUser);
            description = "Tạo mới thành công!";
        }
        if (res.status === "successful") {
            notification.success({
                message: "Thành công",
                description: description
            })
            handleCloseModal();
            fetchListUser();
        } else {
            notification.error({
                message: "",
                description: res.message,
            });
        }
    };

    useEffect(() => {
        setUser({ ...user, avatar: imageUrl });
    }, [imageUrl]);

    const validateData = useCallback(() => {
        var retval = true;
        if (typeof user.full_name === "undefined" || user.full_name === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập họ tên!",
                type: "error",
                title: "Lỗi"
            });
            return retval;
        }
        if (typeof user.username === "undefined" || user.username === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập tên đăng nhập!",
                type: "error",
                title: "Lỗi"
            });
            return retval;
        }
        if (typeof user.email === "undefined" || user.email === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập email!",
                type: "error",
                title: "Lỗi"
            });
            return retval;
        }
        if (!userId) {
            if (typeof user.password === "undefined" || user.password === "") {
                retval = false;
                setMessage({
                    value: "Vui lòng nhập mật khẩu!",
                    type: "error",
                    title: "Lỗi"
                });
                return retval;
            }
            if (typeof user.repassword === "undefined") {
                retval = false;
                setMessage({
                    value: "Vui lòng xác nhận mật khẩu!",
                    type: "error",
                    title: "Lỗi"
                });
                return retval;
            }
            if (user.repassword !== user.password) {
                retval = false;
                setMessage({
                    value: "Xác nhận mật khẩu không đúng!",
                    type: "error",
                    title: "Lỗi"
                });
                return retval;
            }
        }
        return retval;
    });

    const getByField = (list, fieldName, value) => {
        var retVal = null;
        list.forEach(function (item) {
            if (item[fieldName] == value) {
                retVal = item;
            }
        });
        //return
        return retVal;
    };

    const buildUserData = () => {
        var data = {};
        var columns = [
            "full_name",
            "username",
            "password",
            "email",
            "phone",
            "avatar",
            "address",
            "status",
            "role",
        ];
        columns.forEach((element) => {
            if (user[element] && user[element] != "") {
                data[element] = user[element];
            }
        });
        data.type = localStorage.getItem("project-type");
        data.birthday = moment(user["birthday"]).format("YYYY-MM-DD 00:00:00");
        return data;
    };

    const handleCloseModal = () => {
        setUser({});
        setVisible(false);
    };

    useEffect(() => {
        if (message && message != "") {
            if (message.type == 'error') {
                notification.error({
                    message: message.title,
                    description: message.value
                })
            }
            if (message.type == 'warning') {
                notification.warning({
                    message: message.title,
                    description: message.value
                })
            }
            if (message.type == 'success') {
                notification.success({
                    message: message.title,
                    description: message.value
                })
            }
        }
    }, [message]);

    const renderSelectStatus = () => (
        <Select
            className="select-box"
            value={user?.status}
            onChange={(value) => setUser({ ...user, status: value })}
            defaultValue="Chưa xác định"
            style={{ width: "100%" }}
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

    const renderSelectRole = () => (
        <Select
            className="select-box"
            value={user?.role}
            onChange={(value) => setUser({ ...user, role: value })}
            defaultValue="Chưa xác định"
            style={{ width: "100%" }}
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

    return (
        <Modal
            visible={visible}
            title={
                userId && userId !== ""
                    ? "Cập nhật người dùng"
                    : "Thêm người dùng"
            }
            onOk={handleSave}
            onCancel={handleCloseModal}
            okText="Lưu"
        >
            <Form>
                <Row gutter={[16, 16]}>
                    <Form.Item
                        name="name"
                        style={{ width: "45%", marginRight: 10 }}
                    >
                        <label htmlFor="">
                            Họ tên <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            className="input-box"
                            placeholder="Tên"
                            value={user?.full_name}
                            onChange={(e) =>
                                setUser({ ...user, full_name: e.target.value })
                            }
                        />
                    </Form.Item>
                    <Form.Item name="username" style={{ width: "45%" }}>
                        <label htmlFor="">
                            Tên đăng nhập <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            className="input-box"
                            type="text"
                            placeholder="Tên đăng nhập"
                            value={user?.username}
                            onChange={(e) =>
                                setUser({ ...user, username: e.target.value })
                            }
                        />
                    </Form.Item>
                </Row>
                <Row gutter={[16, 16]}>
                    <Form.Item
                        name="email"
                        style={{ width: "45%", marginRight: 10 }}
                    >
                        <label htmlFor="">
                            Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            className="input-box"
                            type="email"
                            placeholder="Email"
                            value={user?.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                    </Form.Item>
                    <Form.Item name="phone" style={{ width: "45%" }}>
                        <label htmlFor="">Sdt <span style={{ color: "red" }}>*</span></label>
                        <Input
                            className="input-box"
                            placeholder="Số điện thoại"
                            value={user?.phone}
                            onChange={(e) =>
                                setUser({ ...user, phone: e.target.value })
                            }
                        />
                    </Form.Item>
                </Row>
                {!userId && (
                    <Row gutter={[16, 16]}>
                        <Form.Item
                            name="password"
                            style={{ width: "45%", marginRight: 10 }}
                        >
                            <label htmlFor="">
                                Mật khẩu <span style={{ color: "red" }}>*</span>
                            </label>
                            <Input
                                type="password"
                                placeholder="Mật khẩu"
                                value={user?.password}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>
                        <Form.Item name="re-password" style={{ width: "45%" }}>
                            <label htmlFor="">
                                Xác nhận mật khẩu <span style={{ color: "red" }}>*</span>
                            </label>
                            <Input
                                type="password"
                                placeholder="Xác nhận mật khẩu"
                                value={user?.repassword}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        repassword: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>
                    </Row>
                )}
                <Row gutter={[16, 16]}>
                    <Form.Item
                        name="address"
                        style={{ width: "45%", marginRight: 10 }}
                    >
                        <label htmlFor="">Address </label>
                        <Input
                            className="input-box"
                            type="text"
                            placeholder="Địa chỉ"
                            value={user?.address}
                            onChange={(e) =>
                                setUser({ ...user, address: e.target.value })
                            }
                        />
                    </Form.Item>
                    <Form.Item name="role" style={{ width: "45%" }}>
                        <label htmlFor="">Ngày sinh </label>
                        <DatePicker
                            value={
                                user.birthday
                                    ? moment(user?.birthday, "YYYY-MM-DD")
                                    : ""
                            }
                            onChange={(date) =>
                                setUser({
                                    ...user,
                                    birthday: date,
                                })
                            }
                            style={{ width: "100%" }}
                            format={"YYYY-MM-DD"}
                        />
                    </Form.Item>
                </Row>
                <Row gutter={[16, 16]}>
                    <Form.Item
                        name="role"
                        style={{ width: "45%", marginRight: 10 }}
                    >
                        <label htmlFor="">Chức vụ </label>
                        {renderSelectRole()}
                    </Form.Item>
                    <Form.Item name="status" style={{ width: "45%" }}>
                        <label htmlFor="">Trạng thái </label>
                        {renderSelectStatus()}
                    </Form.Item>
                </Row>
                <Row>
                    <Form.Item name="status" style={{ margin: "0 auto" }}>
                        <label htmlFor="">Avatar </label>
                        <UploadImage
                            imageUrl={
                                imageUrl ? imageUrl : `media/users/blank.png`
                            }
                            setImageUrl={setImageUrl}
                        />
                    </Form.Item>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalUser;
