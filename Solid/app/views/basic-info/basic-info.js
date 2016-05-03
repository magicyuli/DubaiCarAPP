var taskModel = require("~/shared/models/task-model");
var navigation = require("~/shared/utils/navigation");

module.exports = {
    onNavigatedTo: function (args) {
        var page = args.object;
        var task = page.navigationContext;

        // fetch detailed info for this task
        if (!task instanceof taskModel.Task) {
            task = new taskModel.Task(task.taskId);
        }

        task.load();

        page.bindingContext = task;
    },
    onStartTap: function (args) {
        var page = args.object;
        navigation.goToQAMainPage(page.bindingContext);
    }
};