//静态工具类
var Utils = (function () {

    var toastImpl = function (msg) {
        if (window.plugins && window.plugins.toast) {
            window.plugins.toast.showShortBottom(msg);
        }
    }

    var getElementByIdImpl = function (domId) {
        return angular.element(document.getElementById(domId));
    }

    return {
        toast: toastImpl,
        getElementById: getElementByIdImpl
    }

})();

//api配置类
var API = (function () {

    var gateway = 'http://api.xpker.com';
    var appKey = '10000001';
    var appSecret = '96e79218965eb72c92a549dd5a330112';

})();

//全局app命名
var zlzapp = angular.module('jdxtapp', ['ionic']);

//API调用封装
zlzapp.factory('API', ['$http', function ($http) {



}]);