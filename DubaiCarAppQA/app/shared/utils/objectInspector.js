/**
 * Created by lee on 4/30/16.
 */

function inspect(obj, pattern) {
    var regex = /.*/;

    if (pattern) {
        regex = new RegExp(".*" + pattern + ".*", "i");
    }

    for (var attr in obj) {
        if (regex.test(attr)) {
            console.log(attr + ": " + obj[attr]);
        }
    }
}

module.exports = {
    inspect: inspect
};