import { sendRequest } from '../../../../helpers/sendRequest';

export const MonitoredObjectServices = {
  getAllMonitoredObjects,

  createMonitoredObject,
  editMonitoredObject,
  deleteManyMonitoredObjects,
};

function getAllMonitoredObjects(params) {
  return sendRequest({
    url: 'https://dsd05-monitored-object.herokuapp.com/monitored-object',
    method: 'GET',
    params,
  });
}

function createMonitoredObject(data) {
  return sendRequest({
    url: `https://dsd05-monitored-object.herokuapp.com/monitored-object`,
    method: 'POST',
    data,
  });
}

function editMonitoredObject(id, data) {
  return sendRequest({
    url: `https://dsd05-monitored-object.herokuapp.com/monitored-object/${id}`,
    method: 'PATCH',
    data,
  });
}

function deleteManyMonitoredObjects(arrayId) {
  return sendRequest({
    url: `https://dsd05-monitored-object.herokuapp.com/monitored-object/delete-many-monitored-objects`,
    method: 'POST',
    data: { arrayId },
  });
}
