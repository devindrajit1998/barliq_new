import axios from "axios";

const instance = axios.create({
  baseURL: "https://barliq.rajeshmondal.digital",
  // baseURL: "http://localhost:5500"
});

export function getApi(url, header) {
  let headers = {
    Accept: header.accept,
    "x-access-token": header.authToken,
  };
  return instance.get(url, { headers });
}

export function postApi(url, body, header) {
  let headers = {
    Accept: header.accept,
    "x-access-token": header.authToken,
  };
  return instance.post(url, body, { headers });
}

export function patchApi(url, body, header) {
  let headers = {
    Accept: header.accept,
    "x-access-token": header.authToken,
  };
  return instance.patch(url, body, { headers });
}

export function deleteApi(url, header) {
  let headers = {
    Accept: header.accept,
    "x-access-token": header.authToken,
  };
  return instance.delete(url,{ headers });
}