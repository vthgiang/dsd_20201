const commonInfo = {}
const loadInfo = () => {
    let info = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user);
    commonInfo.token = info.user.api_token;
    commonInfo.projectType = info.projectType;
    commonInfo.role = info.user.role;
    // console.log(commonInfo);
}

const getToken = () => {
    return localStorage.getItem('token');
}

const getProjectType = () => {
    return localStorage.getItem('project-type');
}

const getRole = () => {
    return JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).user.role;
}

export {getToken, getProjectType, getRole};