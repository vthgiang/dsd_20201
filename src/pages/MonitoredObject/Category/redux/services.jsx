import { sendRequest } from '../../../../helpers/sendRequest';

export const CategoryServices = {
  getAllCategories,
  createCategory,
  editCategory,
  deleteManyCategories,
};

function getAllCategories(params) {
  return sendRequest({
    url: `https://dsd05-monitored-object.herokuapp.com/category-monitored-object`,
    method: "GET",
    params,
  });
}

function createCategory(data) {
  return sendRequest({
    url: `https://dsd05-monitored-object.herokuapp.com/category-monitored-object`,
    method: 'POST',
    data,
  });
}

function editCategory(id, data) {
  return sendRequest({
    url: `https://dsd05-monitored-object.herokuapp.com/category-monitored-object/${id}`,
    method: 'PATCH',
    data,
  });
}

function deleteManyCategories(arrayId) {
  return sendRequest({
    url: `https://dsd05-monitored-object.herokuapp.com/category-monitored-object/delete-many-category-monitored-objects
    `,
    method: 'POST',
    data: { arrayId },
  });
}
