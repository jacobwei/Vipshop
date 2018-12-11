var gulp = require('gulp'); //加载gulp
var uglify = require('gulp-uglify'); //加载js压缩
var babel = require('gulp-babel'); //转义,ES6转成ES5
var connect = require('gulp-connect'); //连接服务器
var concat = require('gulp-concat'); //合并文件
var rename = require("gulp-rename"); //文件重命名
var rev = require("gulp-rev"); //自动生成版本号
var revCollector = require("gulp-rev-collector");
var del = require("del"); //删除
const htmlmin = require("gulp-htmlmin"); //压缩HTML
const runSequence = require("run-sequence") //控制多个任务同步执行或者异步执行
var sass = require('gulp-sass'); //把sass文件转成css文件
sass.compiler = require('node-sass'); //sass添加一个ompiler属性
const image = require('gulp-image'); //压缩图片
var minifyCss = require('gulp-clean-css'), //压缩css
    pump = require('pump');

//压缩JS
gulp.task('minjs', function () {
    gulp.src('app/static/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

//压缩图片
gulp.task('minimage', function () {
    gulp.src('app/static/images/*')
        .pipe(image())
        .pipe(gulp.dest('dist/images'));
});

//压缩css
gulp.task('minicss',function () {
    gulp.src('app/static/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
});

//压缩JS
/*gulp.task('minijs', function () {
    gulp.src('app/static/js/*.js')
        //先转义，不然会报错
        .pipe(babel({
            preset:['@babel/env']
        }))
        //.pipe(concat('all.js'))
        //再压缩
        .pipe(uglify())
        .pipe(rev())
        // .pipe(rename({
        //     //添加后缀
        //     suffix:'.min'
        // }))
        .pipe(gulp.dest('./dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
        //压缩完成执行重新加载，实现页面与代码实时更新
        // .pipe(connect.reload());
});*/
//合并JS
gulp.task('concatjs', function () {
    gulp.src('app/static/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
});
//开启服务器
gulp.task('connect', function () {
    connect.server({
        root: 'dist', //设置根目录，建议设置成dist，也就是项目上线发送给客户看的文件夹
        port: 7777, //监听的服务器端口号
        livereload: true //热更新（实时更新）
    })
});
//清空
gulp.task('clean',()=>{
    del(['dist','rev'])
})
//复制
gulp.task('all',function(){
    gulp.src('app/**/*.*')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
})

//监听任务
gulp.task('watch', function () {
    gulp.watch('app/**/*.*', ['all'])
});
//压缩HTML
gulp.task('minihtml', function () {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        // minifyJS: true,//压缩页面JS
        // minifyCSS: true//压缩页面CSS
    };
    gulp.src('app/static/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});
//控制多任务的同步或异步
gulp.task('build', function (callback) {
    runSequence('build-clean',
        ['build-scripts', 'build-styles'],
        'build-html',
        callback);
});

gulp.task('default',['clean','all','watch','connect'])

//把sass转为css文件
gulp.task('sass', function () {
    return gulp.src('app/static/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
})