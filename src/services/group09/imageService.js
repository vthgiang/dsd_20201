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

  getImagesByMonitoredId = async ({ id } = {}) => {
    id = id || '5fc68aef1b9ae0001765e821'
    const url = `https://it4483team2.herokuapp.com/api/records/monitored/images/${id}`

    const response = await fetch(url, {
      method: 'GET',
    });
    return response.json();
  };
}

export default () => new Service();
