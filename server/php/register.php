<?php
    $phone = $_POST['phone'];
    $pwd = $_POST['password'];
    $coon = new mysqli('localhost', 'root', '', 'vipshop_userinfo', 3306);
    $sql = "SELECT userphone FROM userinfo where userphone = '$phone'";//查询语句：数据库中是否存在该号码
    $coon->query("SET CHARACTER SET 'utf8'");//读库   
    $coon->query("SET NAMES 'utf8'");//写库 
    $result = $coon -> query($sql); //执行
    //var_dump($result);
    $num = mysqli_num_rows($result);//执行查询语句返回数据的行数
    //判断号码已存在
    if($num) {
        //提示号码存在并返回注册页面
        echo "<script>alert('该号码已被注册，请换其他号码试试');history.go(-1); </script>"; 
    }else{
        //号码不存在，把用户的注册信息插入数据库中，默认把手机号码设置为用户名
        $sql_insert = "INSERT INTO userinfo (username,userpwd,userphone) VALUES('$phone','$pwd','$phone')";  
        $res_insert = $coon->query($sql_insert);  
        if($res_insert)  
            {  
                echo "<script>alert('注册成功！');</script>";  
            }  
         else  
            {  
                echo "<script>alert('系统繁忙，请稍候！'); history.go(-1);</script>";  
            }  

    }
?>