export const formatPhone = (phone) => {
    if (phone == null) {
        return phone;
    }
    var stdPhone = standardizePhone(phone);
    return stdPhone.replace(/^(\d+)(\d{3})(\d{3})$/, "$1-$2-$3");
};

const standardizePhone = (phone) => {
    if (phone == null) {
        return phone;
    }
    //ELSE:
    return phone.replace(/[^0-9]/g, "");
};

export const getByField = (list, fieldName, value) => {
    var retVal = null;
    list.forEach(function (item) {
        if (item[fieldName] == value) {
            retVal = item;
        }
    });
    //return
    return retVal;
  };
