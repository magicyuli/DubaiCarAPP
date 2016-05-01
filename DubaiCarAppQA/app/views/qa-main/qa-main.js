var Observable = require("data/observable").Observable;
var dialogsModule = require("ui/dialogs");
var absoluteLayoutModule = require("ui/layouts/absolute-layout");
var platformModule = require("platform");
var Image = require("ui/image").Image;
var imageSourceModule = require("image-source");

var configs = require("~/shared/configs");
var taskModel = require("~/shared/models/task-model");
var qaItems = require("./qa-items.json");
var inspect = require("~/shared/utils/objectInspector").inspect;


var screenWidth = platformModule.screen.mainScreen.widthDIPs;


function onDimpleTouch(args) {
    var view = args.view;
    var absoluteLayout = view.parent;
    var viewWidth = screenWidth;
    var viewHeight = view.getMeasuredHeight()
        * screenWidth / view.getMeasuredWidth();
    var x = args.getX();
    var y = args.getY();
    var posX = x / viewHeight;
    var posY = y / viewHeight;

    view.off("touch");

    if (configs.dev) {
        console.log([x, y, viewWidth, viewHeight].join("       "));
        console.log(absoluteLayout.id);
    }

    dialogsModule.confirm("Add a dimple? At " + x + " " + y).then(function (yes) {
        if (yes) {
            var dimpleImg = new Image();

            dimpleImg.imageSource = imageSourceModule.fromFile("~/ico_dimple.png");
            dimpleImg.height = 19;
            dimpleImg.width = 19;

            absoluteLayoutModule.AbsoluteLayout.setLeft(dimpleImg, x - 19 / 2);
            absoluteLayoutModule.AbsoluteLayout.setTop(dimpleImg, y - 19 / 2);
            absoluteLayout.addChild(dimpleImg);
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
    onDimpleDoubleTap: function (args) {
        var view = args.view;

        view.on("touch", onDimpleTouch);
    }
};