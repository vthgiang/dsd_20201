import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../../configs';

export const covertMomentToDate = (dateMoment) => {
  return new Date(moment(dateMoment).valueOf());
};

export const convertTimeRangeToData = (timeRange) => {
  return {
    startTime: covertMomentToDate(timeRange[0]),
    endTime: covertMomentToDate(timeRange[1]),
  };
};

export const convertDateToTimeRange = ({ startTime, endTime }) => {
  return [
    moment(startTime, DATE_TIME_FORMAT),
    moment(endTime, DATE_TIME_FORMAT),
  ];
};

export const convertInitialDataToFieldValues = (data) => {
  const { startTime, endTime, monitoredZone, monitoredObjects, labels } = data;
  if (startTime && endTime) {
    const timeRange = convertDateToTimeRange({ startTime, endTime });
    data.timeRange = timeRange;
    delete data.startTime;
    delete data.endTime;
  }

  if (monitoredZone) {
    data.monitoredZone = data.monitoredZone._id;
  }

  if (monitoredObjects) {
    data.monitoredObjects = data.monitoredObjects.map((element) => {
      return element._id;
    });
  }

  if (labels) {
    data.labels = labels.map((label) => label._id);
  }

  return data;
};

export const convertFieldValuesToDataSubmit = (fieldValues) => {
  let dataSubmit = { ...fieldValues };

  const { timeRange } = dataSubmit;
  if (timeRange) {
    const timeRangeDate = convertTimeRangeToData(timeRange);
    dataSubmit = { ...dataSubmit, ...timeRangeDate };
    delete dataSubmit.timeRange;
  }

  return dataSubmit;
};

export const formatMomentDateToDateTimeString = (momentDate) => {
  return moment(momentDate).format(DATE_TIME_FORMAT);
};

export const randomDateTime = (start, end) => {
  const diff = end.getTime() - start.getTime();
  const newDiff = Math.round(diff * Math.random());
  const date = new Date(start.getTime() + newDiff);
  return date;
};
