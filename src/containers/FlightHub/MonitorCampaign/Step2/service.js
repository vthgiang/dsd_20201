import { TASK } from '../../../../constants';

const convertTaskToProjectType = (task) => {
  switch (task) {
    case TASK.forestFires:
      return 'CHAY_RUNG';
    case TASK.dike:
      return 'DE_DIEU';
    case TASK.highVoltageGrid:
      return 'LUOI_DIEN';
    case TASK.tree:
      return 'CAY_TRONG';
    default:
      return 'CHAY_RUNG';
  }
};

export default convertTaskToProjectType;
