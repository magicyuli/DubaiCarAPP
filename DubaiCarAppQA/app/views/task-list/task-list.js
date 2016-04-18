/**
 * Created by lee on 4/17/16.
 */
var Observable = require("data/observable").Observable;
var taskModel = require("~/shared/models/task-model");
var configs = require("~/shared/configs");
var navigation = require("~/shared/utils/navigation");

module.exports = {
    onLoad: function (args) {
        var page = args.object;
        var taskList = new taskModel.TaskList("lee");

        var viewModel = new Observable({
            taskItems: taskList
        });

        taskList.load();

        page.bindingContext = viewModel;


    },
    onTap: function (args) {
        var item = args.view.bindingContext;

        if (configs.dev) {
            item.devInspect();
        }

        navigation.goToBasicInfoPage(item);
    }
};