import axios from "axios";

const apiHireme = axios.create({
  baseURL: "https://api-dev.hireme.pt/api/r/v1",
});
const apiAlligator = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Application-Id": "io.ptech.hireme",
  },
  baseURL: "https://api.alligator.social/isip/r/v1",
  params: {
    authType: "CLIENT",
  },
});

export { apiAlligator, apiHireme };
