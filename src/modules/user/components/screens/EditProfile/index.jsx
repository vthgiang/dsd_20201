import { Form, Input, Modal, Row, notification, DatePicker } from "antd";
import { updateUser, createUser, getUser } from "../../../store/services";
import React, { useCallback, useEffect, useState } from "react";
import UploadImage from "../../listUser/UploadImage";
import moment from "moment";

const ModalUser = ({ userId, setVisible, visible }) => {
    const [user, setUser] = useState({});
    const [imageUrl, setImageUrl] = useState("");
    const [message, setMessage] = useState({});

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
        if (userId && visible) {
            fetchUser();
        } else {
            setUser({});
        }
    }, [fetchUser, userId, visible]);

    const handleSave = async () => {
        var res = {};
        if (!validateData()) {
            notification.warning({
                message: "Đóng",
                description: message,
            });
            return;
        }
        const dataUser = buildUserData();

        if (userId && userId != "") {
            dataUser.id = userId;
            res = await updateUser(dataUser);
        } else {
            res = await createUser(dataUser);
        }
        if (res.status === "successful") {
            handleCloseModal();
        } else {
            var errorMessage = "";
            if (res.message != "") {
                errorMessage = res.message;
            } else {
                errorMessage = res.result;
            }
            setMessage({
                value: errorMessage,
                type: "error",
                title: "Lỗi",
            });
        }
    };

    useEffect(() => {
        setUser({ ...user, avatar: imageUrl });
    }, [imageUrl]);

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

    const validateData = useCallback(() => {
        var retval = true;
        if (typeof user.full_name === "undefined" || user.full_name === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập họ tên!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        if (typeof user.username === "undefined" || user.username === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập tên đăng nhập!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        if (typeof user.email === "undefined" || user.email === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập email!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        return retval;
    });

    const buildUserData = () => {
        var data = {};
        var columns = ["full_name", "username", "email", "phone", "avatar", "address"];
        columns.forEach((element) => {
            if (user[element] && user[element] != "") {
                data[element] = user[element];
            }
        });
        data.birthday = moment(user["birthday"]).format("YYYY-MM-DD 00:00:00");
        return data;
    };

    const handleCloseModal = () => {
        setUser({});
        setVisible(false);
    };

    return (
        <Modal visible={visible} title='Sửa thông tin cá nhân' onOk={handleSave} onCancel={handleCloseModal} okText='Lưu' cancelText='Hủy'>
            <Form>
                <Row gutter={[16, 16]}>
                    <Form.Item name='name' style={{ width: "45%", marginRight: 10 }}>
                        <label htmlFor=''>
                            Họ tên <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input className='input-box' placeholder='Tên' value={user?.full_name} onChange={(e) => setUser({ ...user, full_name: e.target.value })} />
                    </Form.Item>
                    <Form.Item name='username' style={{ width: "45%" }}>
                        <label htmlFor=''>
                            Tên đăng nhập <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input className='input-box' type='text' placeholder='Tên đăng nhập' value={user?.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                    </Form.Item>
                </Row>
                <Row gutter={[16, 16]}>
                    <Form.Item name='email' style={{ width: "45%", marginRight: 10 }}>
                        <label htmlFor=''>
                            Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input className='input-box' type='email' placeholder='Email' value={user?.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </Form.Item>
                    <Form.Item name='phone' style={{ width: "45%" }}>
                        <label htmlFor=''>
                            Sdt <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input className='input-box' placeholder='Số điện thoại' value={user?.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                    </Form.Item>
                </Row>
                <Row gutter={[16, 16]}>
                    <Form.Item name='address' style={{ width: "45%", marginRight: 10 }}>
                        <label htmlFor=''>Address </label>
                        <Input className='input-box' type='text' placeholder='Địa chỉ' value={user?.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
                    </Form.Item>
                    <Form.Item name='role' style={{ width: "45%" }}>
                        <label htmlFor=''>Ngày sinh </label>
                        <DatePicker
                            value={user.birthday ? moment(user?.birthday, "YYYY-MM-DD") : ""}
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
                <Row>
                    <Form.Item name='status' style={{ margin: "0 auto" }}>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor=''>Avatar </label>
                        </div>
                        <UploadImage imageUrl={imageUrl ? imageUrl : `media/users/blank.png`} setImageUrl={setImageUrl} />
                    </Form.Item>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalUser;
