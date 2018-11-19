<?php 
	header("Access-Control-Allow-Origin:*");
	include("../connect.php");

	$email = $_POST["email"];
	$pwd = $_POST["pwd"];
	$phone = $_POST["phone"];


	$sql="insert into user_message (email,pwd,phone) values ('$email','$pwd','$phone')";

	$res=mysql_query($sql);
	if($res){
		echo '{"code":1}';
	}else{
		echo '{"code":0}';
	}

	mysql_close();

 ?>