/**
 * Created by lee on 4/17/16.
 */

var fetch = require("fetch").fetch();
var config = require("~/shared/configs");
var mocks = require("~/shared/test/mocks");

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));

        throw Error(response.statusText);
    }

    return response;
}

if (config.dev) {
    module.exports = {
        get: function (url, headers) {
            var data;

            if (url.startsWith("/task/list/")) {
                data = [
                    {
                        taskId: 1,
                        qaTime: "2016-04-01 12:00:00",
                        location: "Pitts",
                        contact: "123465",
                        model: "ABS"
                    },
                    {
                        taskId: 2,
                        qaTime: "2016-04-11 12:00:00",
                        location: "Pitts",
                        contact: "124124",
                        model: "DV"
                    },
                    {
                        taskId: 3,
                        qaTime: "2016-02-01 12:00:00",
                        location: "Pitts",
                        contact: "322333",
                        model: "EQV"
                    }
                ];
            }
            else if (url.startsWith("/task/detail/")) {
                data = {
                    1: {
                        taskId: 1,
                        qaTime: "2016-04-01 12:00:00",
                        location: "Pitts",
                        contact: "123465",
                        model: "ABS",
                        mileage: 19222,
                        year: 2010,
                        color: "#12345f"
                    },
                    2: {
                        taskId: 2,
                        qaTime: "2016-04-09 12:00:00",
                        location: "Pitts",
                        contact: "124124",
                        model: "DV",
                        mileage: 13222,
                        year: 2003,
                        color: "#ac45bc"
                    },
                    3: {
                        taskId: 3,
                        qaTime: "2016-04-11 12:30:00",
                        location: "Pitts",
                        contact: "322333",
                        model: "EQV",
                        mileage: 99222,
                        year: 2015,
                        color: "#42345f"
                    }
                }[parseInt(url.split("=")[1])];
            }

            return new mocks.FetchPromiseMock(data);
        }
    }
}
else {
    module.exports = {
        get: function (url, headers) {
            return fetch(url, {
                method: "GET",
                headers: headers
            }).then(handleErrors);
        }
    };
}