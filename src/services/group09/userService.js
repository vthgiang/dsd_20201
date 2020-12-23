import Base from "./baseService";
import to from "await-to-js"
class Service extends Base {
  login = async ({ email, password } = {}) => {
    const url = 'https://distributed.de-lalcool.com/api/login'

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });
    return response.json();
  };
  getUserName = async (ids) => {
    return this.request({
      url: 'https://distributed.de-lalcool.com/api/get-user-name',
      method: "POST",
      data: {ids: ids},
      isExternalServer: true
    });
  };
}

export default () => new Service();
