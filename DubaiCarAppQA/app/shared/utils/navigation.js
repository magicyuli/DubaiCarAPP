/**
 * Created by lee on 4/17/16.
 */

var frame = require("ui/frame");
var configs = require("../configs");

module.exports = {
    goToBasicInfoPage: function (context) {
        frame.topmost().navigate({
            moduleName: "views/basic-info/basic-info",
            context: context
        });
    }
};