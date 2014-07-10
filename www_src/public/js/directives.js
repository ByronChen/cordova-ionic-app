//自定义标签
//缩放图片
zlzapp.directive('zlzImgSrc', [function(){
    var link = function(scope, element, attrs) {
        attrs.$observe('zlzImgSrc', function(value) {
            if(!value){
                return;
            }
            var arr = value.split(',');
            if(arr.length!=2){
                return;
            }
            attrs.$set('src', arr[0]+"_"+arr[1]+arr[0].substr(arr[0].lastIndexOf('.')));
        });
    }
    return {
        link:link
    };
}]);