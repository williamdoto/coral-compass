"use strict";
exports.__esModule = true;
exports.BackendApi = void 0;
var BackendApi = /** @class */ (function () {
    function BackendApi() {
    }
    BackendApi.prototype.test = function (req, res) {
        res.json('Hello World');
    };
    return BackendApi;
}());
exports.BackendApi = BackendApi;
