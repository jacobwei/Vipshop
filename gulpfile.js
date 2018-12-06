<<<<<<< HEAD
var gulp = require('gulp');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  console.log(1+5);
});
=======
var gulp = require('gulp'); //加载gulp
var uglify = require('gulp-uglify'); //加载js压缩
var babel = require('gulp-babel');//转义ES6转成ES5
var connect = require('gulp-connect');//连接服务器
var concat = require('gulp-concat'); //合并文件
var rename = require("gulp-rename");//文件重命名

//压缩JS
gulp.task('minijs', function () {
    gulp.src('app/static/js/*.js')
        //先转义，不然会报错
        .pipe(babel({
            preset:['@babel/env']
        }))
        //.pipe(concat('all.js'))
        //再压缩
        .pipe(uglify())
        .pipe(rename({
            //添加后缀
            suffix:'.min'
        }))
        .pipe(gulp.dest('dist'))
        //压缩完成执行重新加载，实现页面与代码实时更新
        .pipe(connect.reload());
});
//合并JS
gulp.task('concatJs', function () {
    gulp.src('app/static/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
});
//开启服务器
gulp.task('connect', function () {
    connect.server(
        {
            root:'dist',//设置根目录，建议设置成dist，也就是项目上线发送给客户看的文件夹
            port:8888,//监听的服务器端口号
            livereload:true//热更新（实时更新）
        }
    )
});
//监听任务
gulp.task('watch', function () {
    gulp.watch('app/**/*.html',['minihtml'])
    gulp.watch('app/**/*.js',['minijs'])
});
// gulp.task('default', function() {
//   // 将你的默认的任务代码放在这
//   console.log(1+2);
// });
// gulp.task('minihtml',function(){
//     console.log('开始压缩html');
// });
// gulp.task('minicss',function(){
//     console.log('开始压缩css');
// });
// gulp.task('miniimages',function(){
//     console.log('开始压缩images')
// });
// gulp.task('mini',['minihtml','minicss','miniimages'],function(){
//     console.log('压缩完成！');
// });
>>>>>>> 9b8bd173226660b8e3fe212c7401ddc8711ccf93
