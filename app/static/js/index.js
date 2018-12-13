/* var shop = (function() {
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
                window.open("/Vipshop/app/statichtml/product.html");
            }
        },

    }
}())
shop.init(); */





var shop = (function() {
    var $ul = document.querySelector('.list_box');
    return {
        init() {
            this.getData();
            this.event();
        },
        event() {
            var _this = this;
            $ul.onclick = function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.className === 'goumai') {
                    // 获取商品数量
                    // 获取当前li
                    var father = target.parentNode.parentNode.parentNode;
                    // var count = father.querySelector('.count').value;
                    // // 从商品数据中,获取对应这一个商品的数据
                    // _this.data[father.index].count =Number(count) ;
                    console.log(_this.data[father.index])
                    _this.setItem(_this.data[father.index]);
                }
            }
        },
        getData() {
            sendAjax('/Vipshop/server/json/goodsdata.json').then(res => {
                res = JSON.parse(res);
                if(res.code == 0) {
                    // 把商品数据存到shop对象里
                    this.data = res.data;
                    this.insertData(this.data);
                } else {
                    alert("获取信息失败, 请查询网络状况");
                }
            });
        },
        insertData(data) {
            // 循环数组
            for(let i= 0; i < data.length; i++ ) {
                var $li = document.createElement('li');
                $li.setAttribute('class','list_item');
                $li.index = i;
                $li.innerHTML = `
            <div class="list_item_pic">
                <a>
                    <img src="/Vipshop/app/static/images/index/shoplist_img/id-${i+1}.jpg">
                </a>
            </div>
            <div class="list_item_text">
                <div class="list_item_price">
                    <p class="list_item_title">${data[i].product}</p>
                    <span class="pbox_price_show">
                        <i class="weipinjia">唯品价</i>
                        <i class="rmb">¥</i>
                        <em class="pro_price">${data[i].price_now}</em>
                    </span>
                    <span class="dicount_box">
                        <span class="pbox_market">
                            ¥
                            <del class="b_price">${data[i].price_before}</del>
                        </span>
                        <span class="pbox_off">3.8折</span>
                    </span>
                </div>
                <div>
                    <span class="list_item_size">
                        <i class="isize">尺码：</i>
                        <i class="size">${data[i].size}</i>
                    </span>
                </div>
                <div>
                    <a href="shoppingchart.html" class="goumai" target="_blank">立即购买</a>
                </div>
            </div>
                `
                $ul.appendChild($li);
            }

        },
        // 把商品数据存储到本地
        setItem(data) {
            // 现获取原有数据
            var shopList = localStorage.getItem('shopList') || '[]';
            shopList = JSON.parse(shopList);
            // 在把新数据push到原有数据
            for(var i = 0; i < shopList.length; i++) {
                if(shopList[i] != null){
                    if(data.id == shopList[i].id) {
                        // 此商品已经存在
                        shopList[i].count += data.count;
                        break;
                    }
                    
                }
                
            }
            if(i == shopList.length){
                shopList.push(data);
            }
            // 在把全部数据存到本地
            localStorage.shopList = JSON.stringify(shopList);
            console.log(shopList);

        }
    }
}())

shop.init();
