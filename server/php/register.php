<?php
    $phone = $_POST['phone'];
    $pwd = $_POST['password'];
    $coon = new mysqli('localhost', 'root', '', 'vipshop_userinfo', 3306);
    $sql = "SELECT userphone FROM userinfo where userpone = '$phone'";//查询语句：数据库中是否存在该号码
    $coon->query("SET CHARACTER SET 'utf8'");//读库   
    $coon->query("SET NAMES 'utf8'");//写库 
    $result = $coon -> query($sql); 
    //var_dump($result);
    $num = mysqli_num_rows($result); 
    if($num) {
        echo "<script>alert('该号码已被注册，请换其他号码试试');</script>"; 
    }else{
        echo "<script>alert('注册成功！');</script>"; 
        $sql_insert = "INSERT INTO userinfo (username,userpwd,userphone) VALUES('$phone','$pwd','$phone')";  
        $res_insert = $coon->query($sql_insert);  
        //$num_insert = mysql_num_rows($res_insert);  
        if($res_insert)  
            {  
                echo "<script>alert('注册成功！'); </script>";  
            }  
         else  
            {  
                echo "<script>alert('系统繁忙，请稍候！'); history.go(-1);</script>";  
            }  

    }
?>