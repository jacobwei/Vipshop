var checkInput = {
    phone(str) {
        var reg = /^1[35789]\d{9}$/;
        return reg.test(str);
    },
    password(str) {
        var reg = /^\w{6,20}$/;
        return reg.test(str);
    },
    code(str){
        return false;
    }
}
var register = (function () {
    var flag = false;
    var submit_flag = false;
    var newcode;
    //var $form = document.querySelector('.form');
    return {
        init(ele) {
            this.$ele = document.querySelector(ele);
            this.$inputAll = this.$ele.querySelectorAll('input');
            this.$phone = this.$ele.querySelector('#phone');
            this.$code = this.$ele.querySelector('#code');
            this.$getcode = this.$ele.querySelector('#getcode');
            this.$password = this.$ele.querySelector('#password');
            this.$repassword = this.$ele.querySelector('#repassword');
            this.$checkbox = this.$ele.querySelector('#checkbox');
            this.$submit = this.$ele.querySelector('#submit');
            this.event();
        },
        event() {
            var _this = this;
            for (let i = 0; i < this.$inputAll.length - 2; i++) {
                this.$inputAll[i].onblur = function () {
                    var $p = this.parentNode.querySelector('.text');
                    if (this.value == '') {
                        this.setAttribute('class', 'inputerror');
                        $p.innerHTML = this.getAttribute('empty');
                    } else {
                        var bool = checkInput[this.name](this.value);
                        if (bool) {
                            this.setAttribute('class', 'inputsuccess');
                            flag_suc_name = true;
                            $p.innerHTML = '';
                        } else {
                            this.setAttribute('class', 'inputerror');
                            flag_suc_name = false;
                            $p.innerHTML = this.getAttribute('error');
                        }
                    }
                }
                this.$inputAll[i].onfocus = function () {
                    var $p = this.parentNode.querySelector('.text');
                    this.removeAttribute('class', 'inputerror');
                    this.removeAttribute('class', 'inputsuccess');
                    $p.innerHTML = '';
                }
            }
            /* 发送验证码按钮的开关--开始 */
            this.$phone.addEventListener("blur", function () {
                _this.$getcode.className = 'notgetcode';
                if (_this.$phone.className.indexOf('inputsuccess') != -1) {
                    _this.$getcode.className = 'getcode';
                    _this.$getcode.removeAttribute('disabled');
                }
            })
            /* 发送验证码按钮的开关--结束 */
            /* 发送验证码--开始 */
            this.$getcode.onclick = function (e) {
                var code = _this.sendcode();
                newcode = code;
                /* 利用弹窗把验证码发送给用户 */
                alert('验证码：' + code);
                this.setAttribute('disabled', 'true');
                e = e || window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                var count = 5;
                var _this_ = this;
                var interval = setInterval(function () {
                    count--;
                    _this_.className = 'notgetcode';
                    _this_.innerHTML = count + 's后重新发送';
                    if (count == 0) {
                        _this_.removeAttribute('disabled');
                        _this_.className = 'getcode';
                        _this_.innerHTML = '获取验证码';
                        clearInterval(interval);
                    }
                }, 1000)
            }
            /* 发送验证码--结束 */
            /* 验证验证码--开始 */
            this.$code.addEventListener('blur', function () {
                var $p = this.parentNode.querySelector('.text');
                if (this.value === newcode) {
                    this.setAttribute('class', 'inputsuccess');
                    flag_suc_code = true;
                    $p.innerHTML = '';
                } else {
                    this.setAttribute('class', 'inputerror');
                    flag_suc_code = false;
                    $p.innerHTML = this.getAttribute('error');
                }
            })
            /* 验证验证码--结束 */
            /* 验证两次密码--开始 */
            this.$repassword.onblur = function () {
                var $p = this.parentNode.querySelector('.text');
                if (this.value == '') {
                    this.setAttribute('class', 'inputerror');
                    $p.innerHTML = this.getAttribute('empty');
                } else {
                    if (this.value === _this.$password.value) {
                        this.setAttribute('class', 'inputsuccess');
                        flag_suc_repwd = true;
                    } else {
                        this.setAttribute('class', 'inputerror');
                        flag_suc_repwd = false;
                        $p.innerHTML = this.getAttribute('error');
                    }
                }
            }
            /* 验证两次密码--结束 */
            this.$checkbox.onclick = function () {
                var $p = this.parentNode.querySelector('.text');
                flag = !flag;
                if (flag) {
                    this.setAttribute('class', 'inputsuccess');
                    flag_suc_box = true;
                    $p.innerHTML = '';
                } else {
                    this.setAttribute('class', 'inputerror');
                    flag_suc_box = false;
                    $p.innerHTML = this.getAttribute('error');
                }
            }
            /* 提交注册--开始 */
            this.$submit.onclick = function () {
                // if (submit_flag) {
                //     this.removeAttribute('disabled');
                // } else {
                // e = e || window.event;
                // e.returnValue = false;
                console.log(this);
                var $pAll = this.parentNode.querySelectorAll('.text');
                for (let i = 0; i < $pAll.length; i++) {
                    var bool = $pAll[i].parentNode.querySelector('input').className.indexOf('inputsuccess');
                    if(bool == -1){
                        $pAll[i].innerHTML = $pAll[i].parentNode.querySelector('input').getAttribute('error');                
                        return false;
                    }
                }
                alert('注册成功');
                sendAjax()
            }
            /* 提交注册--结束 */
        },
        /* 生成6位随机验证码--开始 */
        sendcode() {
            var code = '';
            for (var i = 0; i < 6; i++) {
                var num = Math.floor(Math.random() * 9);
                code += num;
            }
            return code;
        }
        /* 生成6位随机验证码--结束 */
    }
}())
register.init('.form_body');