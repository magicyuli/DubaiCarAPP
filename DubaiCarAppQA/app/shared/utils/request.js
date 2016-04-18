/**
 * Created by lee on 4/17/16.
 */

var fetch = require("fetch").fetch();

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));

        throw Error(response.statusText);
    }

    return response;
}

module.exports = {
    get: function (url, headers) {
        return fetch(url, {
            method: "GET",
            headers: headers
        }).then(handleErrors);
    }
};