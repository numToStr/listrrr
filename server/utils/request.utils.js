const https = require("https");

/**
 * Promisifying https.get
 * @param {String} url URL to get the response from
 * @param {Object} options Options recieved by `https.get`. Please refer to nodejs docs.
 */
const get = (url, options) => {
    return new Promise((resolve, reject) => {
        https
            .get(url, options, res => {
                let data = "";
                res.on("data", chunk => {
                    data += chunk;
                });

                res.on("end", () => {
                    const _data = JSON.parse(data);

                    return resolve(_data);
                });
            })
            .on("error", err => {
                reject(err);
            });
    });
};

module.exports = { get };
