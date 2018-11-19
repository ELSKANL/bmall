<?php 
	header("Access-Control-Allow-Origin:*");
	include("../connect.php");

	$email = $_POST["email"];
	$pwd = $_POST["pwd"];


	$sql="select * from user_message where email='$email' and pwd='$pwd'";

	$res=mysql_query($sql);
	if(mysql_num_rows($res)===1){
		echo '{"code":1}';
	}else{
		echo '{"code":0}';
	}

	mysql_close();

 ?>