import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

export const STEPS = [
  { title: 'Bước 1', description: 'Tên đợt giám sát', content: Step1 },
  {
    title: 'Bước 2',
    description: 'Chọn đối tượng và miền giám sát',
    content: Step2,
  },
  {
    title: 'Bước 3',
    description: 'Chọn dạnh sách drone tham gia',
    content: Step3,
  },
  { title: 'Bước 4', description: 'Cấu hình lưu trữ', content: Step4 },
  { title: 'Bước 5', description: 'Chọn nhãn đính kèm', content: Step5 },
];

export const LAYOUT = {
  layout: 'horizontal',
  labelCol: { offset: 2, span: 4 },
  wrapperCol: { span: 16 },
  labelAlign: 'left',
};

export const VALIDATE_MESSAGES = {
  required: `'\${label}' không được để trống!`,
};
