<?php   
        //获取用户名、密码
        $user = $_GET["username"];
        $psw = $_GET["userpwd"];  
        //如果用户名或密码为空
        if($user == "" || $psw == "")  
        {  
            //弹窗提醒，并返回登录页
            echo "<script>alert('请输入用户名或密码！');</script>";
            // history.go(-1); 
            //
        }  
        else  
        {  
            // mysql_connect("localhost","admin","");  
            // mysql_select_db("userinfo");  
            // mysql_query("SET NAMES 'utf8'");  
            $coon = new mysqli('localhost', 'root', '', 'vipshop_userinfo', 3306);
            $sql = "SELECT username,userpwd FROM userinfo where username = '$user' and userpwd = '$psw'";  
            $coon->query("SET CHARACTER SET 'utf8'");//读库   
            $coon->query("SET NAMES 'utf8'");//写库 
            $result = $coon -> query($sql); //执行查询语句
            var_dump($result);
            $num = mysqli_num_rows($result); //统计影响的行数
            if($num)  
            {  
                // $row = mysqli_fetch_array($result);  //将数据以索引方式储存在数组中  
                // echo $row[0];
                echo "<script>alert('登录成功！');</script>";  
            }  
            else  
            {  
                echo "<script>alert('用户名或密码不正确！');history.go(-1);</script>";
                // history.go(-1);  
            }  
        }   
?>
