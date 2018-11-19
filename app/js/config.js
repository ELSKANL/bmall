require.config({
	baseUrl: "/",
	paths: {
		"header": "module/header",
		"footer": "module/footer",
		"jquery": "libs/jquery/jquery-1.11.3",
		"bootstrap": "libs/bootstrap/js/bootstrap",
		"tools": "libs/tools",
		"template": "libs/template-web",
		"drag" : "module/drag",
		"lunbo": "module/lunbo",
		"migrate": "libs/jquery-migrate-1.2.1.min",
		"cookie": "libs/jquery/jquery.cookie"
	},
	//垫片
	shim:{
		"bootstrap": {
			deps: ["jquery"]
		}
	}
})