require(["config"], function(){
	require(["jquery", "template","lunbo","header","cookie"], function($, template){
		
		new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html", function(){
				resolve();
			})
		}).then(function(){
			$.cookie.json = true;
			if($.cookie("user")){
			$(".list-username").html(`<a href="#" class="a-username">${$.cookie("user")}</a>`);
			$(".list-remove").html(`<a href="html/login.html" class="a-remove">退出</a>`);
		}
		// }).then(function(){
		// 	$.ajax({
		// 		method: "get",
		// 		url:"http://rap2api.taobao.org/app/mock/117353/api/list",
		// 		success: function(res){
		// 			console.log(res);
		// 			var html = template("pro-template",{products: res.products});
		// 			console.log(html);
		// 			$("#proList").html(html);
		// 		}

		// 	})
		}).then(function(){
			var str = location.search.slice(1);
			var arr=str.split("=");
			var obj={};
			obj[arr[0]]=arr[1];

			$.ajax({
				url:"http://localhost/bmall/projectserver/api/detail.php",
				data:obj,
				method:"post",
				dataType:"json",
				success:function(res){
					// console.log(res);
					if(res.code===1){
						var str=template("detail-template",{product:res.product});
						$("#detail").html(str);
					}
					var num=$(".input-num").val();
					$(".minus").click(function(){
						if(num<=1){
							return;
						}else{
							$(".input-num").val(--num);
						}
					})
					$(".add").click(function(){
						++num;
						// console.log(num);
						$(".input-num").val(num);
					})
					$(".common1").click(function(){
						var data={
							name:$(".name").text(),
							desc:$(".des").text(),
							price:$(".price").text(),
							img:$(".img1").text(),
							num:$(".input-num").val()
							};
						$.cookie.json=true;
						$.cookie("cart",data,{expires:10,path:"/"});
					})
					$(".common2").click(function(){
						var num = $(".input-num").val();
						var price = $(".price").text();
						var data={
							id:$(".img1").attr("alt"),
							name:$(".name").text(),
							desc:$(".des").text(),
							price:price,
							img:$(".img1").attr("src"),
							num:num,
							xj:price*num
							};
						$.cookie.json=true;
						var products=$.cookie("cart") || [];
						console.log($.cookie("cart"));
						var has=products.some(function(prod){
							if(prod.id==data.id){
								prod.num++;
								return true;
							}
							return false
								
						});
							console.log(has);
						if(!has){
							products.push(data);
						}
						// if(!has){
						// 	products.push(data);
						// }
						$.cookie("cart",products,{expires:10,path:"/"});
						$(".cart-num").attr("class","cart-count");
						var  cnumber = $.cookie("cart").length;
						$(".cart-count").html(cnumber);
					})
					// $(".btns").on("click",".common1,.common2",function(){
					// 	var data={
					// 	name:$(".name").text(),
					// 	desc:$(".des").text(),
					// 	price:$(".price").text(),
					// 	img:$(".img1").text(),
					// 	num:$(".input-num").val()
					// 	};
					// 	console.log(data);
					// 	$.cookie.json=true;
					// 	$.cookie("cart",data,{expires:10,path:"/"});
					// 	$(".cart-num").attr("class","cart-count");
					// 	$.cookie.json=true;
					// 	var  cnumber = $.cookie("cart").length;
					// 	$(".cart-num").text(cnumber);
					// });

					
					$(".smallImages").on("click",".img-hover",function(event){
						// console.log("1");
						var src = event.target;
						var img=$(src).attr("src");
						$(".img-change").attr("src",img);
					})
					
				}
						
			})
		}).then(function(){
			if($.cookie("cart")){
				$(".cart-num").attr("class","cart-count");
				var  cnumber = $.cookie("cart").length;
				$(".cart-count").html(cnumber);
			}
		})
		new Promise(function(resolve,reject){
			$("footer").load("/html/component/footer.html", function(){
				resolve();
			})
		})
	})
})