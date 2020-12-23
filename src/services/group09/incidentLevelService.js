import Base from "./baseService";
import to from "await-to-js"
class IncidentLevelService extends Base {
  url = '/api/incident-levels'

  index = async () => {
    console.log('dung dung')
    return this.request({
      url: this.url,
      method: "GET"
    });
  };

  // create = async (data) => {
  //   return this.request({
  //     url: "/api/users",
  //     method: "POST",
  //     data: data
  //   });
  // };
  // edit = async (user) => {
  //   return this.request({
  //     url: `/api/users/${user.id}`,
  //     method: "PUT",
  //     data: user
  //   });
  // };
  // detail = async (id) => {
  //   return this.request({
  //     url: `/api/users/${id}`,
  //     method: "GET",
  //     data: {
  //       id
  //     }
  //   });
  // };
  // delete = async ({ ids } = {}) => {
  //   return this.request({
  //     url: "/api/users",
  //     method: "DELETE",
  //     data: {
  //       ids
  //     }
  //   });
  // };


}

export default () => new IncidentLevelService();
