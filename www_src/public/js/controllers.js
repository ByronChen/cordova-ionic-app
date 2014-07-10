zlzapp.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', function($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('views/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    },

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
}]);

zlzapp.controller('MapCtrl', ['$scope', 'Map', 'GCZ', function($scope, Map, GCZ) {
	
	var mapElem = document.getElementById('bmap');
	var h = mapElem.parentNode.parentNode.clientHeight;
	mapElem.style.height = h+"px";
	  
	Map.createMap("bmap");
	//先执行一次
	Map.getLocation();
	$scope.getLocation = Map.getLocation;

    //添加地图上的观测站的点
    Map.autoAddMarkers(GCZ.listAll());

    Map.addPolyLine();

    //观测站搜索结果数据
    $scope.searchGcz = function(){
        $scope.isHideSearchBox = 0;
        $scope.gczList = GCZ.list($scope.keyword);
    }
    //观测站点击
    $scope.selectGcz = function(id){
        alert(id);
    }
    //键盘收起时让搜索框失去焦点
    window.addEventListener('native.keyboardhide', function(){
        document.getElementById("search-input").blur();
    });

}]);

zlzapp.controller('VideoCtrl', ['$scope', 'Video', function($scope, Video) {

    $scope.videoList = Video.listAll();

}]);