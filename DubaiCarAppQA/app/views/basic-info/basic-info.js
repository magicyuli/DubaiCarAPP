

module.exports = {
    onNavigatedTo: function (args) {
        var page = args.object;
        page.bindingContext = page.navigationContext;
    }
};