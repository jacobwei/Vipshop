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
        var reg = /^\d{6}$/;
        return reg.test(str);
    }
}
var register = (function(){
    var flag = false;
    return {
        init(ele){
            this.$ele = document.querySelector(ele);
            this.$inputAll = this.$ele.querySelectorAll('input');
            this.$password = this.$ele.querySelector('#password');
            this.$repassword = this.$ele.querySelector('#repassword');
            this.$checkbox = this.$ele.querySelector('#checkbox');
            this.$submit = this.$ele.querySelector('#submit');
            // console.log(this.$checkbox);
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
            this.$submit.onclick = function(){
                var $pAll = this.parentNode.querySelectorAll('.text');
                // console.log($pAll);
                for(let i = 0; i < $pAll.length; i++){
                    if($pAll[i].className.indexOf('inputsuccess') == -1){
                        $pAll[i].innerHTML = $pAll[i].parentNode.querySelector('input').getAttribute('error');
                    }
                }
                // alert('chenggong');
                sendAjax(
                    '../../../server/php/register.php',
                    {
                        "userphone":$inputAll['phone'].value,
                        "userpwd":$inputAll['password'].value,
                        
                    }
                )
            }
        }
    }
}())
register.init('.form_body');