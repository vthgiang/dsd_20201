import Base from "./baseService";
import to from "await-to-js"
class Service extends Base {

  index = async (data) => {
    return this.request({
      url: "http://skyrone.cf:6789/drone/getAll",
      method: "GET",
      isExternalServer: true
    });
  };

}

export default () => new Service();
