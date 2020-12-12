const axios = require('axios')
axios({
    method: "put",
    url: "https://distributed-dsd08.herokuapp.com/api/task-type/update",
    headers: {
        "api-token": "4c901bcdba9f440a2a7c31c0bcbd78ec",
        "project-type": "LUOI_DIEN",
    },
    params: {
        id: 2,
        name: "Vận chuyển trang thiết bị",
        description: "Vận chuyển đi/về thiết bị cho cả đội sửa chữa",
        employee_number: 3,
        prioritize: 0,
    }
})
    .then(function (response) {
        console.log("AAAAAAAAAAAAAAAA");

    })
    .catch(function (err) {
        //handle error
        // console.log(err);
        console.log(err)

    });