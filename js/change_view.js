var change = {
	design_width: 750,
	api: 'http://www.hotyq.com:8098/api/0302',
	IsPC: function() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone",
			"SymbianOS", "Windows Phone",
			"iPad",
			"iPod"
		];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	},
	pc_type:0,
	body: document.getElementsByTagName('html')[0],
	action_flag: true,
	action: function(num, $1) {
		change.design_width = num;
		if($1){
			change.pc_type=$1;
		}
		if (this.IsPC()) {
			this.view_width = document.documentElement.clientWidth > num ? num : document.documentElement.clientWidth;
			if (this.pc_type || this.pc_type == 1) {
				this.body.className =' pc_phone';
			} else {
				this.body.className =' pc';
			}

		} else {
			this.view_width = document.documentElement.clientWidth < 320 ? num / 2 : document.documentElement.clientWidth;
		}
		this.body.style.opacity = 1;
		this.body.style.fontSize = this.view_width * 100 / num + 'px';
		if (change.action_flag) {
			change.action_flag = false;
			window.addEventListener('resize', function() {
				change.action(change.design_width)
			}, false);
		}

	}
}
var tost_tt;
var my = {
	count: 0,
	uid: '',
	scroll: 0,
	system: 'ios',
	url_attr: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	},
	url_attr_cn: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = decodeURI(window.location.href).substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	},
	tips: function(obj1, obj2, fn) {
		$('#warn').find('em').html(obj2);
		$('#warn').find('span')[0].className = obj1;
		$('#warn').show();
		var tt = setTimeout(function() {
			$('#warn').hide();
			if (fn) {
				fn();
			}
		}, 2000)
	},
	toast: function(obj) {
		document.getElementById("toast").innerHTML = obj;
		document.getElementById("toast").style.display = 'block';
		tost_tt = setTimeout(function() {
			document.getElementById("toast").style.display = 'none';
		}, 2000)
	},
	json_s: function(obj) {
		if (typeof obj != 'string') {
			return obj
		} else {
			return eval("(" + obj + ")")
		}
	},
	share: function() {
		$('#shares_content').share();
		$('.shares').click(function() {
			$('.share_body').show().find('social-share').addClass('normal');
		})
		$('.social-share').on('click', '.icon-wechat', function() {
			$('.erweima').show();
			$('.erweima img').attr('src', $(this).find('.wechat-qrcode img').attr('src'))

		});
		$('.erweima div,.social-share').click(function(e) {
			e.stopPropagation();
		})
		$('.erweima,.share_body').click(function() {
			$(this).hide();
		})
	},
	email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	tel_test: /^1[3|4|5|7|8][0-9]\d{8,8}$/,
	regPhone: /^(^0\d{2}-?\d{8}$)|(^0\d{3}-?\d{7}$)|(^\(0\d{2}\)-?\d{8}$)|(^\(0\d{3}\)-?\d{7}$)$/,
	page: function(txt, ajax_fn) {
		var $win = $(window);
		var $txt = $(txt);
		$txt.html(my.load[0]);
		$win.scroll(function() {
			if ($win.scrollTop() + 100 > $txt.offset().top - $win.height()) {
				ajax_fn();
			}
		});
	},
	img: function() {
		template.helper('img', function(obj, num, type) {
			if (obj != '' && obj != null && obj.slice(-4, -3) != '!') {
				return obj + '!' + num;
			} else {
				if (type == 1 && (obj == '' || obj == null)) { //1为脑袋
					var img_Url = 'http://img.hotyq.com/icon/user/defaulthead.jpg' + '!' + num; //默认头像
				} else {
					var img_Url = obj;
				}
				return img_Url;
			}
		})
	},
	need_login_flag: true,
	load: ['正在加载中~', '加载已完成！'],
	title_choose: function() {
		$('.left_right span').each(function(index, obj) {
			this.index = index;
			$(this).click(function() {
				$(this).addClass('on').siblings().removeClass('on')
				$(this).parents('section').next().children('div').hide().eq(this.index).show();
			});
		});
		$('.title_choose_shape section.title span').each(function(index, obj) {
			this.index = index;
			$(this).click(function() {
				if ($(this).hasClass('on')) {
					$(this).removeClass('on');
					$(this).parents('.title_choose_shape').find('.title_choose_content').hide()
					return false;
				}
				$(this).addClass('on').siblings().removeClass('on');
				$(this).parents('.title_choose_shape').children('.title_choose_content').show().find('.choose_content_list').hide().eq(this.index).show();
			})
		});
		$('.stop_p').click(function(e) {
			e.stopPropagation();
		})
		$('.title_choose_content').click(function() {
			$(this).prev().find('span.on').click();
		});
	},
	show_loading: function() {
		$('#ajax_loading').show();
	},
	close_loading: function() {
		$('#ajax_loading').hide();
	},
	public: function(obj) {
		//添加loading模块/S
		$("<section id='ajax_loading'><div><i></i></div></section>").appendTo('body');
		document.getElementById("ajax_loading").addEventListener('touchmove', function(e) {
			e.preventDefault();
		}, false);
		//添加loading模块/E
		//三种情况，1.首页带个人中心；2.返回带城市的；3.只有返回
		$('<div id="public_header" class=" change_fixed"></div>').load('public/header.html').prependTo('body'); //公共头部；
		$('<div id="public_footer"></div>').load('public/footer.html').appendTo('body'); //公共底部
		if (obj == 1) {
			$('<section id="public_per" class="change_fixed"></section>').load('public/person.html').prependTo('body'); //个人中心
			$('#public_header').addClass('public_people');
		} else if (obj == 2) {
			$('#public_header').addClass('public_addr');
		} else if (obj == 3) {
			my.count = 1;
		};
		$('<div class="go_top icon_h5">&#xe620;</div>').appendTo('body').click(function() {
			$('html,body').stop().animate({
				scrollTop: 0
			}, 500);
		}); //返回顶部
		var $go_top = $('.go_top');
		$(window).scroll(function() {
			if ($(this).scrollTop() > 200) {
				$go_top.show();
			} else {
				$go_top.hide();
			}
		});
		$('body').on('click', '.need_login', function(e) {
			if (!store.get('uid')) {
				if (my.need_login_flag) {
					my.show_loading();
					my.need_login_flag = false;
					$('<section id="login" class="change_fixed"></section>').load('public/login.html', function() {
						my.close_loading();
						$(window).scroll();
					}).appendTo('body');
				};
				$('section#login').show();
				my.scroll = $(window).scrollTop();
				$('html,body').addClass('no_scroll');
				e.preventDefault();
			};
		});
		//警告框
		$('<section id="warn" class="change_fixed"><span class="warning"><i class=" icon_h5"></i><em></em></span></section>').appendTo('body');
	}
}
if (!(navigator.userAgent).match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
	my.system = 'android';
}
window.addEventListener('load', function() {
	var toast = document.createElement("section");
	toast.id = 'toast';
	document.querySelector('body').appendChild(toast);
})