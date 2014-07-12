cordova-ionic-app
===

cordova+ionic的手机应用开发脚手架(目前只示范了Android应用)

![Ionic GUI](http://ionicframework.com/img/gui_screen.jpg)

##特性:
- 自动管理js依赖(使用了`bower`管理依赖)
- 自动合并、压缩JS、CSS，压缩图片(使用了`Grunt`构建)
- 大量丰富的手机APP的UI组件(采用了`ionic`框架,[ionic传送门](https://github.com/driftyco/ionic))
- 强大的单页交互效果(`ionic`框架集成了`AngularJS`)
- 设置了debug模式，修改代码自动刷新浏览器
- 采用build机制，自动合并、压缩JS/CSS/HTML(包括HTML中的内链CSS/JS)，总之全部压缩混淆，打包成app发布后有效的保护源码

##使用方式:
-提前条件：自行安装nodejs、bower和Grunt环境以及phonegap(cordova)环境

先自动安装nodejs依赖
```bash
$ npm install
```
再自动安装js依赖
```bash
$ bower install
```
编码过程中运行以下命令，会自动刷新浏览器显示结果
```bash
$ grunt debug
```
一个阶段编码结束后，运行以下命令，可以压缩所有源码到根目录的dist目录
```bash
$ grunt build
```
最终浏览器再预览一遍，看看压缩后的代码有没有出错(比如ionic的依赖注入需要特殊处理后才能压缩js，否则会报错)
```bash
$ grunt server
```
完成工作，Android的真机调试，运行以下命令
```bash
$ cordova run
```
记得先插上手机哦
<br/>
祝玩的愉快:)
<br/>
