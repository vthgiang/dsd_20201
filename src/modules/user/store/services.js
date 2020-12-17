import { apiAxios, setHeaders } from "../../../services/axios";

export const login = (body) =>
    apiAxios
        .post("login", body)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });

export const register = (body) =>
    apiAxios.post("register", body).then((res) => {
        return res.data;
    });

export const forgotPassword = (body) =>
    apiAxios.post("send-email-forgot-password", body).then((res) => {
        return res.data;
    });

export const changePassword = (body) =>
    apiAxios.post("change-password", body).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });

export const getListUsers = (filter) => {
    var url = `user?page_id=${filter.page_id}&page_size=${filter.page_size}&sorts=-id&embeds=department&filters=`;
    if (filter.role && filter.role != "Chưa xác định") {
        url += ",role=" + filter.role;
    }
    if (filter.status && filter.status != "Chưa xác định") {
        url += ",status=" + filter.status;
    }
    if (filter.type && filter.type != "Chưa xác định") {
        url += ",type=" + filter.type;
    }
    if (filter.statusActivation && filter.statusActivation != "Chưa xác định") {
        url += ",status_activation=" + filter.statusActivation;
    }
    if (filter.department_id && filter.department_id != "Chưa xác định") {
        url += ",department_id=" + filter.department_id;
    }
    if (filter.statusActivation && filter.statusActivation != "Chưa xác định") {
        url += ",status_activation=" + filter.statusActivation;
    }
    if (filter.search) {
        url += "&q=" + filter.search;
    };
    return apiAxios.get(url).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const getUser = (userId) => {
    return apiAxios
        .get(`user/${userId}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const updateUser = (body) => {
    return apiAxios.patch(`user/${body.id}`, body).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const createUser = (body) => {
    return apiAxios.post("user", body).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const deleteUser = (userId) => {
    return apiAxios.delete(`user/${userId}`).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const uploadAvatar = ({ file }) => {
    let formData = new FormData();
    formData.append("file", file);

    return apiAxios.post("upload", formData).then((res) => {
        return res.data;
    });
};

export const getListDepartments = (filter) => {
    var url = `department?page_id=${filter.page_id}&page_size=${filter.page_size}&sorts=-id&filters=`;
    if (filter.search) {
        url += "&q_department=" + filter.search;
    };
    if (filter.type && filter.type != "Chưa xác định") {
        url += ",type=" + filter.type;
    }
    return apiAxios.get(url).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const getDepartment = (departmentId) => {
    return apiAxios
        .get(`department/${departmentId}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const updateDepartment = (body) => {
    return apiAxios.patch(`department/${body.id}`, body).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const createDepartment = (body) => {
    return apiAxios.post("department", body).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const deleteDepartment = (userId) => {
    return apiAxios.delete(`department/${userId}`).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const getAllDepartments = () => {
    var url = `department?page_id=-1`;
    return apiAxios.get(url).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const getAllUsers = () => {
    var url = `user?page_id=-1`;
    return apiAxios.get(url).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const getListUsersMeta = (filter) => {
    var url = `userMeta?page_id=${filter.page_id}&page_size=${filter.page_size}&embeds=user,targetUser&sorts=-id&filters=`;
    if (filter.type && filter.type != "Chưa xác định") {
        url += ",type=" + filter.type;
    }
    if (filter.name && filter.name != "Chưa xác định") {
        url += ",name=" + filter.name;
    }
    if (filter.target_id && filter.target_id != "Chưa xác định") {
        url += ",target_id=" + filter.target_id;
    }
    if (filter.user_id && filter.user_id != "Chưa xác định") {
        url += ",user_id=" + filter.user_id;
    }
    if (filter.search) {
        url += "&q_meta=" + filter.search;
    };
    return apiAxios.get(url).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
};