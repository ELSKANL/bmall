require(["config"], function(){
	require(["jquery", "template","header","cookie"], function($, template){
		
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
			$.cookie.json=true;
			if($.cookie("cart")){
				$(".cart-num").attr("class","cart-count");
				var  cnumber = $.cookie("cart").length;
				$(".cart-count").html(cnumber);
			}
		}).then(function(){
			$.cookie.json=true;
			var products=$.cookie("cart") || [];
			if(products.length===0){
				$(".ac").attr("class","result");
				$(".cinfo").attr("class","ac");
				$(".bigcheck").addClass("cancel-all");

			}
			var html = template("pro-template",{products: products});
			console.log(html);
			$(".cartall").html(html);
		}).then(function(){
			//数量增加减少
			$(".prolist-single").on("click",".minus",function(event){
				$.cookie.json=true;
				var src = event.target;
				var products = $.cookie("cart");
				var id= $(src).parents(".prolist-single").find(".img-id").attr("alt");
				var pro = products.filter(function(prod){
					return prod.id==id;
				})[0];
				var inputnum=$(src).parents(".prolist-single").find(".input-num");
				// console.log(inputnum);
				// var num = inputnum.val();
				// console.log(num);
				if(pro.num<=1){
					return;
				}else{
					pro.num--;
				}
				$.cookie("cart",products,{path:"/"});
				inputnum.val(pro.num);
				var aa=pro.num*pro.price;
				var xjprice=$(src).parents(".prolist-single").find(".xj-price");
				xjprice.html(aa);
				console.log(aa);
				var xjPrice=$(src).parents(".prolist-single").find(".cancel ");
				var allPrice = 0;
				$(".smallcheck").each(function(){
					allPrice +=Number($(this).parents(".prolist-single").find(".xj-price").text());
				})
				var cPrice = 0;
				$(".cancel").each(function(){
					cPrice +=Number($(this).parents(".prolist-single").find(".xj-price").text());
				})
				var zj=allPrice-cPrice;
				$(".zj").text(zj);
			})
			$(".prolist-single").on("click",".add",function(e){
				$.cookie.json=true;
				var src = event.target;
				var products = $.cookie("cart");
				var id= $(src).parents(".prolist-single").find(".img-id").attr("alt");
				var pro = products.filter(function(prod){
					return prod.id==id;
				})[0];
				var inputnum=$(src).parents(".prolist-single").find(".input-num");
				// console.log(inputnum);
				pro.num++;
				$.cookie("cart",products,{path:"/"});
				inputnum.val(pro.num);
				var aa=pro.num*pro.price;
				var xjprice=$(src).parents(".prolist-single").find(".xj-price");
				xjprice.html(aa);
				// console.log(products);
				var allPrice = 0;
				$(".smallcheck").each(function(){
					allPrice +=Number($(this).parents(".prolist-single").find(".xj-price").text());
				})
				var cPrice = 0;
				$(".cancel").each(function(){
					cPrice +=Number($(this).parents(".prolist-single").find(".xj-price").text());
				})
				var zj=allPrice-cPrice;
				$(".zj").text(zj);
			})


		}).then(function(){
			//删除
			$(".cartall").on("click",".del",function(e){
				var src = e.target;
				$(src).parents(".prolist-single").remove();
				var products = $.cookie("cart"); 
				var id= $(src).parents(".prolist-single").find(".img-id").attr("alt");
				var pro = products.filter(function(prod){
					return !(prod.id==id);
				});
				$.cookie("cart",pro,{expires:10,path:"/"});
				if($.cookie("cart").length===0){
					$(".ac").attr("class","result");
					$(".cinfo").attr("class","ac");
					$(".bigcheck").addClass("cancel-all");

				}
				var allPrice = 0;
				$(".smallcheck").each(function(){
					allPrice +=Number($(this).parents(".prolist-single").find(".xj-price").text());
				})
				var cPrice = 0;
				$(".cancel").each(function(){
					cPrice +=Number($(this).parents(".prolist-single").find(".xj-price").text());
				})
				var zj=allPrice-cPrice;
				$(".zj").text(zj);
			})

			
		}).then(function(){
			//全选反选
			$(".cart").on("click",".smallcheck",function(e){
				console.log(666)
				var src=e.target;
				$(src).toggleClass("cancel");
				if($(".smallcheck").hasClass("cancel")){
					$(".bigcheck").addClass("cancel-all");
				}else{
					$(".bigcheck").removeClass("cancel-all");
				}
				var allPrice = 0;
				$(".smallcheck").each(function(){
					allPrice +=Number($(this).parents(".prolist-single").find(".xj-price").text());
				})
				var cPrice = 0;
				$(".cancel").each(function(){
					cPrice +=Number($(this).parents(".prolist-single").find(".xj-price").text());
				})
				var zj=allPrice-cPrice;
				$(".zj").text(zj);
			})
			$(".cart").on("click",".bigcheck",function(){
				if($(".bigcheck").hasClass("cancel-all")){
					$(".bigcheck").removeClass("cancel-all");
					$(".smallcheck").removeClass("cancel");
				}else{
					$(".bigcheck").addClass("cancel-all");
					$(".smallcheck").addClass("cancel");
				}
				var allPrice = 0;
				$(".smallcheck").each(function(){
					allPrice +=Number($(this).parents(".prolist-single").find(".xj-price").text());
				})
				var cPrice = 0;
				$(".cancel").each(function(){
					cPrice +=Number($(this).parents(".prolist-single").find(".xj-price").text());
				})
				var zj=allPrice-cPrice;
				$(".zj").text(zj);
			})
		}).then(function(){
			var allPrice = 0;
			$(".smallcheck").each(function(){
				allPrice +=Number($(this).parents(".prolist-single").find(".xj-price").text());
			})
			var cPrice = 0;
			$(".cancel").each(function(){
				cPrice +=Number($(this).parents(".prolist-single").find(".xj-price").text());
			})
			var zj=allPrice-cPrice;
			$(".zj").text(zj);
		})	
		new Promise(function(resolve,reject){
			$("footer").load("/html/component/footer.html", function(){
				resolve();
			})
		})
	})
})