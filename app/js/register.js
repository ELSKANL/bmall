require(["config"], function(){
	require(["jquery", "template"], function($, template){
		new Promise(function(resolve,reject){
			// resolve();
			$("#email").focus(function(){
				$("#s-email").removeClass("ac");
			});
			$("#email").blur(function(){
				var email=$("#email").val();
				var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
				if(!reg.test(email)){
					$("#s-email").addClass("ac");
				}else{
					$(".ac").attr("class","s-email");
				}
			});	
			$("#pwd").focus(function(){
				$("#s-pwd").removeClass("ac");
			});
			$("#pwd").blur(function(){
				var pwd=$("#pwd").val();
				var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
				if(!reg.test(pwd)){
					$("#s-pwd").addClass("ac");
				}else{
					$(".ac").attr("class","s-pwd");
				}
			});

			$("#rpwd").focus(function(){
				$("#s-rpwd").removeClass("ac");
			});
			$("#rpwd").blur(function(){
				var pwd=$("#pwd").val(),
					rpwd=$("#rpwd").val();
				if(pwd!==rpwd){
					$("#s-rpwd").addClass("ac");
				}else{
					$(".ac").attr("class","s-rpwd");
				}
			});

		}).then(function(){
			$("form").submit(function(e){
				var data={
					email:$("#email").val(),
					pwd:$("#pwd").val(),
					phone:$("#phone").val()
				};
				console.log(data);
				$.ajax({
					method:"post",
					data:data,
					dataType:"json",
					url:"http://localhost/bmall/projectserver/api/register.php",
					success:function(res){
						if(res.code===1){
							console.log(res);
							// location.href = "http://localhost:2333/html/login.html";
						}else{
							alert("注册失败！");
						}
					}
				})
				e.preventDefault();
			})
		})
	 })
})