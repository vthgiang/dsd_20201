import Base from "./baseService";
import to from "await-to-js"
class Service extends Base {
  index = async () => {

    let url = `https://monitoredzoneserver.herokuapp.com/monitoredzone`
    let token, projectType
    if (typeof(window) !== 'undefined') {
      token = localStorage.getItem("token");
      projectType = localStorage.getItem("project-type");
    }

    let requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'projecttype': projectType,
        'api-token': token,
        'token': token,
      },
    }
    const result = await fetch(url, requestOptions)

    return await this.handleResponse(result)
  };

  indexArea = async (data) => {
    return this.request({
      url: "https://monitoredzoneserver.herokuapp.com/area",
      method: "GET",
      isExternalServer: true
    });
  };

}

export default () => new Service();
