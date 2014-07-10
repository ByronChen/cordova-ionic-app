//百度地图
zlzapp.factory('Map', ['$filter', function ($filter) {

    //声明全局map对象
    window.map = null;
    window.locationMarker = null;

    var errorCodes = [
        {code: 2, msg: '位置结果未知'},
        {code: 3, msg: '导航结果未知'},
        {code: 4, msg: '非法密钥'},
        {code: 5, msg: '非法请求'},
        {code: 6, msg: '没有权限'},
        {code: 7, msg: '服务不可用'},
        {code: 8, msg: '超时'}
    ];

    var createMapImpl = function (elemId) {
        window.map = new BMap.Map(elemId);
        var mapStyle = {
            features: ["road", "building", "water", "land"],//隐藏地图上的poi
        }
        map.setMapStyle(mapStyle);
        map.centerAndZoom(new BMap.Point(120.161308, 30.280454), 14);
        map.addControl(new BMap.NavigationControl());
    }

    var getLocationImpl = function () {
        Utils.toast("正在定位...");
        //百度sdk定位
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
                if (locationMarker) {
                    map.removeOverlay(locationMarker);
                }
                map.panTo(r.point);
                window.locationMarker = addMarkerImpl(r.point);
            } else {
                var errorObj = $filter('filter')(errorCodes, {code: geolocation.getStatus()});
                alert('定位失败,请重试!Error:' + errorObj[0]['msg']);
            }
        }, {enableHighAccuracy: true});

        //phonegap自带定位
        // navigator.geolocation.getCurrentPosition(function(position) {
        //     var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
        //     addMarkerImpl(point);
        // }, function(error) {
        //     alert( 'code: '    + error.code    + '\n' + 'message: ' + error.message + '\n' );
        // });
    }

    var addMarkerImpl = function (point, iconFile) {
        //map.centerAndZoom(point, 16);
        //map.panTo(point);
        // 创建图标对象    
        var iconPath = "public/images/icon/";
        if (!iconFile) {
            iconFile = "pin@32x32.png";
        }
        var matches = /@([0-9]+)x([0-9]+)/.exec(iconFile);
        var myIcon = new BMap.Icon(iconPath + iconFile,
            new BMap.Size(matches[1], matches[2]), {
                // 指定定位位置,图标的中-底位置
                anchor: new BMap.Size(matches[1] / 2, matches[2]),
            });
        // 创建标注对象并添加到地图    
        var marker = new BMap.Marker(point, {icon: myIcon});
        map.addOverlay(marker);
        return marker;
    }

    //根据数据自动添加地图上的点，data中需包含longitude和latitude属性
    var autoAddMarkersImpl = function (data) {
        angular.forEach(data, function (one) {
            addMarkerImpl(new BMap.Point(one.longitude, one.latitude), "marker1@26x38.png");
        });
    }

    //根据坐标添加折现，显示交通流量
    var addPolyLineImpl = function (pointArr, color, weight) {
        color = color ? color : '#00ff00';
        weight = weight ? weight : 3;
        if (angular.isArray(pointArr)) {
            var polyline = new BMap.Polyline(pointArr, {
                strokeColor: color,
                strokeWeight: weight,
                strokeOpacity: 0.5
            });
            map.addOverlay(polyline);
        }
    }

    return {
        createMap: function (elemId) {  // 创建地图对象
            createMapImpl(elemId);
        },
        getLocation: function () {
            getLocationImpl();
        },
        addMarker: function (point, iconFile) {
            return addMarkerImpl(point, iconFile);
        },
        autoAddMarkers: function (data) {
            autoAddMarkersImpl(data);
        },
        addPolyLine: function (pointArr, color, weight) {
            addPolyLineImpl(pointArr, color, weight);
        }
    }
}]);
//观测站数据
zlzapp.factory('GCZ', ['$filter', function ($filter) {

    //观测站搜索数据
    var data = [
        { id: 1, road: 'G25', name: '南庄兜(獐山)拥堵点', longitude: 120.089244, latitude: 30.466947},
        { id: 3, road: 'G2501', name: '勾庄', longitude: 120.078294, latitude: 30.367116},
        { id: 4, road: 'G2501', name: '红垦拥堵点', longitude: 120.370644, latitude: 30.240671},
        { id: 5, road: 'G2501', name: '三墩', longitude: 120.058874, latitude: 30.298743},
        { id: 6, road: 'G2501', name: '三墩拥堵点', longitude: 120.064191, latitude: 30.307905},
        { id: 7, road: 'G2501', name: '下沙', longitude: 120.376185, latitude: 30.3236},
        { id: 8, road: 'G2501', name: '杨汛桥', longitude: 120.309023, latitude: 30.123758}
    ];

    return {
        listAll: function () {
            return data;
        },
        list: function (keyword) {
            if (keyword) {
                return $filter('filter')(data, keyword);
            } else {
                return [];
            }
        }
    }

}]);
//交通流量数据
zlzapp.factory('JTLL', ['$filter', function ($filter) {

    //观测站搜索数据
    var data = [
        { id: 1, road: 'G25', name: '南庄兜(獐山)拥堵点', longitude: 120.089244, latitude: 30.466947},
        { id: 3, road: 'G2501', name: '勾庄', longitude: 120.078294, latitude: 30.367116},
        { id: 4, road: 'G2501', name: '红垦拥堵点', longitude: 120.370644, latitude: 30.240671},
        { id: 5, road: 'G2501', name: '三墩', longitude: 120.058874, latitude: 30.298743},
        { id: 6, road: 'G2501', name: '三墩拥堵点', longitude: 120.064191, latitude: 30.307905},
        { id: 7, road: 'G2501', name: '下沙', longitude: 120.376185, latitude: 30.3236},
        { id: 8, road: 'G2501', name: '杨汛桥', longitude: 120.309023, latitude: 30.123758}
    ];

    return {
        listAll: function () {
            return data;
        },
        list: function (keyword) {
            if (keyword) {
                return $filter('filter')(data, keyword);
            } else {
                return [];
            }
        }
    }

}]);
//视频数据
zlzapp.factory('Video', ['$http', function ($http) {

    //实际项目替换成远程api
    var result = {"status": 1, "data": [
        {"updateTime": "2014-06-10", "sortId": 0, "isHot": 0, "info": "Yangtze Drift 长江漂流", "countLike": 0, "id": 2, "title": "长江漂流", "countDislike": 0, "coverPic": "http://file-server.xpker.com/image/20140615/VEACrQgOji_!!600x400.jpg", "countComment": 0, "fileName": "http://file-server.xpker.com/video/20140614/VeKcRPjkQg_!!181981841.mp4", "rating": 10.0, "cateId": 17, "addTime": "2014-06-10", "cateName": "国内"},
        {"updateTime": "2014-06-15", "sortId": 0, "isHot": 0, "info": "11490 老师和花", "countLike": 0, "id": 9, "title": "老师和花", "countDislike": 0, "coverPic": "http://file-server.xpker.com/image/20140615/boUCHhsrHL_!!600x400.jpg", "countComment": 0, "fileName": "http://file-server.xpker.com/video/20140615/beAmRgRqHV_!!58023779.mp4", "rating": 10.0, "cateId": 17, "addTime": "2014-06-15", "cateName": "国内"}
    ], "info": "加载成功"};

    var list = result.data;

    return {
        listAll: function () {
            return list;
        }
    }

}]);