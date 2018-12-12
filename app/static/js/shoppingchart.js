var shopCar = (function () {
    var $table = document.querySelector('.commodity');
    var $count = document.querySelector('#count');
    var count = $count.value;
    return {
        init() {
            this.event();
            this.getData();
        },
        event() {
            var _this = this;
            $table.onclick = function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                var deltr = target.parentNode.parentNode;
                if(target.id == 'del'){
                    deltr.remove();
                }else if(target.id == "add"){
                    count = target.previousElementSibling.value;
                    count++;                                            
                    target.previousElementSibling.value = count;                                           
                }else if(target.id == "sub"){
                    count = target.nextElementSibling.value;
                    count--;
                    if(count <= 1){
                        count = 1;
                    }
                    target.nextElementSibling.value = count;
                }
            }
        },
        getData() {
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            console.log(shopList);
            this.insertData(shopList);
        },
        insertData(data) {
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
                `
                $table.appendChild($tr);
            })
        }
    }

}())
shopCar.init();
