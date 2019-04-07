<?php
	// 数据库链接
// 	mysql_connect("localhost:3306", "root","root");
// 	//编码格式
// 	mysql_query("set names 'utf8'");
// 	mysql_query("set character set 'utf8")
// 	//选择数据库
// 	mysql_select_db("test")


//采用MySQLi方式连接数据库，使用面向对象的方式联系对用户的CURD（增删查改）
$servername="localhost";
$username="root";
$password="root";
//1.创建数据库连接,生成连接对象$conn
$conn=new mysqli($servername,$username,$password);

//2.检测连接
if($conn->connect_error)
{
    //打印失败信息
    die("数据库连接失败：".$conn->connect_error);
}else{
    echo "数据库连接成功<br>";
}

   
?>