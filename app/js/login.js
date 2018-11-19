require(["config"], function(){
	require(["jquery", "template","cookie"], function($, template){
		new Promise(function(resolve,reject){
			$("footer").load("/html/component/footer.html .footer-down", function(){
				resolve();
			})
		}).then(function(){
			$("form").submit(function(e){
				var data={
					email:$("#email").val(),
					pwd:$("#pwd").val()
				};
				
				$.ajax({
					method:"post",
					data:data,
					dataType:"json",
					url:"http://localhost/bmall/projectserver/api/login.php",
					success:function(res){
						console.log(res);
						if(res.code===1){
							$.cookie.json=true;
							$.cookie("user",data.email,{path:"/"});
							location.href = "http://localhost:2333/index.html";
						}else{
							alert("用户名或者密码错误！");
						}
					}
				})
				e.preventDefault();
			})
		})
	})
})