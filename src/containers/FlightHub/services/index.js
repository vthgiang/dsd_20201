import moment from 'moment';

export const covertMomentToDate = (dateMoment) => {
  return new Date(moment(dateMoment).valueOf());
};

export const convertTimeRangeToData = (timeRange) => {
  return {
    startTime: covertMomentToDate(timeRange[0]),
    endTime: covertMomentToDate(timeRange[1]),
  };
};
