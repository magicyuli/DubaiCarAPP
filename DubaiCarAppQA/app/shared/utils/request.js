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
                        location: "25 42 B St, Dubai, UAE",
                        contact: "+971-50-5948721",
                        model: "Jaguar XF",
                        brandThumbnail: "~/jaguar_logo.png"
                    },
                    {
                        taskId: 2,
                        qaTime: "2016-04-11 12:00:00",
                        location: "23 26b St, Dubai, UAE",
                        contact: "+971-52-4873115",
                        model: "Maserati GranTurismo",
                        brandThumbnail: "~/maserati_logo.png"
                    },
                    {
                        taskId: 3,
                        qaTime: "2016-02-01 12:00:00",
                        location: "Jumeirah Park, Dubai, UAE",
                        contact: "+971-51-4789967",
                        model: "Toyota Prius",
                        brandThumbnail: "~/toyota_logo.png"
                    }
                ];
            }
            else if (url.startsWith("/task/detail/")) {
                data = {
                    1: {
                        taskId: 1,
                        qaTime: "2016-04-01 12:00:00",
                        location: "25 42 B St, Dubai, UAE",
                        contact: "+971-50-5948721",
                        model: "Jaguar XF",
                        brandThumbnail: "~/jaguar_logo.png",
                        mileage: 99222,
                        year: 2010,
                        color: "#12345f"
                    },
                    2: {
                        taskId: 2,
                        qaTime: "2016-04-09 12:00:00",
                        location: "23 26b St, Dubai, UAE",
                        contact: "+971-52-4873115",
                        model: "Maserati GranTurismo",
                        brandThumbnail: "~/maserati_logo.png",
                        mileage: 103222,
                        year: 2003,
                        color: "#ac45bc"
                    },
                    3: {
                        taskId: 3,
                        qaTime: "2016-04-11 12:30:00",
                        location: "Jumeirah Park, Dubai, UAE",
                        contact: "+971-51-4789967",
                        model: "Toyota Prius",
                        brandThumbnail: "~/toyota_logo.png",
                        mileage: 19222,
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