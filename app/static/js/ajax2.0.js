var getXHR = function () {
    var flag = false, xhr = null, ary = [function () {
        return new XMLHttpRequest;
    }, function () {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }, function () {
        return new ActiveXObject("Msxml2.XMLHTTP");
    }, function () {
        return new ActiveXObject("Msxml3.XMLHTTP");
    }];
    for (var i = 0, len = ary.length; i < len; i++) {
        var temp = ary[i];
        try {
            xhr = temp();
            getXHR = temp;
            flag = true;
            break;
        } catch (e) {

        }
    }
    if (!flag) {
        throw new Error("your browser is not support ajax~");
    }
    return xhr;
};
//  解决get请求的缓存问题
function sendAjax(url, obj) {
    const xhr = getXHR();
    const _default = {
        method: 'GET',
        data: null
    }
    for(var key in _default) {
        if(key in obj) {
            _default[key] = obj[key];
        }
    }
    _default.method = _default.method.toUpperCase()
    if(_default.method == 'GET') {
        // json/a.json?id=10&name=xixi&age=10&_=19191918
        let flag = url.indexOf('?') == -1 ? "?" : "&";
        url += flag;
        for(var i in _default.data) {
            let keyValue = `${i}=${_default.data[i]}`;
            url += keyValue + '&';
        }
        // 添加一个时间戳, 解决get请求的缓存问题
        url += `_=${Date.now()}`;
        console.log(url);
        _default.data = null;
    } else if(_default.method == 'POST') {
        
        _default.data = JSON.stringify(_default.data);
    } else {
        console.log('告辞!');
        return;
    }

    xhr.open(_default.method, url, true);
    xhr.send(_default.data);
    return new Promise(function(resolve, reject) {
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 ) {
                if(xhr.status == 200) {
                    let data = xhr.response;   
                    resolve(data);
                } else {
                    let data = xhr.response;   
                    reject(data);
                }
            }
        }
    })
}
