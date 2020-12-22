
class BaseService {

    makeQuery(data = {}) {
        let query = [];
        for (let key in data) {
            if (Array.isArray(data[key])) {
                for (let value of data[key]) {
                    if (typeof value == "object") value = JSON.stringify(value)
                    query.push({
                        key: `${key}[]`,
                        value: value
                    })
                }
            } else if (typeof data[key] == "object") {
                query.push({
                    key: key,
                    value: JSON.stringify(data[key])
                })
            } else {
                query.push({
                    key: key,
                    value: data[key]
                })
            }
        }
        return query.map(q => `${q.key}=${q.value}`).join("&")
    }

    //  { url: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: any, options?: any }
    request = async ({
        url,
        method,
        data,
        isExternalServer = false,
        options
    } = {}) => {
        if (["GET", "DELETE"].includes(method)) {
            url += "?" + this.makeQuery(data)
        } else {
            options = {
                ...options,
                body: JSON.stringify(data)
            }
        }
        let token, projectType
        if (typeof(window) !== 'undefined') {
            token = localStorage.getItem("token");
            projectType = localStorage.getItem("project-type");
          }
      
        let requestOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'project-type': projectType,
                'api-token': token,
                'token': token,
            },
            ...options
        };
        let BASE_URL = "https://it4483.cf";
        if(isExternalServer){
            BASE_URL = "";
        }
        const result = await fetch(BASE_URL + url, requestOptions)
        return await this.handleResponse(result)
    }

    handleResponse = async (response) => {
        const text = await response.text();
        let data = {
            data: "",
            message: ""
        }
        try {
            data = text && JSON.parse(text);
        } catch (e) {
            console.log(e)
        }
        let url = response.url || ""
        if (!response.ok) {
            if ([401].indexOf(response.status) !== -1 && !url.includes("/login")) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                window.location.href = "/login"
            }
            const error = data || (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data.data || data
    }
}

export default BaseService