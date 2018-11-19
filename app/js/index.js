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
			$(".list-remove").html(`<a href="/html/login.html" class="a-remove">退出</a>`);
		}
		}).then(function(){
			$(".a-remove").click(function(){
				var email = $.cookie("user");
				if(email){
					$.cookie("user","",{expires:-1,path:"/"});
				}
			})
		}).then(function(){
			if($.cookie("cart")){
				$(".cart-num").attr("class","cart-count");
				var  cnumber = $.cookie("cart").length;
				$(".cart-count").html(cnumber);
			}
		}).then(function(){
			$("#div1").lunbo({
				goPrev:"left",
				goNext: "right"
			})
		})
		new Promise(function(resolve,reject){
			$("footer").load("/html/component/footer.html", function(){
				resolve();
			})
		})
	})
})