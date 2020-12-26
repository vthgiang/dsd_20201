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
  const fields = { ...data };
  const {
    startTime,
    endTime,
    monitoredZone,
    monitoredObjects,
    labels,
  } = fields;
  if (startTime && endTime) {
    const timeRange = convertDateToTimeRange({ startTime, endTime });
    fields.timeRange = timeRange;
    delete fields.startTime;
    delete fields.endTime;
  }

  if (monitoredZone) {
    fields.monitoredZone = fields.monitoredZone._id;
  }

  if (monitoredObjects) {
    fields.monitoredObjects = fields.monitoredObjects.map((element) => {
      return element._id || element;
    });
  }

  if (labels) {
    fields.labels = labels.map((label) => label._id || label);
  }

  return fields;
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
