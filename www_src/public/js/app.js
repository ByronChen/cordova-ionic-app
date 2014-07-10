zlzapp.run(['$ionicPlatform', '$ionicLoading', function ($ionicPlatform, $ionicLoading) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        //hide splash
        if (navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
    });
}]);

zlzapp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "views/menu.html",
            controller: 'AppCtrl'
        })

        .state('app.map', {
            url: "/map",
            views: {
                'menuContent': {
                    templateUrl: "views/map.html",
                    controller: 'MapCtrl'
                }
            }
        })

        .state('app.video', {
            url: "/video",
            views: {
                'menuContent': {
                    templateUrl: "views/video.html",
                    controller: 'VideoCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/map');

}]);


