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
		}).then(function(){
			$.ajax({
				method: "get",
				url:"http://rap2api.taobao.org/app/mock/117353/api/list",
				success: function(res){
					console.log(res);
					var html = template("pro-template",{products: res.products});
					console.log(html);
					$("#proList").html(html);
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