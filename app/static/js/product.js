var shop = (function () {
    var $goumai = document.querySelector('.goumai');
    var $pro_name = document.querySelector('.pib-title-info');
    var size = 'S';
    var $price_now = document.querySelector('.pro_price');
    var $b_price = document.querySelector('.b_price');
    var $count = document.querySelector('.num');
    console.log($goumai);
    return {
        init() {
           // insertData();
            this.event();
            // this.getData();
        },
        event() {
            var _this = this;
            var add = document.querySelector('.add');
            var sub = document.querySelector('.sub');
            var count = Number($count.value);
            add.onclick = function () {
                count ++
                $count.value = count;
            }
            sub.onclick = function () {
                count --;
                $count.value = count;
            }
            $goumai.onclick = function (e) {
                e = e || window.event;
                e.preventDefault();
                var target = e.target || e.srcElement;
                //获取商品各属性值
                pro_name = $pro_name.innerHTML;
                price_now = $price_now.innerHTML;
                b_price = $b_price.innerHTML;
                // console.log(count);
                // console.log(pro_name);
                // console.log(size);
                // console.log(price_now);
                // console.log(b_price);
            }
        },
        //把localStorage存储的商品属性取出，重新渲染到对应的标签
        insertData() {
            $pro_name.innerHTML = '';
            $pro_name.innerHTML =  JSON.parse(localStorage.getItem('pro_name'));
            console.log($pro_name.innerHTML);
        }     
    }
}())
shop.init();