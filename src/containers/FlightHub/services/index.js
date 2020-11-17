import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../configs';

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

export const convertInitialDataToFieldValues = (initialData) => {
  const { startTime, endTime } = initialData;
  const timeRange = convertDateToTimeRange({ startTime, endTime });
  initialData.timeRange = timeRange;
  delete initialData.startTime;
  delete initialData.endTime;
  return initialData;
};

export const formatMomentDateToDateTimeString = (momentDate) => {
  return moment(momentDate).format(DATE_TIME_FORMAT);
};
