var shopCar = (function () {
    return {
        init() {
            this.$table = document.querySelector('.commodity');
            this.getData();
            this.$count = document.querySelector('#count');
            this.
            this.count = this.$count.value ;
            this.event();
        },
        event() {
            var _this = this;
            this.$count.oninput = function (e) {
                e = e || window.event;
                var target =  e.target || e.srcElement;
                var index = target.parentNode.parentNode.parentNode.index;                  
                console.log(index);
                if(target.id === 'count') {
                    var data = _this.data[index];
                    data.count = Number(target.value);
                    localStorage.shopList = JSON.stringify(_this.data);
                    target.parentNode.parentNode.parentNode.remove();
                    _this.insertData(_this.data);
                } 
            }
            this.$table.onclick = function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                var deltr = target.parentNode.parentNode;
                if(target.id == 'del'){
                    _this.data.splice(deltr.index, 1);
                    deltr.remove();
                    localStorage.shopList = JSON.stringify(_this.data);

                }else if(target.id == "add"){
                    _this.count = target.previousElementSibling.value;
                    _this.count++;                                            
                    // target.previousElementSibling.value = _this.count;
                    var index = target.parentNode.parentNode.parentNode.index;
                    var data = _this.data[index];
                    data.count = _this.count;
                    localStorage.shopList = JSON.stringify(_this.data);
                    target.parentNode.parentNode.parentNode.remove();
                    _this.insertData(_this.data);                                           
                }else if(target.id == "sub"){
                    _this.count = target.nextElementSibling.value;
                    _this.count--;
                    if(_this.count <= 1){
                        _this.count = 1;
                    }
                    // target.nextElementSibling.value = _this.count;
                    var index = target.parentNode.parentNode.parentNode.index;
                    var data = _this.data[index];
                    data.count = _this.count;
                    localStorage.shopList = JSON.stringify(_this.data);
                    target.parentNode.parentNode.parentNode.remove();
                    _this.insertData(_this.data);                                           

                }
            }
        },
        getData() {
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            this.data = shopList;
            console.log(shopList);
            this.insertData(shopList);
        },
        insertData(data) {
            this.$table.innerHTML = '';
            data.forEach((item, index) => {
                var $tr = document.createElement('tr');
                $tr.setAttribute('class', 'goods');
                $tr.index = index;
                $tr.innerHTML = `
                <td class="product_item">
                <p class="goods_img"></p>
<!-- 商品名写在a标签里 -->   <p style="display:inline-block; height:34px;"><i style="color:#f10180">自营</i><div class="split-line goods_line"></div>
                     <a>${data[index].product}</a>
                </p>
<!--尺码 -->                <p style="margin-top:10px;width:50px;">尺码：${data[index].size}</p>
                </td>
        <td>
<!-- 现价 -->            <p style="font-weight:900;">￥${data[index].price_now}</p>
<!-- 原价 -->            <p style="text-decoration-line: line-through; color:#999;">￥${data[index].price_before}</p>
        </td>
        <td>
            <div class="number">
                <input type="button" name="sub" id="sub" value="-">
                <input type="text" name="count" id="count" value="${data[index].count}" >
                <input type="button" name="add" id="add" value="+">
            </div>
        </td>
        <td>
<!-- 小计 -->    <p style="color:#f10180;font-weight:900;margin:0 auto;width:145px;">￥${data[index].price_now * data[index].count}</p>            
        </td>
        <td>
<!-- 删除按钮 --> <a id="del" style="cursor:pointer;">删除</a>                  
        </td>
                `;
                this.$table.appendChild($tr);
            })
        }
    }

}())
shopCar.init();
