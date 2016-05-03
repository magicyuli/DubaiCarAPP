/**
 * Created by lee on 5/3/16.
 */

var absoluteLayoutModule = require("ui/layouts/absolute-layout");
var Image = require("ui/image").Image;
var imageSourceModule = require("image-source");
var StackLayout = require("ui/layouts/stack-layout").StackLayout;
var Color = require("color").Color;

var configs = require("~/shared/configs");

exports.create = function (maskWidth, maskHeight, imgWidth, imgHeight, onImgTap, onCameraTap) {
    var mask = new absoluteLayoutModule.AbsoluteLayout();
    var overlapView = new StackLayout();
    var img = new Image();
    var cameraIcon = new Image();


    img.width = imgWidth;
    img.height = imgHeight;
    img.stretch = "aspectFit";
    img.on("tap", function () {
        if (configs.dev) {
            console.log("FlawImg tapped!");
        }

        if (typeof onImgTap === "function") {
            onImgTap();
        }
    });

    cameraIcon.imageSource = imageSourceModule.fromFile("~/camera-icon.png");
    cameraIcon.marginTop = 20;
    cameraIcon.width = 40;
    cameraIcon.height = 40;
    cameraIcon.on("tap", function () {
        if (configs.dev) {
            console.log("Camera tapped!");
        }
        
        if (typeof onCameraTap === "function") {
            onCameraTap();
        }
    });

    overlapView.width = 280;
    overlapView.padding = "20 0";
    overlapView.horizontalAlignment = "center";
    overlapView.backgroundColor = new Color("#ffffff");
    overlapView.borderColor = new Color("#8c8c8c");
    overlapView.borderRadius = 10;
    overlapView.borderWidth = 1;
    overlapView.on("tap", function () {

    });

    overlapView.addChild(img);
    overlapView.addChild(cameraIcon);

    absoluteLayoutModule.AbsoluteLayout.setTop(overlapView, 30);
    absoluteLayoutModule.AbsoluteLayout.setLeft(overlapView, (maskWidth - overlapView.width) / 2);

    mask.width = maskWidth;
    mask.height = maskHeight;
    mask.backgroundColor = new Color("#000000");
    mask.opacity = 0.7;
    mask.on("tap", function (args) {
        if (configs.dev) {
            console.log("Mask tapped!");
        }

        var absoluteLayout = mask.parent;

        absoluteLayout.removeChild(mask);
        absoluteLayout.removeChild(overlapView);
    });

    absoluteLayoutModule.AbsoluteLayout.setTop(mask, 0);
    absoluteLayoutModule.AbsoluteLayout.setLeft(mask, 0);

    return {
        mask: mask,
        overlapView: overlapView,
        setImgSource: function (src) {
            img.imageSource = imageSourceModule.fromFile(src);
        }
    }
};