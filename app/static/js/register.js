var checkInput = {
    phone(str){
        var reg = /^1[35789]\d{9}$/;
        return reg.test(str);
    },
    password(str){
        var reg = /^\w{6,20}$/;
        return reg.test(str);
    },
    code(str){
        var reg = /^\d{6}$/
        return reg.test(str);
    }
}
var register = (function(){
    var flag = false;
    return {
        init(ele){
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
        event(){
            var _this = this;
            for(let i = 0;i < this.$inputAll.length - 2;i++){
                this.$inputAll[i].onblur = function(){
                    var $p = this.parentNode.querySelector('.text');
                    if(this.value == ''){
                        this.setAttribute('class','inputerror');
                        $p.innerHTML = this.getAttribute('empty');
                    }else{
                        var bool = checkInput[this.name](this.value);
                        if(bool){
                            this.setAttribute ('class','inputsuccess');
                            $p.innerHTML = '';
                        }else{
                            this.setAttribute('class','inputerror');
                            $p.innerHTML = this.getAttribute('error');
                        }
                    }
                }
                this.$inputAll[i].onfocus = function(){
                    var $p = this.parentNode.querySelector('.text');
                    this.removeAttribute('class','inputerror');
                    this.removeAttribute('class','inputsuccess');
                    $p.innerHTML = '';
                }
            }
/* 发送验证码按钮的开关--开始 */
            this.$phone.addEventListener("blur",function(){
                _this.$getcode.className = 'notgetcode';
                if(_this.$phone.className.indexOf('inputsuccess') != -1){
                    _this.$getcode.className = 'getcode';
                    _this.$getcode.removeAttribute('disabled');
                }
            })
/* 发送验证码按钮的开关--结束 */
/* 发送验证码--开始 */
            this.$getcode.onclick = function(e){
                sendcode();
                this.setAttribute('disabled','true');
                e = e || window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                var count=5; 
                var _this = this;
                var interval = setInterval(function(){
                    count --;
                    _this.className = 'notgetcode';
                    _this.innerHTML = count +'s后重新发送';
                    if(count == 0){
                        _this.removeAttribute('disabled'); 
                        _this.className = 'getcode';
                        _this.innerHTML = '获取验证码';                      
                        clearInterval(interval);
                    }
                },1000)
            }
/* 发送验证码--结束 */
/* 验证两次密码--开始 */
            this.$repassword.onblur = function(){
                var $p = this.parentNode.querySelector('.text');
                if(this.value == ''){
                    this.setAttribute('class','inputerror');
                    $p.innerHTML = this.getAttribute('empty');
                }else{
                    if(this.value === _this.$password.value){
                        this.setAttribute ('class','inputsuccess');
                    }else{
                        this.setAttribute('class','inputerror');
                        $p.innerHTML = this.getAttribute('error');
                    }
                }
            }
/* 验证两次密码--结束 */
            this.$checkbox.onclick = function(){
                var $p = this.parentNode.querySelector('.text');
                flag = !flag;
                if(flag){ 
                    this.setAttribute ('class','inputsuccess');
                    $p.innerHTML = '';
                }else{
                    this.setAttribute('class','inputerror');
                    $p.innerHTML = this.getAttribute('error'); 
                }
            }
/* 提交注册--开始 */
            this.$submit.onclick = function(){
                var $pAll = this.parentNode.querySelectorAll('.text');
                for(let i = 0; i < $pAll.length; i++){
                    var bool = $pAll[i].parentNode.querySelector('input').className.indexOf('inputsuccess');
                    if(bool == -1){
                        $pAll[i].innerHTML = $pAll[i].parentNode.querySelector('input').getAttribute('error');
                        return;
                    }
                }
                alert('chenggong');
            }
/* 提交注册--结束 */
        },
/* 生成6位随机验证码--开始 */
            /* sendcode(){
                var code = '';
                for(var i = 0;i < 6;i ++){
                    var num = Math.Math.random
                }
            } */

/* 生成6位随机验证码--结束 */
    }
}())
register.init('.form_body');