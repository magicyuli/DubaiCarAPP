/**
 * Created by lee on 4/17/16.
 */

var platformModule = require("platform");

module.exports = {
    dev: true,
    urls: {
        getAllTasks: "/task/list/?userId=",
        getTaskDetail: "/task/detail/?taskId="
    },
    screenWidth: platformModule.screen.mainScreen.widthDIPs,
    screenHeight: platformModule.screen.mainScreen.heightDIPs,
    screenScale: platformModule.screen.mainScreen.scale
};