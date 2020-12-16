import Base from "./baseService";
import to from "await-to-js"
class IncidentLevelService extends Base {
  url = '/api/incident-status'

  index = async () => {
    return this.request({
      url: this.url,
      method: "GET"
    });
  };


}

export default () => new IncidentLevelService();
