var Observable = require("data/observable").Observable;
var dialogsModule = require("ui/dialogs");
var AbsoluteLayout = require("ui/layouts/absolute-layout").AbsoluteLayout;
var GridLayout = require("ui/layouts/grid-layout").GridLayout;

var Image = require("ui/image").Image;
var imageSourceModule = require("image-source");
var cameraModule = require("camera");

var configs = require("~/shared/configs");
var taskModel = require("~/shared/models/task-model");
var qaItems = require("./qa-items.json");
var OverlapPhotoWidget = require("~/shared/widgets/overlap-photo-widget").OverlapPhotoWidget;
var inspect = require("~/shared/utils/objectInspector").inspect;

var screenWidth = configs.screenWidth;

// ----------------------- Dimple start -------------------------- //

var dimpleOverlapLayer = new OverlapPhotoWidget({
    imageWidth: 240,
    imageHeight: 320,
    overlapViewWidth: 280,
    overlapViewTop: 30,
    onImgTap: null,
    onCameraTap: function (args) {
        cameraModule.takePicture().then(function (imageSource) {
            dimpleOverlapLayer.setImgSource(imageSource);
        });
    },
    onMaskTap: function () {
        dimpleOverlapLayer.detach();
    }
});

function onDimplePicDoubleTap(args) {
    var view = args.view;

    view.on("touch", onDimplePicTouch);
}

function onDimplePicTouch(args) {
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

            AbsoluteLayout.setLeft(dimpleImg, x - 19 / 2);
            AbsoluteLayout.setTop(dimpleImg, y - 19 / 2);
            dimpleAbsoluteLayout.addChild(dimpleImg);
        }
    });
}

function onDimpleTap(args) {
    var dimpleAbsoluteLayout = args.view.parent;

    dimpleOverlapLayer.detach();

    dimpleOverlapLayer.setImgSource("~/flaw.jpg");

    dimpleAbsoluteLayout.addChild(dimpleOverlapLayer.mask);
    dimpleAbsoluteLayout.addChild(dimpleOverlapLayer.overlapView);
}

// ------------------------- Dimple end -------------------------- //

// ------------------------ Exhibit start ------------------------- //

var NUM_OF_STANDARD_PHOTOS = 28;
var NUM_OF_STANDARD_PHOTO_COLUMNS = 2;

var standardPhotoScrollView;
var standardPhotoContainer = new AbsoluteLayout();
var standardPhotoOverlapLayer = new OverlapPhotoWidget({
    overlapViewTop: 30,
    onImgTap: null,
    onCameraTap: function () {
        dialogsModule.alert("Camera tapped!");
    },
    onMaskTap: function () {
        standardPhotoContainer.parent.removeChild(standardPhotoContainer);
    }
});

GridLayout.setColumn(standardPhotoContainer, 0);
GridLayout.setRow(standardPhotoContainer, 0);
GridLayout.setColumnSpan(standardPhotoContainer, NUM_OF_STANDARD_PHOTO_COLUMNS);
GridLayout.setRowSpan(standardPhotoContainer, NUM_OF_STANDARD_PHOTOS / NUM_OF_STANDARD_PHOTO_COLUMNS);

standardPhotoContainer.addChild(standardPhotoOverlapLayer.mask);
standardPhotoContainer.addChild(standardPhotoOverlapLayer.overlapView);

function onStandardPhotoTouch(args) {
    var img = args.object;
    var gridLayout = args.view.parent;

    standardPhotoOverlapLayer.setImgSource(img.imageSource);
    standardPhotoOverlapLayer.setOffsetTop(standardPhotoScrollView.verticalOffset);

    gridLayout.addChild(standardPhotoContainer);
}

function fillStandardPhotoItems(container, taskId) {
    for (var i = 0; i < NUM_OF_STANDARD_PHOTOS; i++) {
        var img = new Image();

        if (Math.random() > 0.5)
            img.src = "~/01_side.png";
        else
            img.src = "~/car_silhouette.jpg";
        img.imageSource = imageSourceModule.fromFile(img.src);
        img.on("tap", onStandardPhotoTouch);
        GridLayout.setRow(img, Math.floor(i / NUM_OF_STANDARD_PHOTO_COLUMNS));
        GridLayout.setColumn(img, i % NUM_OF_STANDARD_PHOTO_COLUMNS);

        container.addChild(img);
    }
}

// -------------------------- Exhibit end --------------------------- //


module.exports = {
    onNavigatedTo: function (args) {
        var page = args.object;
        var task = page.navigationContext;
        var context = new Observable({
            qaItems: qaItems
        });

        page.bindingContext = context;

        fillStandardPhotoItems(page.getViewById("standardPhotosContainer"), task && task.taskId);

        standardPhotoScrollView = page.getViewById("standardPhotoScrollView");
    },
    onDimplePicDoubleTap: onDimplePicDoubleTap
};