/**
 * Created by lee on 5/3/16.
 */

var absoluteLayoutModule = require("ui/layouts/absolute-layout");
var Image = require("ui/image").Image;
var imageSourceModule = require("image-source");
var StackLayout = require("ui/layouts/stack-layout").StackLayout;
var Color = require("color").Color;

var configs = require("~/shared/configs");
var helpers = require("~/shared/utils/helpers");


function OverlapPhotoWidget(clientOptions) {
    // default configuration
    var options = {
        imageWidth: "80%",
        imageHeight: "80%",
        overlapViewWidth: configs.screenWidth * 0.9,
        overlapViewHeight: "auto",
        overlapViewTop: 0,
        maskWidth: configs.screenWidth,
        maskHeight: configs.screenHeight,
        onCameraTap: null,
        onMaskTap: null
    };

    helpers.extend(options, clientOptions);
    
    var mask = new absoluteLayoutModule.AbsoluteLayout();
    var overlapView = new StackLayout();
    var img = new Image();
    var cameraIcon = new Image();


    img.width = options.imageWidth;
    img.height = options.imageHeight;
    img.stretch = "aspectFit";
    img.on("tap", function () {
        if (configs.dev) {
            console.log("FlawImg tapped!");
        }

        if (typeof options.onImgTap === "function") {
            options.onImgTap();
        }
    });

    cameraIcon.imageSource = imageSourceModule.fromFile("~/camera-icon.png");
    cameraIcon.marginTop = 20;
    cameraIcon.width = 40;
    cameraIcon.height = 40;
    cameraIcon.on("tap", function (args) {
        if (configs.dev) {
            console.log("Camera tapped!");
        }
        
        if (typeof options.onCameraTap === "function") {
            options.onCameraTap(args);
        }
    });

    overlapView.width = options.overlapViewWidth;
    overlapView.height = options.overlapViewHeight;
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

    absoluteLayoutModule.AbsoluteLayout.setTop(overlapView, options.overlapViewTop);
    absoluteLayoutModule.AbsoluteLayout.setLeft(overlapView, (options.maskWidth - options.overlapViewWidth) / 2);

    mask.width = options.maskWidth;
    mask.height = options.maskHeight;
    mask.backgroundColor = new Color("#000000");
    mask.opacity = 0.7;
    mask.on("tap", function (args) {
        if (configs.dev) {
            console.log("Mask tapped!");
        }

        if (typeof options.onMaskTap === "function") {
            options.onMaskTap(args);
        }
    });

    absoluteLayoutModule.AbsoluteLayout.setTop(mask, 0);
    absoluteLayoutModule.AbsoluteLayout.setLeft(mask, 0);

    this.mask = mask;
    this.overlapView = overlapView;
    this.img = img;
    this.cameraIcon = cameraIcon;
    this.options = options;
}

OverlapPhotoWidget.prototype.setImgSource = function (src) {
    if (src instanceof imageSourceModule.ImageSource) {
        this.img.imageSource = src;
    }
    else {
        this.img.imageSource = imageSourceModule.fromFile(src);
    }
};

OverlapPhotoWidget.prototype.detach = function () {
    var parent = this.mask.parent;

    if (parent) {
        parent.removeChild(this.mask);
        parent.removeChild(this.overlapView);
    }
};

OverlapPhotoWidget.prototype.setMaskHeight = function (height) {
    this.mask.height = height;
};

OverlapPhotoWidget.prototype.setOffsetTop = function (offset) {
    absoluteLayoutModule.AbsoluteLayout.setTop(this.mask, offset);
    absoluteLayoutModule.AbsoluteLayout.setTop(this.overlapView, this.options.overlapViewTop + offset);
};

exports.OverlapPhotoWidget = OverlapPhotoWidget;