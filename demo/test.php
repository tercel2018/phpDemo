<?php
 $x = 5;
 $y = 'hello，PHP';
 echo $y;
 // 字符集
 echo "<meta charset='utf-8'/>";
 // 连接数据库
 include "common/mysal_connect.php";
 
 // 获取表单, cookie
  $nser_name = $_POST['userame'];
  $pass_world = $_POST['password'];
  $phone = $_POST['phone'];
  $sex = $_POST['sex'];
  $pass_world = $_POST['password'];
  $cookie = $_COOKIE['token'];
  
// sql 语句  INSERT INTO info
//  $sql = "INSERT INTO info(name,password) VALUES('$nser_name','$pass_world')";


//4.选择要操作的数据库, 选择数据库
$sql="use test";
if($conn->query($sql)===true) {
    echo "选择test数据库成功<br>";
}
else{
    echo "选择test 数据库失败".$conn->error;
}

// 一、增加数据
//6.给test数据库中的user_msg数据表添加数据
//书写添加数据库的语句
$sql="INSERT INTO user_msg(name,password,sex,phone)
VALUES ('$nser_name','$pass_world','$sex','$phone')";
if($conn->query($sql)===true) {
    echo "数据插入成功";
	// echo "<script> alert('注册成功');  location = '/succeed.html' </script> ";
} else{
    echo "数据插入失败".$conn->error;
}

// 从数据表中查询数据指定的几列数据，并打印出来
// 查询所有的
// $sql ="select id,name,password,sex,phone from user_msg";
// $result=$conn->query($sql);
// if ($result->num_rows>0){
//     //循环答应数据
//     while($row=$result->fetch_assoc()) {
//         echo "id:&nbsp;".$row["id"]."姓名:&nbsp;".$row["name"]."&nbsp;&nbsp; 密码:".$row["password"]."<br>";
//     }
// }else{
//     echo "0结果<br>";
// }
// 
// 查询某一条数据
$query_id = '20';
$result=mysqli_query($conn,"select id,name,password,sex,phone from user_msg
where id= '$query_id'");
while($row =mysqli_fetch_array($result)) {
    echo "<br/>".$row['id']." ".$row['name']."&nbsp;&nbsp;查询某一条数据 <br/>." ;
}

//11.改动数据表中的某个记录---更新数据表记录
mysqli_query($conn,"update user_msg set name='小江'
where id='40'");

//12.删除一行数据（删除某个记录）
mysqli_query($conn,"delete from user_msg where name='小红'");

//13.关闭数据库连接
mysqli_close($conn);

// $result = mysql_query($sql);
// echo $result ;
echo  $cookie, "<br/>";
echo $nser_name,$pass_world;
 
if($sql)
//  // location = '/succeed.html'
  echo "<script> alert('注册成功');  </script> ";
else
	echo "<script> alert('注册失败,请重新注册'); location = '/index.html'</script>";
?>
