var glass = (function () {
    var $bigBox = document.querySelector('.big');
    var $bigItemAll = document.querySelectorAll('.big-item');
    var $smallItemAll = document.querySelectorAll('.small-item');
    var $bigMoreAll = document.querySelectorAll('.bigMore');
    var $screen = document.querySelectorAll('.screen');
    var $pic = document.querySelectorAll('.bigMoreImg');
    // console.log($bigBox);
    // console.log($bigItemAll);
    // console.log($smallItemAll);
    // console.log($bigMoreAll);
    // console.log($screen);
    // console.log($pic);
    return {
        init() {
            this.event();
            this.magnify(0);
        },
        event() {
            var _this = this;
            //点击小图片显示大图片
            for (var i = 0; i < $smallItemAll.length; i++) {
                $smallItemAll[i].index = i;
                $smallItemAll[i].onmouseover = function () {
                    this.style.borderColor = '#f10180';
                }
                $smallItemAll[i].onmouseout = function () {
                    this.style.borderColor = '#eee';
                }
                $smallItemAll[i].onclick = function () {
                    // console.log(this);
                    var index = this.index;
                    for (var i = 0; i < $smallItemAll.length; i++) {
                        $bigItemAll[i].style.display = 'none';
                        $smallItemAll[i].style.borderColor = '#eee';
                    }
                    $bigItemAll[index].style.display = 'block';
                    $smallItemAll[index].style.borderColor = '#f10180';
                    _this.magnify(index);
                };
            }
        },
        magnify(index) {
            $bigBox.onmouseover = function(){
                $bigMoreAll[index].style.display = 'block';
                $smallItemAll[index].style.borderColor = '#eee';
            }
            $bigMoreAll[index].onmousemove = function (e) {
                var e = event || window.event;
                // 获取鼠标的位置
                var X = e.pageX || e.clientX + document.documentElement.scrollLeft;
                var Y = e.pageY || e.clientY + document.documentElement.scrollTop;
                // 获取screen的位置
                var screenX = X - $bigBox.offsetLeft - $screen[index].offsetWidth / 2;
                var screenY = Y - $bigBox.offsetTop - $screen[index].offsetHeight / 2;
                // 确定screen的移动范围
                screenX = screenX < 0 ? 0 : screenX;
                screenY = screenY < 0 ? 0 : screenY;
                var screenXMax = $bigBox.offsetWidth - $screen[index].offsetWidth;
                var screenYMax = $bigBox.offsetHeight - $screen[index].offsetHeight;
                screenX = screenX > screenXMax ? screenXMax : screenX;
                screenY = screenY > screenYMax ? screenYMax : screenY;
                //确定移动距离
                $screen[index].style.left = screenX + 'px';
                $screen[index].style.top = screenY + 'px';
                //确定背景图片的移动距离
                // screen的移动距离/screen的最大移动距离 = 背景图的移动距离/背景图的最大移动距离
                var picXMax = $pic[index].offsetWidth - $bigBox.offsetWidth;
                var picYMax = $pic[index].offsetHeight - $bigBox.offsetHeight;
                $pic[index].style.top = -screenY / screenYMax * picYMax + 'px';
                $pic[index].style.left = -screenX / screenXMax * picXMax + 'px';
            }
            $bigBox.onmouseout = function(){
                $bigMoreAll[index].style.display = 'none';
            }
        }
    }
}())