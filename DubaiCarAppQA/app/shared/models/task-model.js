/**
 * Created by lee on 4/17/16.
 */
var ObservableArray = require("data/observable-array").ObservableArray;
var dialogsModule = require("ui/dialogs");
var request = require("../utils/request");
var configs = require("../configs");

function Task(taskId, userId, qaTime, location, contact, model, brandThumbnail) {
    this.userId = userId;
    this.taskId = taskId;
    this.qaTime = qaTime;
    this.location = location;
    this.contact = contact;
    this.model = model;
    this.brandThumbnail = brandThumbnail;
}

Task.prototype.devInspect = function () {
    dialogsModule.alert({
        message: [
            "You've tapped on task: ",
            this.taskId,
            this.qaTime,
            this.location,
            this.contact,
            this.model
        ].join("\n"),
        okButtonText: "GOT IT"
    });
};

Task.prototype.load = function () {
    if (typeof this.taskId === "undefined") {
        return;
    }

    var that = this;

    request.get(configs.urls.getTaskDetail + this.taskId, {}).then(function (response) {
        return response.json();
    }).then(function (data) {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                that[key] = data[key];
            }
        }
    });
};

function TaskList(userId) {
    ObservableArray.call(this, []);
    this.userId = userId;
}

TaskList.prototype = Object.create(ObservableArray.prototype, {
    load: {
        value: function () {
            var that = this;

            request.get(configs.urls.getAllTasks + this.userId, {}).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (Array.isArray(data)) {
                    data.forEach(function (item) {
                        that.push(new Task(
                            item.taskId,
                            that.userId,
                            item.qaTime,
                            item.location,
                            item.contact,
                            item.model,
                            item.brandThumbnail
                        ));
                    });
                }
                else {
                    console.error("Load task list didn't return an array.")
                }
            });
        },
        enumerable: false,
        configurable: false,
        writable: false
    }
});

TaskList.prototype.constructor = TaskList;

module.exports = {
    TaskList: TaskList,
    Task: Task
};
