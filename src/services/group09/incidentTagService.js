import Base from "./baseService";
import to from "await-to-js"
class IncidentTagService extends Base {
  url = '/api/incident-tags'

  index = async () => {
    return this.request({
      url: this.url,
      method: "GET"
    });
  };


}

export default () => new IncidentTagService();
