import { config } from 'dotenv'
config()

var https = require('follow-redirects').https;

export default (params) => {
    return new Promise((resolve, reject) => {

        var options = {
            'method': 'GET',
            'hostname': params.hostname || 'api.etherscan.io',
            'path': params.path,
            'headers': params.headers || {},
            'maxRedirects': 20,
        };

        var req = https.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                resolve(Buffer.concat(chunks).toString());
            });

            res.on("error", function (error) {
                reject(error);
            });
        });

        req.end();

    })
}