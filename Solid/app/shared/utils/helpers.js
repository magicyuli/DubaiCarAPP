/**
 * Created by lee on 5/5/16.
 */

module.exports = {
    extend: function (target, ext) {
        var attr;
        
        for (attr in ext) {
            if (ext.hasOwnProperty(attr)) {
                target[attr] = ext[attr];
            }
        }
    }
};