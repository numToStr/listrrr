import axios from "axios";

const apiInterface = axios.create({
    baseURL: "/api",
    timeout: 2000,
    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: false,
    // `maxContentLength` defines the max size of the http response content in bytes allowed
    maxContentLength: 2000,
    // `maxRedirects` defines the maximum number of redirects to follow in node.js.
    // If set to 0, no redirects will be followed.
    maxRedirects: 2
});

export default apiInterface;
