var shop = (function() {
    var $ul = document.querySelector('.list_box');
    var $liAll = $ul.querySelectorAll('li');
    var $goumai = document.querySelector('.goumai');
    var $title = document.querySelector('.list_item_title');
    var $price = document.querySelector('.pro_price');
    var $size  = document.querySelector('.size');
    var $b_price = document.querySelector('.b_price');
    var $count = document.querySelector('.count');
    // console.log($ul);
    // console.log($liAll);
    // console.log($goumai);
    return {
        init() {
            this.event();
           // this.getData();
        },
        event() {
            var _this = this;
            $goumai.onclick = function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                e.preventDefault();
                var title = $title.innerHTML,
                    price = $price.innerHTML,
                    bsize = $size.innerHTML,
                    before_price = $b_price.innerHTML,
                    icount = $count.innerHTML;
                    // console.log(title);
                    // console.log(price);
                    // console.log(bsize);
                    // console.log(before_price);
                    // console.log(icount);
                var goodObj = {
                    "pro_name":title,
                    "size":bsize,
                    "price_now":price,
                    "b_price":before_price,
                    "count":icount
                };
                console.log(goodObj);
                //把商品属性对象转成JSON字符串，存到缓存里面
                goodObj = JSON.stringify(goodObj)
                localStorage.setItem("goodsList",goodObj);
                // 跳转到商品详情页面
                window.open("../html/product.html");
            }
        },

    }
}())
shop.init();
