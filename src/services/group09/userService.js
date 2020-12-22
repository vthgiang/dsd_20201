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

  login = async ({ email, password } = {}) => {
    const url = 'https://distributed.de-lalcool.com/api/login'

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'project-type': 'LUOI_DIEN'
      },
      body: JSON.stringify({email, password})
    });
    return response.json();
  };
}

export default () => new Service();
