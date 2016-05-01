function FetchPromiseMock(data) {
    this.data = data;
    var that = this;
    
    Object.defineProperty(this.data, "json", {
        value: function () {
            return that.data;
        },
        enumerable: false,
        configurable: false,
        writable: false
    });
}

FetchPromiseMock.prototype.then = function (func) {
    this.data = func(this.data);
    return this;
};

module.exports = {
    FetchPromiseMock: FetchPromiseMock
};