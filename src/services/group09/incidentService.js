import Base from "./baseService";
import to from "await-to-js"
class Service extends Base {
  url = '/api/incidents'

  index = async (filter) => {
    return this.request({
      url: `${this.url}/search`,
      method: "POST",
      data: filter
    });
  };
  create = async (data) => {
    return this.request({
      url: this.url,
      method: "POST",
      data: data
    });
  };
  edit = async (user) => {
    return this.request({
      url: `${this.url}/${user.id}`,
      method: "PUT",
      data: user
    });
  };
  detail = async (id) => {
    return this.request({
      url: `${this.url}/${id}`,
      method: "GET",
      data: {
        id
      }
    });
  };
  delete = async ({ ids } = {}) => {
    return this.request({
      url: this.url,
      method: "DELETE",
      data: {
        ids
      }
    });
  };


}

export default () => new Service();
