import Base from "./baseService";
import to from "await-to-js"
class Service extends Base {
  index = async (filter) => {
    return this.request({
      url: "/api/users",
      method: "GET",
      data: filter
    });
  };
  create = async (data) => {
    return this.request({
      url: "/api/users",
      method: "POST",
      data: data
    });
  };
  edit = async (user) => {
    return this.request({
      url: `/api/users/${user.id}`,
      method: "PUT",
      data: user
    });
  };
  detail = async (id) => {
    return this.request({
      url: `/api/users/${id}`,
      method: "GET",
      data: {
        id
      }
    });
  };
  delete = async ({ ids } = {}) => {
    return this.request({
      url: "/api/users",
      method: "DELETE",
      data: {
        ids
      }
    });
  };

  getImagesByMonitoredId = async ({ page, pageSize } = {}) => {
    return this.request({
      url: `https://it4483team2.herokuapp.com/api/records/search-image-video?skip=${page}&take=${pageSize}`,
      method: "POST",
      isExternalServer: true,
      data: {
        type: 0
      }
    });
  };

  // getImagesByMonitoredId = async ({ id } = {}) => {
  //   id = id || '5fc68aef1b9ae0001765e821'
  //   const url = `https://it4483team2.herokuapp.com/api/records/monitored/images/${id}`
  //   const header = {
  //     "api-token": localStorage.getItem("token"),
  //     "project-type": localStorage.getItem("project-type")
  //   }
  //   console.log('header', header)
  //   const [error, response] = await to(fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       "api-token": localStorage.getItem("token"),
  //       "project-type": localStorage.getItem("project-type")
  //     },
  //   }));
  //   if(error){
  //     alert("API của nhóm video/hình ảnh đang lỗi!");
  //     return
  //   }
  //   return response.json();
  // };
}

export default () => new Service();
