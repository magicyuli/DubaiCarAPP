/**
 * Created by lee on 4/17/16.
 */
var ObservableArray = require("data/observable-array").ObservableArray;
var dialogsModule = require("ui/dialogs");
var request = require("../utils/request");
var configs = require("../configs");

function Task(taskId, userId, time, location, contact, model) {
    this.userId = userId;
    this.taskId = taskId;
    this.time = time;
    this.location = location;
    this.contact = contact;
    this.model = model;
}

Task.prototype.devInspect = function () {
    dialogsModule.alert({
        message: [
            "You've tapped on task: ",
            this.taskId,
            this.time,
            this.location,
            this.contact,
            this.model
            ].join("\n"),
        okButtonText: "GOT IT"
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

            if (!configs.dev) {
                request.get(configs.urls.getAllTasks + this.userId, {}, function (response) {
                    return response.json();
                }, function (data) {
                    that.concat(data);
                });
            }
            else {
                that.push([
                    new Task(1, this.userId, Date.now(), "Pitts", "123465", "ABS"),
                    new Task(2, this.userId, Date.now(), "Pitts", "124124", "DV"),
                    new Task(3, this.userId, Date.now(), "Pitts", "322333", "EQV")
                ]);
            }
        },
        enumerable: false,
        configurable: false,
        writable: false
    }
});

TaskList.prototype.constructor = TaskList;

exports.TaskList = TaskList;
