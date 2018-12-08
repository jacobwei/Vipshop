var login = (function () {
    return {
        init(ele) {
            this.$ele = document.querySelector(ele);
            this.$title_sweep = this.$ele.querySelector('.sweep');
            this.$title_account = this.$ele.querySelector('.account');
            this.$login_sweep = this.$ele.querySelector('.login_sweep');
            this.$login_account = this.$ele.querySelector('.login_account');
            this.$sweepchild = this.$login_sweep.children;
            this.ercodeleft = parseInt(this.getStyle(this.$sweepchild[0], 'left'));
            // this.ercodeleft = parseInt(this.getStyle(this.$sweepchild[0], 'left'));

            this.event();
        },
        event() {
            var _this = this;
            this.$title_account.onclick = function () {
                _this.$login_sweep.style.display = 'none';
                _this.$login_account.style.display = 'block';
                _this.$title_sweep.style.color = '#666666';
                _this.$title_account.style.color = '#f10180';
            }
            this.$title_sweep.onclick = function () {
                _this.$login_sweep.style.display = 'block';
                _this.$login_account.style.display = 'none';
                _this.$title_sweep.style.color = '#f10180';
                _this.$title_account.style.color = '#666666';
            }
/* 鼠标滑进二维码，手机显示--开始 */
            this.$login_sweep.onmouseenter = function () {
                var _this_ = _this;
                var opacity = 0;
                setTimeout(function(){
                    var __this_  = _this_;
                    _this.$sweepchild[1].style.display = 'block';
                    var ercodeEnter = setInterval(function () {
                        opacity += 0.02;
                        __this_.$sweepchild[1].style.opacity = opacity;
                        __this_.ercodeleft--;
                        __this_.$sweepchild[0].style.left = __this_.ercodeleft + 'px';
                        if (__this_.ercodeleft <= 38 ) {
                            clearInterval(ercodeEnter);
                        }
                    }, 1)
                },500)

            }
/* 鼠标滑进二维码，手机显示--结束 */
/* 鼠标移出--开始 */
            this.$login_sweep.onmouseleave = function () {
                var _this_ = _this;
                var opacity = 1;
                setTimeout(function(){
                    var __this_  = _this_;
                    var ercodeLeave = setInterval(function () {
                        opacity -= 0.02;
                        __this_.$sweepchild[1].style.opacity = opacity;                    _this_.ercodeleft++;
                        __this_.$sweepchild[0].style.left = __this_.ercodeleft + 'px';
                        if (__this_.ercodeleft >= 118) {
                            clearInterval(ercodeLeave);
                            __this_.$sweepchild[1].style.display = 'none';
                        }
                    }, 1)
                },500)
        }
/* 鼠标移出--结束 */
        },
        getStyle(el, attr) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(el, false)[attr];
            }
            return el.currentStyle[attr];
        }
    }
}())
login.init('.login');