var shopCar = (function () {
    var $table = document.querySelector('.commodity');
    return {
        init() {
            this.event();
            this.getData();
        },
        event() {
            var _this = this;
        },
        getData() {
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);

            console.log(shopList);
            this.insertData(shopList)

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
<!-- 现价 -->            <p style="font-weight:900;">${data[index].price_now}</p>
<!-- 原价 -->            <p style="text-decoration-line: line-through; color:#999;">${data[index].price_before}</p>
        </td>
        <td>
            <div class="number">
                <input type="button" name="sub" id="sub" value="-">
                <input type="text" name="num" id="num" >
                <input type="button" name="add" id="add" value="+">
            </div>
            <script>
                var $add = document.getElementById('add');
                var $num = document.getElementById('num');
                var $sub = document.getElementById('sub');
                var count = $num.value;
                $add.onclick = function(){
                    count = $num.value;
                    count++;
                    $num.value = count;
                }
                $sub.onclick = function(){
                    count = $num.value;
                    count--;
                    if(count <= 1){
                        count = 1;
                    }
                    $num.value = count;
                }
            </script>
        </td>
        <td>
<!-- 小计 -->            <p style="color:#f10180;font-weight:900;margin:0 auto;width:145px;">￥699</p>            
        </td>
        <td>
<!-- 删除按钮 -->         <a id="del" style="cursor:pointer;">删除</a>                  
        </td>

                `
                $table.appendChild($tr);
            })
        }
    }

}())
shopCar.init();
