import { requestData as request, jsonp } from "./santa-fetch"

const getData = res => res.data.data
const catchError = error => {
  throw error
}

const get = (url, data, credentials) =>
  request({
    url,
    method: "GET",
    data,
    timeout: 0,
    credentials
  })
    .then(getData)
    .catch(catchError)

const post = (url, data = {}, realHeaders = {}) =>
  request({
    url: `${url}`,
    method: "POST",
    timeout: 0,
    data,
    headers: {
      Accept: "application/json",
      "Content-Type":
        realHeaders["Content-Type"] || "application/x-www-form-urlencoded"
    }
  })
    .then(getData)
    .catch(catchError)

const patch = (url, data) =>
  request({
    url,
    method: "PATCH",
    body: JSON.stringify(data)
  })

const del = url =>
  request({
    url,
    method: "DELETE"
  })

const put = (url, data) =>
  request({
    url,
    method: "PUT",
    body: JSON.stringify(data)
  })

export default {
  request,
  get,
  post,
  patch,
  del,
  put,
  jsonp
}
