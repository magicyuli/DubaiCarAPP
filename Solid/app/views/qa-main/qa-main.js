var Observable = require("data/observable").Observable;
var dialogsModule = require("ui/dialogs");
var absoluteLayoutModule = require("ui/layouts/absolute-layout");
var platformModule = require("platform");
var Image = require("ui/image").Image;
var imageSourceModule = require("image-source");

var configs = require("~/shared/configs");
var taskModel = require("~/shared/models/task-model");
var qaItems = require("./qa-items.json");
var overlapPhotoWidget = require("~/shared/widgets/overlapping-photo-widget");
var inspect = require("~/shared/utils/objectInspector").inspect;


var screenWidth = platformModule.screen.mainScreen.widthDIPs;
var screenHeight = platformModule.screen.mainScreen.heightDIPs;

var overlapLayer = overlapPhotoWidget.create(screenWidth, screenHeight, 240, 320, null, function () {
    dialogsModule.alert("Camera tapped!");
});

function onDimpleTap(args) {
    var dimpleAbsoluteLayout = args.view.parent;

    overlapLayer.setImgSource("~/flaw.jpg");

    dimpleAbsoluteLayout.addChild(overlapLayer.mask);
    dimpleAbsoluteLayout.addChild(overlapLayer.overlapView);
}


function onPicTouch(args) {
    var view = args.view;
    var dimpleAbsoluteLayout = view.parent;
    var viewWidth = screenWidth;
    var viewHeight = view.getMeasuredHeight()
        * screenWidth / view.getMeasuredWidth();
    var x = args.getX();
    var y = args.getY();
    // TODO: save these
    var posX = x / viewWidth;
    var posY = y / viewHeight;

    view.off("touch");

    dialogsModule.confirm("Add a dimple? At " + x + " " + y).then(function (yes) {
        if (yes) {
            var dimpleImg = new Image();

            dimpleImg.imageSource = imageSourceModule.fromFile("~/ico_dimple.png");
            dimpleImg.height = 19;
            dimpleImg.width = 19;
            dimpleImg.on("tap", onDimpleTap);

            absoluteLayoutModule.AbsoluteLayout.setLeft(dimpleImg, x - 19 / 2);
            absoluteLayoutModule.AbsoluteLayout.setTop(dimpleImg, y - 19 / 2);
            dimpleAbsoluteLayout.addChild(dimpleImg);
        }
    });


}

module.exports = {
    onNavigatedTo: function (args) {
        var page = args.object;
        var task = page.navigationContext;
        var context = new Observable({
            qaItems: qaItems
        });

        page.bindingContext = context;
    },
    onPicDoubleTap: function (args) {
        var view = args.view;

        view.on("touch", onPicTouch);
    }
};