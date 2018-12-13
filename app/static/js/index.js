var shop = (function() {
    var $ul = document.querySelector('.list_box');
    return {
        init() {
            this.event();
            this.getData();
        },
        event() {
            var _this = this;
            $ul.onclick = function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.nodeName === 'A') {
                    // 获取商品数量
                    // 获取当前li
                    var father = target.parentNode;
                    // 拿到的值是字符串, count应该是number类型的
                    var count = father.querySelector('.count').value;
                    // 从商品数据中,获取对应这一个商品的数据
                    _this.data[father.index].count = Number(count);
                    _this.setItem(_this.data[father.index]);
                }

            }
        },
        getData() {
            sendAjax('../../../server/json/goodsdata.json').then(res => {
                res = JSON.parse(res);
                if(res.code == 0) {
                    // 把商品数据存到shop对象里
                    this.data = res.data;
                    this.insertData(res.data);
                } else {
                    alert("获取信息失败, 请查询网络状况");
                }
            });
        },
        insertData(data) {
            console.log(data);
            // 循环数组
            for(let i= 0; i < data.length; i++ ) {
                var $li = document.createElement('li');
                $li.index = i;
                $li.innerHTML = `
                    商品名称:<span class='title'>${data[i].title}</span></br>
                    商品价格<span class='price'>${data[i].price}</span></br>
                    购买数量<input class="count" placeholder="请输入数量" /></br>
                    <button>加入购物车</button>
                `
                $ul.appendChild($li);
            }

        },
        // 把商品数据存储到本地
        setItem(data) {
            // 现获取原有数据
            var shopList = localStorage.getItem('shopList') || '[]';
            shopList = JSON.parse(shopList);
            console.log(shopList, data);
            // 判断购物数据中, 是否存在当前商品
            for(var i = 0; i < shopList.length; i++) {
                if(data.id == shopList[i].id) {
                    // 此商品已经存在
                    shopList[i].count += data.count;
                    break;
                }
            }
            if(i == shopList.length) {
                // 商品不存在
                shopList.push(data);

            }
            // shopList[i].count += data.count;
            // 在把全部数据存到本地
            localStorage.shopList = JSON.stringify(shopList);
            // console.log(shopList);

        }
    }
}())
